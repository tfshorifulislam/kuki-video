"use client";

import { Comment } from "@/types/conmentBoxProps";
import { useState } from "react";
import { CommentContent } from "./CommentContent";

interface CommentItemProps {
    comment: Comment;
    onReply: (comment: Comment) => void;
    currentUserId?: string;
    depth?: number;
}

const CommentItem = ({
    comment,
    onReply,
    currentUserId,
    depth = 0,
}: CommentItemProps) => {
    const [showReplies, setShowReplies] = useState(false);

    const repliesCount = comment.replies?.length ?? 0;
    const isReply = depth > 0;

    return (
        <div className="w-full min-w-0 space-y-2">
            {/* Current Comment Row */}
            <CommentContent
                comment={comment}
                onReply={onReply}
                currentUserId={currentUserId}
                isReply={isReply}
            />

            {/* View Replies Toggle */}
            {repliesCount > 0 && (
                <div className="pl-10">
                    <button
                        type="button"
                        onClick={() => setShowReplies((prev) => !prev)}
                        className="text-[11px] font-semibold text-gray-400 hover:text-gray-800 transition-colors"
                    >
                        {showReplies
                            ? "Hide replies"
                            : `View ${repliesCount} ${
                                  repliesCount === 1 ? "reply" : "replies"
                              }`}
                    </button>
                </div>
            )}

            {/* Nested Replies List */}
            {showReplies && repliesCount > 0 && (
                <div className="ml-3 pl-3 border-l border-gray-100 space-y-3 max-w-full">
                    {comment.replies?.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            currentUserId={currentUserId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;