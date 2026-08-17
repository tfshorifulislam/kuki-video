"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Comment } from "@/types/conmentBoxProps";
// import { Heart } from "lucide-react";
// import { ToggleCommentLike } from "@/services/toggleCommentLike";
// import { useEffect, useState } from "react";

export interface CommentContentProps {
    comment: Comment;
    onReply: (comment: Comment) => void;
    currentUserId?: string;
    isReply: boolean;
}

const CommentContent = ({
    comment,
    onReply,
    // currentUserId,
    isReply,
}: CommentContentProps) => {
    

    // const handleLike = async () => {
    //     if (!currentUserId || isLiking) {
    //         return;
    //     }

    //     setIsLiking(true);

    //     try {
    //         const result = await ToggleCommentLike(
    //             comment.id,
    //             currentUserId
    //         );

    //         if (!result.success) {
    //             console.error(
    //                 result.message
    //             );

    //             return;
    //         }

            
    //         setIsLiked(result.isLiked);

    //         setLikesCount(
    //             result.likesCount
    //         );
    //     } catch (error) {
    //         console.error(
    //             "Comment like error:",
    //             error
    //         );
    //     } finally {
    //         setIsLiking(false);
    //     }
    // };

    return (
        <div
            className={`flex items-start gap-3 text-xs w-full min-w-0 ${isReply ? "pl-3" : ""}`}
        >
            <Avatar
                className={
                    isReply
                        ? "h-6 w-6 shrink-0"
                        : "h-7 w-7 shrink-0"
                }
            >
                <AvatarImage
                    src={
                        comment.user?.image ??
                        undefined
                    }
                    alt={
                        comment.user?.name ||
                        "User"
                    }
                />

                <AvatarFallback className="text-[10px]">
                    {comment.user?.name?.[0] ||
                        "U"}
                </AvatarFallback>
            </Avatar> 

            <div className="flex-1 min-w-0 space-y-1">
                <p className="text-gray-900 text-xs leading-relaxed wrap-break-word">
                    {/* User name */}
                    <span className="font-semibold mr-2">
                        {comment.user?.name}
                    </span>

                    {/* Author badge */}
                    {comment.userId ===
                        comment.post.userId && (
                        <span className="text-[10px] text-gray-400 font-medium mr-2">
                            Author
                        </span>
                    )}

                    {/* Comment text */}
                    {comment.content}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    {/* Date */}
                    <span>
                        {new Date(
                            comment.createdAt
                        ).toLocaleDateString()}
                    </span>

                    {/* Reply */}
                    <button
                        type="button"
                        onClick={() =>
                            onReply(comment)
                        }
                        className="
                            font-semibold
                            hover:text-black
                            transition-colors
                        "
                    >
                        Reply
                    </button>
                </div>
            </div>

            {/* <button
                type="button"
                disabled={
                    isLiking ||
                    !currentUserId
                }
                onClick={handleLike}
                className="
                    flex
                    flex-col
                    items-center
                    gap-0.5
                    shrink-0
                "
            >
                <Heart
                    className={`
                        h-3.5
                        w-3.5
                        transition-all
                        duration-200
                        ${
                            isLiked
                                ? `
                                    fill-red-500
                                    text-red-500
                                    scale-110
                                `
                                : `
                                    text-gray-400
                                    hover:text-red-500
                                `
                        }
                    `}
                />

            
                {likesCount > 0 && (
                    <span className="text-[9px] text-gray-400">
                        {likesCount}
                    </span>
                )}
            </button> */}
        </div>
    );
};

export default CommentContent;