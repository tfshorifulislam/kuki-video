"use client";

import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PostsCardProps } from "@/types/post";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostMedia from "./PostMedia";

const PostsCard = ({ post }: PostsCardProps) => {
    const {
        createdAt,
        title,
        description,
        media,
        user,
    } = post;

    const userInitial =
        user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <Card
            className="w-full max-w-155 mx-auto overflow-hidden rounded-lg sm:rounded-2xl border-x-0 sm:border border-gray-200 bg-white shadow-none transition-colors hover:bg-gray-50/30"
        >
            {/* Header */}
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
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
                                    ✓
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>@{user?.email?.split("@")[0]}</span>
                            <span>·</span>
                            <time dateTime={createdAt}>
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

            {/* Content */}
            <div className="px-4 pb-3">
                {title && (
                    <h2 className="mb-1 text-[15px] font-semibold leading-6 text-gray-950">
                        {title}
                    </h2>
                )}

                {description && (
                    <p className="whitespace-pre-wrap text-[15px] leading-6 text-gray-700">
                        {description}
                    </p>
                )}
            </div>

            {/* Media */}
            <PostMedia
                media={media}
                title={title}
            />

            {/* Actions */}
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-500"
                        aria-label="Like post"
                    >
                        <Heart className="h-5.25 w-5.25" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-500"
                        aria-label="Comment on post"
                    >
                        <MessageCircle className="h-5.25 w-5.25" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-500"
                        aria-label="Share post"
                    >
                        <Send className="h-5.25 w-5.25" />
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-gray-100"
                    aria-label="Save post"
                >
                    <Bookmark className="h-5.25 w-5.25" />
                </Button>
            </div>
        </Card>
    );
};

export default PostsCard;