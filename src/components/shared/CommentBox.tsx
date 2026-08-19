"use client";

import { useEffect, useState } from "react";
import { MessageSquare, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateComment } from "@/services/postComment";
import { GetPostComments } from "@/services/getCommnetsAtOnePost";
import { CommentModalProps, Comment } from "@/types/conmentBoxProps";

import CommentItem from "./CommentItem";
import CommentModalHeader from "./CommentModalHeader";
import CommentActions from "./CommentActions";
import CommentInputForm from "./CommentInputForm";

const CommentModal = ({
  postId,
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

  const addReply = (list: Comment[], parentId: number, reply: Comment): Comment[] =>
    list.map((c) =>
      c.id === parentId
        ? { ...c, replies: [...(c.replies ?? []), reply] }
        : c.replies?.length
        ? { ...c, replies: addReply(c.replies, parentId, reply) }
        : c
    );

  useEffect(() => {
    GetPostComments(postId).then((res) => res.success && setComments(res.comments));
  }, [postId]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser?.id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await CreateComment(postId, currentUser.id, commentText.trim(), replyTo?.id ?? null);
      if (res.success && res.comment) {
        setComments((prev) => replyTo ? addReply(prev, replyTo.id, res.comment) : [res.comment, ...prev]);
        setCommentText("");
        setReplyTo(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="group flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
        <MessageSquare className="h-4 w-4" />
        <span className="tabular-nums">{comments.length}</span>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[500px] max-h-[85vh] p-0 overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl flex flex-col">
        <div className="shrink-0 px-5 py-3.5 border-b border-border/40">
          <CommentModalHeader user={user} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">No comments yet</p>
              <p className="text-xs text-muted-foreground">Start the conversation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserId={currentUser?.id}
                  onReply={(c) => { setReplyTo(c); setCommentText(""); }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border/40 bg-muted/20">
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
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;