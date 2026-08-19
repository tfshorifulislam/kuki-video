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
    { title: "Post", url: "/share-content", icon: PlusCircle },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar 
            collapsible="icon" 
            className="sticky top-0 h-screen border-none"
        >
            <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-sidebar-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shrink-0">
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
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/80 font-semibold px-2 group-data-[collapsible=icon]:hidden">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu className="gap-2">
                            {menu_items.map((item) => {
                                const isActive = pathname === item.url;
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            render={<Link href={item.url} />}
                                            className={`group flex items-center gap-4 rounded-xl px-4 py-3 h-auto ease-in-out hover:bg-accent hover:text-accent-foreground active:scale-95 ${
                                                isActive
                                                    ? "font-bold text-foreground bg-accent"
                                                    : "font-normal text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            <Icon
                                                className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-105"
                                                strokeWidth={isActive ? 2.5 : 1.75}
                                            />
                                            <span className="text-[15px] tracking-wide transition-colors group-data-[collapsible=icon]:hidden">
                                                {item.title}
                                            </span>
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
                            tooltip="Logout"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors rounded-xl px-4 py-3"
                        >
                            <span className="flex w-full items-center gap-4 cursor-pointer">
                                <LogOut className="h-6 w-6 shrink-0" strokeWidth={1.75} />
                                <span className="font-medium text-[15px] group-data-[collapsible=icon]:hidden">Logout</span>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}