"use client";

import { MoreHorizontal, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostHeaderProps } from "@/types/post";

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 text-xs">
            {/* মডার্ন পোস্ট হেডার */}
            <div className="flex min-w-0 items-center gap-3">
                <Avatar className="h-9 w-9 rounded-full shrink-0 ring-1 ring-gray-200">
                    <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name || "User"}
                        className="rounded-full object-cover"
                    />
                    <AvatarFallback className="rounded-full bg-black text-xs font-semibold text-white">
                        {userInitial}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-medium">
                        <h3 className="truncate text-sm font-semibold text-gray-900 cursor-pointer hover:underline">
                            {user?.name}
                        </h3>

                        {user?.emailVerified && (
                            <ShieldCheck className="h-4 w-4 text-black fill-gray-100 shrink-0" />
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                        <span>@{user?.email?.split("@")[0]}</span>
                        <span>·</span>
                        <time dateTime={String(createdAt)}>
                            {formatDistanceToNow(new Date(createdAt), {
                                addSuffix: true,
                            })}
                        </time>
                    </div>
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black"
                aria-label="More options"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default PostHeader;