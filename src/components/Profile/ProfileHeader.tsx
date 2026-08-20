"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Edit3, Check, X, UserPlus, UserCheck, MessageSquare } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    bio?: string | null;
    createdAt?: string;
    _count?: { followers: number; following: number };
  };
  currentUserId: string;
  isFollowingInitial: boolean;
}

export default function ProfileHeader({ user, currentUserId, isFollowingInitial }: ProfileHeaderProps) {
  const isOwnProfile = currentUserId === user.id;

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user.bio || "");
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  // বায়ো আপডেট করার API কল
  const handleSaveBio = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/bio`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bio: bioText }),
      });
      
      if (res.ok) {
        setIsEditingBio(false);
      }
    } catch (error) {
      console.error("Failed to update bio:", error);
    } finally {
      setLoading(false);
    }
  };

  // ফলো / আনফলো টগল করার API কল
  const handleFollowClick = async () => {
    // অপ্টিমিস্টিক UI আপডেট (আগে থেকেই স্টেট বদল করে দেওয়া)
    setIsFollowing(!isFollowing);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/follow/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId, targetUserId: user.id }),
      });

      const data = await res.json();
      if (data.success) {
        setIsFollowing(data.isFollowing);
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      setIsFollowing(isFollowing); // এরর হলে আগের অবস্থায় ফিরিয়ে আনা
    }
  };

  return (
    <div className="w-full">
      {/* Cover / Banner Photo */}
      <div className="h-48 w-full bg-gradient-to-r from-zinc-800 to-zinc-900 md:h-64" />

      {/* Profile Info Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center sm:items-start pb-6 border-b border-border">
          
          {/* Avatar & Action Buttons */}
          <div className="w-full flex items-end justify-between">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background shadow-xl">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <Button 
                  variant="outline" 
                  className="rounded-full px-5 font-semibold shadow-sm" 
                  onClick={() => setIsEditingBio(true)}
                >
                  Edit profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="rounded-full px-4 font-semibold shadow-sm gap-1.5">
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                  <Button 
                    onClick={handleFollowClick} 
                    variant={isFollowing ? "outline" : "default"} 
                    className="rounded-full px-5 font-semibold shadow-sm gap-1.5"
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4" /> Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" /> Follow
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="mt-4 text-center sm:text-left w-full space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>

            {/* Bio Section */}
            <div className="max-w-xl">
              {isEditingBio ? (
                <div className="space-y-2 mt-2">
                  <Textarea 
                    value={bioText} 
                    onChange={(e) => setBioText(e.target.value)} 
                    placeholder="Write a short bio..." 
                    className="resize-none text-sm" 
                    rows={2} 
                  />
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingBio(false)}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveBio} disabled={loading}>
                      <Check className="h-4 w-4 mr-1" /> {loading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {user.bio || (isOwnProfile && (
                    <span 
                      onClick={() => setIsEditingBio(true)} 
                      className="text-primary font-medium hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Add bio to your profile
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Stats & Meta Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 font-medium text-foreground">
                <span>{user._count?.followers || 0}</span> <span className="text-muted-foreground">Followers</span>
              </div>
              <div className="flex items-center gap-1 font-medium text-foreground">
                <span>{user._count?.following || 0}</span> <span className="text-muted-foreground">Following</span>
              </div>
              {user.createdAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Joined on {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              )}
              {isOwnProfile && (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}