"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { Comment } from "@/types/conmentBoxProps";
import { useState } from "react";

interface CommentItemProps {
    comment: Comment;
    onReply: (comment: Comment) => void;
    depth?: number;
}

const CommentItem = ({
    comment,
    onReply,
    depth = 0,
}: CommentItemProps) => {
    const [showReplies, setShowReplies] = useState(false);

    const repliesCount = comment.replies?.length ?? 0;
    const isReply = depth > 0;

    return (
        <div className="w-full min-w-0 space-y-2">

            {/* Current Comment */}
            <div
                className={`
                    flex items-start gap-3 text-xs w-full min-w-0
                    ${isReply ? "pl-3" : ""}
                `}
            >

                {/* Avatar */}
                <Avatar
                    className={
                        isReply
                            ? "h-6 w-6 shrink-0"
                            : "h-7 w-7 shrink-0"
                    }
                >
                    <AvatarImage
                        src={comment.user?.image ?? undefined}
                        alt={comment.user?.name || "User"}
                    />

                    <AvatarFallback className="text-[10px]">
                        {comment.user?.name?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>


                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">

                    <p className="text-gray-900 text-xs leading-relaxed break-words">
                        <span className="font-semibold mr-2">
                            {comment.user?.name}
                        </span>

                        {comment.userId === comment.post.userId && (
                            <span className="text-[10px] text-gray-400 font-medium mr-2">
                                Author
                            </span>
                        )}

                        {comment.content}
                    </p>


                    {/* Actions */}
                    <div className="flex items-center gap-3 text-[10px] text-gray-400">

                        <span>
                            {new Date(
                                comment.createdAt
                            ).toLocaleDateString()}
                        </span>

                        <button
                            type="button"
                            onClick={() => onReply(comment)}
                            className="font-semibold hover:text-black transition-colors"
                        >
                            Reply
                        </button>

                    </div>
                </div>


                {/* Like */}
                <button
                    type="button"
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                    <Heart className="h-3.5 w-3.5" />
                </button>

            </div>


            {/* View Replies */}
            {repliesCount > 0 && (
                <div className="pl-10">
                    <button
                        type="button"
                        onClick={() =>
                            setShowReplies((prev) => !prev)
                        }
                        className="text-[11px] font-semibold text-gray-400 hover:text-gray-800 transition-colors"
                    >
                        {showReplies
                            ? "Hide replies"
                            : `View ${repliesCount} ${
                                repliesCount === 1
                                    ? "reply"
                                    : "replies"
                            }`}
                    </button>
                </div>
            )}


            {/* Replies */}
            {showReplies && repliesCount > 0 && (
                <div className="ml-3 pl-3 border-l border-gray-100 space-y-3 max-w-full">

                    {comment.replies?.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            depth={depth + 1}
                        />
                    ))}

                </div>
            )}

        </div>
    );
};

export default CommentItem;