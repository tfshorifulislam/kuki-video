"use client";

import { PostCardFooterProps } from "@/types/post";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";
import { ToggleLike } from "@/services/toggleLike";
import { useEffect, useState } from "react";
import { LikeStatus } from "@/services/getAllLikeAtOnePost";
import { SaveStatus } from "@/services/saveStatus";
import { ToggleSave } from "@/services/toggleSave";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentBox";

// ডাইনামিক রিডিং টাইম ক্যালকুলেট করার ফাংশন (প্রতি মিনিটে গড়ে ২০০ শব্দ ধরা হয়েছে)
const calculateReadingTime = (text?: string) => {
    if (!text) return "1 min read";
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes === 0 ? 1 : minutes} min read`;
};

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
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-4">
                
                {/* Reactions / Likes */}
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={isLoadingLike}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                    <span>{likesCount} <span className="hidden sm:inline">reactions</span></span>
                </button>

                {/* Comments */}
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
                    <div className="flex items-center gap-1.5 rounded-md px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer font-medium">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span>{commentsCount} <span className="hidden sm:inline">comments</span></span>
                    </div>
                </CommentModal>

                {/* Share */}
                <button
                    type="button"
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-1 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
                >
                    <Share2 className="h-4 w-4" />
                </button>

                {isShareOpen && (
                    <ShareModal postId={postId} title={title} onClose={() => setIsShareOpen(false)} />
                )}
            </div>

            {/* Bookmark & Dynamic Read Time */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400">
                    {calculateReadingTime(title)}
                </span>
                <button
                    type="button"
                    onClick={handleSave}
                    className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-gray-900 text-gray-900" : ""}`} />
                </button>
            </div>
        </div>
    );
};

export default PostCardFooter;