"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Edit3, Check, X } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    bio?: string | null;
    createdAt?: string;
  };
  onUpdateBio?: (newBio: string) => void;
  onEditProfileClick?: () => void;
}

export default function ProfileHeader({ user, onUpdateBio, onEditProfileClick }: ProfileHeaderProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user.bio || "");

  const handleSaveBio = () => {
    if (onUpdateBio) {
      onUpdateBio(bioText);
    }
    setIsEditingBio(false);
  };

  return (
    <div className="w-full">
      {/* Cover/Banner Photo */}
      <div className="h-48 w-full bg-zinc-900 md:h-64" />

      {/* Profile Info Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center sm:items-start pb-6 border-b border-border">
          
          {/* Top Row: Avatar & Edit Profile Button */}
          <div className="w-full flex items-end justify-between">
            <Avatar className="h-32 w-32 rounded-full border-4 border-background shadow-xl">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <Button 
              onClick={onEditProfileClick} 
              variant="outline" 
              className="rounded-full px-5 font-semibold shadow-sm"
            >
              Edit profile
            </Button>
          </div>

          {/* User Details */}
          <div className="mt-4 text-center sm:text-left w-full space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>

            {/* Bio Section with Add/Edit option */}
            <div className="max-w-xl">
              {isEditingBio ? (
                <div className="space-y-2 mt-2">
                  <Textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    placeholder="Write a short bio about yourself..."
                    className="resize-none text-sm"
                    rows={2}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingBio(false)}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveBio}>
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="group inline-flex items-center gap-2 cursor-pointer" onClick={() => setIsEditingBio(true)}>
                  {user.bio ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {user.bio}
                    </p>
                  ) : (
                    <span className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                      <Edit3 className="h-3.5 w-3.5" /> Add bio to your profile
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Meta Info (Joined Date & Email) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
              {user.createdAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Joined on {user.createdAt}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}