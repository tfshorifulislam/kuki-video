"use client";
import { Home, PlusCircle, Settings, User, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomMenuBar = () => {
  const pathname = usePathname();


  const menu_items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Videos", url: "/videos", icon: Video },
    { title: "Post", url: "/share-content", icon: PlusCircle, isPost: true },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-zinc-800 bg-black/90 px-2 backdrop-blur-lg md:hidden">
        {menu_items.map((item) => {
          const isActive = pathname === item.url;
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