"use client";

import { PostCardFooterProps } from "@/types/post";
import { Bookmark, Heart, Share2 } from "lucide-react";
import CommentModal from "./CommentBox";
import { ToggleLike } from "@/services/toggleLike";
import { useEffect, useState } from "react";
import { LikeStatus } from "@/services/getAllLikeAtOnePost";

const PostCardFooter = ({
    likesCount: initialLikesCount = 0,
    commentsCount = 0,
    isSaved = false,
    onShare,
    onSave,
    postId,
    title,
    media,
    createdAt,
    user,
    currentUser,
}: PostCardFooterProps) => {

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLoadingLike, setIsLoadingLike] = useState(true);

    useEffect(() => {
        if (!currentUser?.id) return;

        let cancelled = false;

        const loadLikeStatus = async () => {
            const result = await LikeStatus(
                postId,
                currentUser.id
            );

            if (cancelled) return;

            setIsLiked(result.isLiked);
            setLikesCount(result.likesCount);
            setIsLoadingLike(false);
        };

        loadLikeStatus();

        return () => { cancelled = true; };
    }, [postId, currentUser?.id]);



    const handleLike = async () => {
        if (!currentUser?.id || isLoadingLike) return;

        const result = await ToggleLike(
            postId,
            currentUser.id
        );

        if (!result.success) {
            console.error(result.message);
            return;
        }

        setIsLiked(result.isLiked);
        setLikesCount(result.likesCount);
    };


    return (
        <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center justify-between">

                {/* Left Actions */}
                <div className="flex items-center gap-5">


                    {/* Like */}
                    <button
                        type="button"
                        onClick={handleLike}
                        disabled={isLoadingLike}
                        className="group flex items-center gap-1.5 cursor-pointer"
                    >
                        <Heart
                            className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-200 ${isLiked
                                    ? "fill-black text-black scale-110"
                                    : "text-gray-700 group-hover:text-black"
                                }`}
                        />

                        <span
                            className={`text-xs font-medium ${isLiked
                                    ? "text-black"
                                    : "text-black"
                                }`}
                        >
                            {likesCount}
                        </span>
                    </button>


                    {/* Comment */}
                    <CommentModal
                        postId={postId}
                        commentsCount={commentsCount}
                        title={title}
                        media={media}
                        createdAt={createdAt}
                        user={user}
                        currentUser={currentUser}
                        handleLike={handleLike}
                        likesCount={likesCount}
                        isLiked={isLiked}
                    />


                    {/* Share */}
                    <button
                        type="button"
                        onClick={onShare}
                        className="group flex items-center gap-1.5 cursor-pointer"
                    >
                        <Share2 className="h-5 w-5 md:h-6 md:w-6 text-gray-700 transition-colors group-hover:text-black" />
                    </button>

                </div>


                {/* Right Action */}
                <button
                    type="button"
                    onClick={onSave}
                    className="group cursor-pointer"
                >
                    <Bookmark
                        className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-200 ${isSaved
                                ? "fill-black text-black"
                                : "text-gray-700 group-hover:text-black"
                            }`}
                    />
                </button>

            </div>
        </div>
    );
};

export default PostCardFooter;