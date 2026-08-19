"use client";

import { format } from "date-fns";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { PostHeaderProps } from "@/types/post";

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || "D";

    return (
        <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8 rounded-full border border-gray-200">
                <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name || "Author"}
                    className="object-cover"
                />
                <AvatarFallback className="bg-gray-900 text-xs font-bold text-white">
                    {userInitial}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
                    {user?.name}
                </span>
                <span className="text-[11px] text-gray-500">
                    {createdAt ? format(new Date(createdAt), "MMM d") : ""}
                </span>
            </div>
        </div>
    );
};

export default PostHeader;