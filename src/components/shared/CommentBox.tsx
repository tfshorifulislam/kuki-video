"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateComment } from "@/services/postComment";
import { GetPostComments } from "@/services/getCommnetsAtOnePost";
import { CommentModalProps, Comment } from "@/types/conmentBoxProps";

import CommentItem from "./CommentItem";
import CommentModalHeader from "./CommentModalHeader";
import PostCaption from "./PostCaption";
import CommentActions from "./CommentActions";
import CommentInputForm from "./CommentInputForm";

const CommentModal = ({
    postId,
    title,
    createdAt,
    user,
    currentUser,
    likesCount,
    isLiked,
    isSaved,
    setIsShareOpen,
    handleLike,
    handleSave,
}: CommentModalProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [replyTo, setReplyTo] = useState<Comment | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addReplyToComment = (
        commentsList: Comment[],
        parentId: number,
        newReply: Comment
    ): Comment[] => {
        return commentsList.map((comment) => {
            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies ?? []), newReply],
                };
            }
            if (comment.replies?.length) {
                return {
                    ...comment,
                    replies: addReplyToComment(comment.replies, parentId, newReply),
                };
            }
            return comment;
        });
    };

    useEffect(() => {
        const loadComments = async () => {
            const result = await GetPostComments(postId);
            if (result.success) {
                setComments(result.comments);
            }
        };

        loadComments();
    }, [postId]);

    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!commentText.trim() || !currentUser?.id || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const result = await CreateComment(
                postId,
                currentUser.id,
                commentText.trim(),
                replyTo?.id ?? null
            );

            if (!result.success || !result.comment) {
                console.error("COMMENT FAILED:", result.message);
                return;
            }

            if (!replyTo) {
                setComments((prev) => [result.comment, ...prev]);
            } else {
                setComments((prev) =>
                    addReplyToComment(prev, replyTo.id, result.comment)
                );
            }

            setCommentText("");
            setReplyTo(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors hover:text-blue-600 cursor-pointer"
                >
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments.length}</span>
                </button>
            </DialogTrigger>

            <DialogContent
                className="w-[95vw] max-w-xl max-h-[85vh] p-0 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl flex flex-col"
            >
                {/* Modal Header (Author Info) */}
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                    <CommentModalHeader user={user} />
                </div>

                {/* Main Scrollable Comments & Post Title Area */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white flex flex-col">
                    <PostCaption user={user} title={title} createdAt={createdAt} />
                    <hr className="border-gray-100 my-1" />

                    {comments.length === 0 ? (
                        <div className="py-8 text-center text-sm text-gray-500">
                            No responses yet. Be the first to share your thoughts!
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                currentUserId={currentUser?.id}
                                onReply={(selectedComment) => {
                                    setReplyTo(selectedComment);
                                    setCommentText("");
                                }}
                            />
                        ))
                    )}
                </div>

                {/* Actions (Like, Save, Share count/triggers inside modal if needed) */}
                <div className="border-t border-gray-100 px-5 py-2.5 bg-gray-50/30">
                    <CommentActions
                        isLiked={isLiked}
                        isSaved={isSaved}
                        likesCount={likesCount}
                        handleLike={handleLike}
                        handleSave={handleSave}
                        setIsShareOpen={setIsShareOpen}
                    />
                </div>

                {/* Comment Input Box */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <CommentInputForm
                        commentText={commentText}
                        setCommentText={setCommentText}
                        replyTo={replyTo}
                        setReplyTo={setReplyTo}
                        handleComment={handleComment}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentModal;