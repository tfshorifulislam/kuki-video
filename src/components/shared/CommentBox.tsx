"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateComment } from "@/services/postComment";
import { GetPostComments } from "@/services/getCommnetsAtOnePost";
import { CommentModalProps, Comment } from "@/types/conmentBoxProps";

import CommentItem from "./CommentItem";
import PostMedia from "./PostMedia";
import CommentModalHeader from "./CommentModalHeader";
import PostCaption from "./PostCaption";
import CommentActions from "./CommentActions";
import CommentInputForm from "./CommentInputForm";

const CommentModal = ({
    postId,
    title,
    media,
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
                <span className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium text-gray-600 cursor-pointer">
                    <MessageCircle className="h-5 w-5 text-gray-500" />
                    <span>{comments.length}</span>
                </span>
            </DialogTrigger>

            <DialogContent
                style={{ maxWidth: "1200px" }}
                className="w-[98vw] h-[90vh] max-h-212.5 p-0 bg-white rounded-xl overflow-hidden border-none shadow-2xl grid grid-cols-1 md:grid-cols-[1.6fr_1fr] [&>button]:hidden"
            >
             
                <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden relative">
                    {media && media.length > 0 ? (
                        <PostMedia media={media} title={title} />
                    ) : (
                        <div className="text-white text-sm p-6 text-center">
                            {title || "No Media Available"}
                        </div>
                    )}
                </div>

                <div className="w-full bg-white flex flex-col h-full relative border-l border-gray-100 overflow-hidden">
                    
                    <CommentModalHeader user={user} />

                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-white flex flex-col">
                        <PostCaption user={user} title={title} createdAt={createdAt} />
                        <hr className="border-gray-100 my-1" />

                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onReply={(selectedComment) => {
                                    setReplyTo(selectedComment);
                                    setCommentText("");
                                }}
                            />
                        ))}
                    </div>

                    <CommentActions
                        isLiked={isLiked}
                        isSaved={isSaved}
                        likesCount={likesCount}
                        handleLike={handleLike}
                        handleSave={handleSave}
                        setIsShareOpen={setIsShareOpen}
                    />

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