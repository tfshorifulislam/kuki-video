"use client";

import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useState } from "react";

export default function ProfilePage() {
  // ডেমো ইউজার ডাটা (আপনার ডাটাবেস বা সেশন থেকে ডাটা এনে এখানে পাস করবেন)
  const [userData, setUserData] = useState({
    name: "Tf Shoriful Islam",
    email: "tfshorifulislam@gmail.com",
    image: null,
    bio: "Full Stack Engineer | Helping Companies Build Fast, Scalable & High-Performing Web Applications | TypeScript • React • Next.js • Node.js",
    createdAt: "Aug 19, 2026",
  });

  const handleUpdateBio = (newBio: string) => {
    setUserData((prev) => ({ ...prev, bio: newBio }));
    // এখানে আপনার API কল করে ডাটাবেসে বায়ো আপডেট করে নিতে পারেন
  };

  return (
    <main className="min-h-screen bg-background pb-16">
     
      <ProfileHeader
        user={userData} 
        onUpdateBio={handleUpdateBio}
        onEditProfileClick={() => {
          console.log("Edit profile clicked");
        }}
      />

    
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">My Posts</h3>
        <div className="rounded-xl border border-border p-8 text-center text-muted-foreground bg-card">
          No posts shared yet.
        </div>
      </div>
    </main>
  );
}