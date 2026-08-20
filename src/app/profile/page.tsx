"use client";

import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useState } from "react";

export default function ProfilePage() {
  // ডেমো স্টেট (ব্যাকএন্ড থেকে ডাটা ফেচ করার পর এখানে বসাবেন)
  const [userData, setUserData] = useState({
    id: "user_123",
    name: "Tf Shoriful Islam",
    email: "tfshorifulislam@gmail.com",
    image: null,
    bio: "Full Stack Engineer | Helping Companies Build Fast, Scalable & High-Performing Web Applications | TypeScript • React • Next.js • Node.js",
    createdAt: "Aug 19, 2026",
    followersCount: 1420,
    followingCount: 350,
  });

  // চেক করুন ভিজিটর কি নিজের প্রোফাইলে আছে নাকি অন্যের? (true = নিজের প্রোফাইল, false = অন্যের প্রোফাইল)
  const [isOwnProfile, setIsOwnProfile] = useState(true); 
  const [isFollowing, setIsFollowing] = useState(false);

  const handleUpdateBio = (newBio: string) => {
    setUserData((prev) => ({ ...prev, bio: newBio }));
    // API Call to update database bio
  };

  const handleFollowToggle = () => {
    // API Call to Follow/Unfollow user in database
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };

  return (
    <main className="min-h-screen bg-background pb-16">
      <ProfileHeader
        user={userData}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onUpdateBio={handleUpdateBio}
        onFollowToggle={handleFollowToggle}
        onEditProfileClick={() => {
          console.log("Open Edit Profile Modal/Drawer");
        }}
      />

      {/* Posts Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {isOwnProfile ? "My Posts" : `${userData.name}'s Posts`}
        </h3>
        <div className="rounded-xl border border-border p-8 text-center text-muted-foreground bg-card">
          No posts shared yet.
        </div>
      </div>
    </main>
  );
}