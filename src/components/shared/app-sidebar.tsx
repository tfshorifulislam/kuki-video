"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Home, Video, Settings, User, PlaySquare, LogOut, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu_items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Videos", url: "/videos", icon: Video },
    { title: "Post", url: "/share-content", icon: PlusCircle,},
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar variant="floating">
            <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-sidebar-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <PlaySquare className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                        <span className="font-bold tracking-tight">StreamApp</span>
                        <span className="text-xs text-muted-foreground font-normal">Video Sharing</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/80 font-semibold px-2">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu className="gap-2">
                            {menu_items.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={`group flex items-center gap-4 rounded-xl px-4 py-3 h-auto ease-in-out hover:bg-white/10 active:scale-95 ${isActive
                                                ? "font-bold text-white bg-white/10"
                                                : "font-normal text-zinc-400 hover:text-black"
                                                }`}
                                        >
                                            <Link href={item.url} className="flex items-center gap-4 w-full">
                                                <item.icon
                                                    className="h-8 w-8 transition-transform duration-200 group-hover:scale-105"
                                                    strokeWidth={isActive ? 2.5 : 1.75}
                                                />
                                                <span className="text-[15px] tracking-wide transition-colors">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-2 border-t border-sidebar-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            tooltip="Logout"
                        >
                            <span className="flex w-full items-center gap-3 cursor-pointer">
                                <LogOut className="h-4 w-4" />
                                <span className="font-medium text-sm">Logout</span>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}