"use client";

import { PostCardFooterProps } from "@/types/post";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";
import CommentModal from "./CommentBox";
import { ToggleLike } from "@/services/toggleLike";
import { useEffect, useState } from "react";
import { LikeStatus } from "@/services/getAllLikeAtOnePost";
import { SaveStatus } from "@/services/saveStatus";
import { ToggleSave } from "@/services/toggleSave";
import ShareModal from "./ShareModal";

const PostCardFooter = ({
    likesCount: initialLikesCount = 0,
    commentsCount = 0,
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
    const [isSaved, setIsSaved] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    useEffect(() => {
        if (!currentUser?.id) return;
        SaveStatus(postId, currentUser.id).then((res) => setIsSaved(res.isSaved));
    }, [postId, currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) return;
        LikeStatus(postId, currentUser.id).then((res) => {
            setIsLiked(res.isLiked);
            setLikesCount(res.likesCount);
            setIsLoadingLike(false);
        });
    }, [postId, currentUser?.id]);

    const handleLike = async () => {
        if (!currentUser?.id || isLoadingLike) return;
        const result = await ToggleLike(postId, currentUser.id);
        if (result.success) {
            setIsLiked(result.isLiked);
            setLikesCount(result.likesCount);
        }
    };

    const handleSave = async () => {
        if (!currentUser?.id) return;
        const result = await ToggleSave(postId, currentUser.id);
        if (result.success) setIsSaved(result.saved);
    };

    return (
        <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-6">
                
                {/* Like / Appreciate Button */}
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={isLoadingLike}
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-red-600 cursor-pointer"
                >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{likesCount}</span>
                </button>

                {/* Comments Modal Trigger */}
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
                    isSaved={isSaved}
                    handleSave={handleSave}
                    setIsShareOpen={setIsShareOpen}
                >
                    <div className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-blue-600 cursor-pointer">
                        <MessageSquare className="h-4 w-4" />
                        <span>{commentsCount}</span>
                    </div>
                </CommentModal>

                {/* Share Button */}
                <button
                    type="button"
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-gray-900 cursor-pointer"
                >
                    <Share2 className="h-4 w-4" />
                </button>

                {isShareOpen && (
                    <ShareModal postId={postId} title={title} onClose={() => setIsShareOpen(false)} />
                )}
            </div>

            {/* Bookmark / Read Later */}
            <button
                type="button"
                onClick={handleSave}
                className="text-gray-500 transition-colors hover:text-gray-900 cursor-pointer"
            >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-gray-900 text-gray-900" : ""}`} />
            </button>
        </div>
    );
};

export default PostCardFooter;