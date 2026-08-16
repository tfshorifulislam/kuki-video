"use client";

import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react";
import { PostsCardProps } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostMedia from "./PostMedia";
import PostHeader from "./PostCardHeader";

const PostsCard = ({ post }: PostsCardProps) => {
    const {
        createdAt,
        title,
        description,
        media,
        user,
    } = post;

    return (
        <Card className="w-full max-w-155 mx-auto overflow-hidden rounded-lg sm:rounded-2xl border-x-0 sm:border border-gray-200 bg-white shadow-none transition-colors hover:bg-gray-50/30">
            {/* Header Component */}
            <PostHeader
                user={user}
                createdAt={createdAt} />

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