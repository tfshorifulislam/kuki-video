"use client";

import { Comment } from "@/types/conmentBoxProps";
import { useState } from "react";
import CommentContent from "./CommentContent";

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

    return (
        <div className="w-full space-y-2">
            <CommentContent
                comment={comment}
                onReply={onReply}
                currentUserId={currentUserId}
                isReply={depth > 0}
            />

            {repliesCount > 0 && (
                <div className="pl-9">
                    <button
                        type="button"
                        onClick={() => setShowReplies((prev) => !prev)}
                        className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        {showReplies ? "Hide replies" : `View ${repliesCount} ${repliesCount === 1 ? "reply" : "replies"}`}
                    </button>
                </div>
            )}

            {showReplies && repliesCount > 0 && (
                <div className="ml-3 pl-3 border-l border-border/60 space-y-3">
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