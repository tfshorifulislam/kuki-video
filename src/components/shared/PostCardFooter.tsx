"use client";

import { useState } from "react";
import { Bookmark, Heart, Share2 } from "lucide-react";

import { PostCardFooterProps } from "@/types/post";
import { ToggleLike } from "@/services/toggleLike";
import CommentModal from "./CommentBox";

const PostCardFooter = ({
    likesCount = 0,
    commentsCount = 0,
    isLiked: initialIsLiked = false,
    isSaved = false,
    onLike,
    onShare,
    onSave,
    postId,
    title,
    media,
    createdAt,
    user,
    currentUser,
}: PostCardFooterProps) => {

    const [isLiked, setIsLiked] = useState<boolean>(
        initialIsLiked
    );

    const [totalLikes, setTotalLikes] = useState<number>(
        likesCount
    );

    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (!currentUser?.id || isLoading) return;

        setIsLoading(true);

        try {
            const result = await ToggleLike(
                postId,
                currentUser.id
            );

            if (!result.success) {
                console.error(result.message);
                return;
            }

            setIsLiked(result.isLiked);
            setTotalLikes(result.likesCount);

            // যদি parent থেকে like update করার দরকার হয়
            onLike?.();

        } catch (error) {
            console.error("Like error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-black">

            <div className="flex flex-wrap items-center justify-between gap-2 font-medium">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-2">

                    <CommentModal
                        postId={postId}
                        commentsCount={commentsCount}
                        title={title}
                        media={media}
                        createdAt={createdAt}
                        user={user}
                        currentUser={currentUser}
                    />

                    <span className="text-gray-300">|</span>

                    {/* LIKE BUTTON */}
                    <button
                        type="button"
                        onClick={handleLike}
                        disabled={isLoading}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium ${
                            isLiked
                                ? "bg-black text-white font-bold"
                                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                        } ${
                            isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                    >
                        <Heart
                            className={`h-3.5 w-3.5 ${
                                isLiked ? "fill-current" : ""
                            }`}
                        />

                        <span>
                            {isLiked
                                ? "Favorited"
                                : "Favorites"}{" "}
                            ({totalLikes})
                        </span>
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-2">

                    {/* SHARE */}
                    <button
                        type="button"
                        onClick={onShare}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share</span>
                    </button>

                    <span className="text-gray-300">|</span>

                    {/* SAVE */}
                    <button
                        type="button"
                        onClick={onSave}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium ${
                            isSaved
                                ? "bg-black text-white font-bold"
                                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        <Bookmark
                            className={`h-3.5 w-3.5 ${
                                isSaved ? "fill-current" : ""
                            }`}
                        />

                        <span>
                            {isSaved ? "Saved" : "Save"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCardFooter;