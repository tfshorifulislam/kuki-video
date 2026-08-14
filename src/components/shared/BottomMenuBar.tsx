"use client";

import React, { useRef } from "react";
import { Home, PlusCircle, Settings, User, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomMenuBar = () => {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menu_items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Videos", url: "/videos", icon: Video },
    { title: "Post", url: "", icon: PlusCircle, isPost: true },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const handlePostClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-zinc-800 bg-black/90 px-2 backdrop-blur-lg md:hidden">
        {menu_items.map((item) => {
          const isActive = pathname === item.url;

          if (item.isPost) {
            return (
              <button
                key={item.title}
                onClick={handlePostClick}
                className="group relative -top-3 flex flex-col items-center justify-center"
              >
                {/* ⚪ Pure White Floating Button with Black Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/10 transition-transform duration-200 active:scale-90 group-hover:scale-105">
                  <item.icon className="h-7 w-7 stroke-[2.2px]" />
                </div>
                <span className="mt-1 text-[11px] font-medium text-zinc-400">
                  {item.title}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 active:scale-95 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <item.icon
                className={`h-6 w-6 transition-transform duration-200 ${
                  isActive ? "stroke-[2.5px] scale-110" : "stroke-[1.75px]"
                }`}
              />
              <span className="text-[11px] font-medium tracking-tight">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BottomMenuBar;