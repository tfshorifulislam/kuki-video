import { Smile, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Comment } from "@/types/conmentBoxProps";

interface Props {
  commentText: string;
  setCommentText: (text: string) => void;
  replyTo: Comment | null;
  setReplyTo: (comment: Comment | null) => void;
  handleComment: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CommentInputForm = ({
  commentText,
  setCommentText,
  replyTo,
  setReplyTo,
  handleComment,
}: Props) => {
  return (
    <div className="px-4 mb-5 py-3 border-t border-gray-100 bg-white shrink-0">
      {replyTo && (
        <div className="flex items-center justify-between mb-2 px-3 py-2 bg-gray-50 rounded-lg">
          <p className="text-[11px] text-gray-500">
            Replying to <span className="font-semibold text-gray-800">{replyTo.user.name}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setReplyTo(null);
              setCommentText("");
            }}
            className="text-gray-500 hover:text-black"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form onSubmit={handleComment} className="flex items-center gap-3">
        <button type="button" className="text-gray-800 hover:text-gray-600 cursor-pointer">
          <Smile className="h-6 w-6" />
        </button>
        <Textarea
          placeholder={replyTo ? `Reply to ${replyTo.user.name}...` : "Write a comment..."}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full min-h-10 max-h-24 border resize-none shadow-none bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {commentText.trim() && (
          <button
            type="submit"
            className="text-blue-500 hover:text-blue-600 font-semibold text-xs transition-colors cursor-pointer shrink-0"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentInputForm;