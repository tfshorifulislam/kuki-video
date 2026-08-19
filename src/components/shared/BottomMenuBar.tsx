"use client";

import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomMenuBar = () => {
  const pathname = usePathname();

  const menu_items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Explore", url: "/explore", icon: Search },
    { title: "Post", url: "/share-content", icon: PlusCircle, isPost: true },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Profile", url: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border/40 bg-background/80 px-2 backdrop-blur-xl md:hidden">
      {menu_items.map((item) => {
        const isActive = pathname === item.url;
        const Icon = item.icon;

        if (item.isPost) {
          return (
            <Link
              key={item.title}
              href={item.url}
              className="group relative -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95"
            >
              <Icon className="h-6 w-6 transition-transform group-hover:scale-110" strokeWidth={2.25} />
            </Link>
          );
        }

        return (
          <Link
            key={item.title}
            href={item.url}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 px-2 ${
              isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            <Icon
              className={`h-5 w-5 transition-transform duration-200 ${
                isActive ? "stroke-[2.5px] scale-105" : "stroke-[1.75px]"
              }`}
            />
            <span className="text-[10px] tracking-tight">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomMenuBar;