"use client";

import { format } from "date-fns";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { PostHeaderProps } from "@/types/post";

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || "B";

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-full ring-2 ring-gray-100">
                    <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name || "Author"}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-semibold text-white">
                        {userInitial}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {user?.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <time dateTime={String(createdAt)}>
                            {createdAt ? format(new Date(createdAt), "MMM d, yyyy") : ""}
                        </time>
                        <span>•</span>
                        <span>3 min read</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;