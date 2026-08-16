"use client";

import { MoreHorizontal } from "lucide-react";
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
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-gray-100 text-sm font-semibold text-gray-700">
                        {userInitial}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <div className="flex items-center gap-1">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                            {user?.name}
                        </h3>

                        {user?.emailVerified && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                                ✓
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
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
                className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="More options"
            >
                <MoreHorizontal className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default PostHeader;