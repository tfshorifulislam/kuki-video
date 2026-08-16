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
import PostCardFooter from "./PostCardFooter";

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
            <PostCardFooter />
        </Card>
    );
};

export default PostsCard;