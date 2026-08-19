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
import { authClient } from "@/lib/auth-client";
import { Home, Settings, User, PlaySquare, LogOut, PlusCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu_items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Post", url: "/share-content", icon: PlusCircle },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await authClient.signOut();
        console.log("Logging out...");
    };

    return (
        <Sidebar collapsible="icon" className="sticky top-0 h-screen border-r border-sidebar-border/40 bg-sidebar">
            {/* Header */}
            <SidebarHeader className="p-4.5">
                <Link href="/" className="flex items-center gap-3 font-semibold text-sidebar-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shrink-0">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
                        <span className="font-bold tracking-tight text-base">Blog Space</span>
                        <span className="text-xs text-muted-foreground font-normal mt-0.5">Publish & Read</span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="px-3 py-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold px-2 mb-1 group-data-[collapsible=icon]:hidden">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1.5">
                            {menu_items.map((item) => {
                                const isActive = pathname === item.url;
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            render={<Link href={item.url} />}
                                            className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 h-auto transition-all ${isActive
                                                ? "font-semibold text-primary bg-primary/10 shadow-xs"
                                                : "font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" strokeWidth={isActive ? 2.5 : 1.75} />
                                            <span className="text-sm tracking-wide group-data-[collapsible=icon]:hidden">
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

            {/* Footer / Logout */}
            <SidebarFooter className="p-3 border-t border-sidebar-border/40">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            tooltip="Logout"
                            className="flex items-center gap-3.5 rounded-xl px-3.5 py-3 h-auto text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer w-full"
                        >
                            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                            <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
                                Logout
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}