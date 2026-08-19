"use client";

import { Smile, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Comment } from "@/types/conmentBoxProps";

interface Props {
  commentText: string;
  setCommentText: (text: string) => void;
  replyTo: Comment | null;
  setReplyTo: (comment: Comment | null) => void;
  handleComment: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

const CommentInputForm = ({
  commentText,
  setCommentText,
  replyTo,
  setReplyTo,
  handleComment,
  isSubmitting,
}: Props) => {
  return (
    <div className="px-4 py-3 bg-background border-t border-border/40">
      {replyTo && (
        <div className="flex items-center justify-between mb-2 px-3 py-1.5 bg-muted rounded-lg">
          <p className="text-[11px] text-muted-foreground">
            Replying to <span className="font-semibold text-foreground">{replyTo.user.name}</span>
          </p>
          <button type="button" onClick={() => { setReplyTo(null); setCommentText(""); }} className="text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form onSubmit={handleComment} className="flex items-center gap-3">
        <button type="button" className="text-muted-foreground hover:text-foreground cursor-pointer">
          <Smile className="h-5 w-5" />
        </button>
        <Textarea
          placeholder={replyTo ? `Reply to ${replyTo.user.name}...` : "Write a comment..."}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full min-h-9 max-h-20 border-0 resize-none shadow-none bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
        />
        {commentText.trim() && (
          <button type="submit" disabled={isSubmitting} className="text-blue-500 hover:text-blue-600 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50">
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentInputForm;