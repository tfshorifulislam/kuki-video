"use client";

import { Heart, Send, Bookmark } from "lucide-react";

interface Props {
  isLiked?: boolean;
  isSaved?: boolean;
  likesCount: number;
  handleLike: () => void;
  handleSave: () => void;
  setIsShareOpen: (open: boolean) => void;
}

const CommentActions = ({
  isLiked,
  isSaved,
  likesCount,
  handleLike,
  handleSave,
  setIsShareOpen,
}: Props) => {
  return (
    <div className="px-4 pt-3 pb-1 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="hover:opacity-75 transition-opacity cursor-pointer">
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </button>
          <button onClick={() => setIsShareOpen(true)} className="hover:opacity-75 transition-opacity cursor-pointer text-foreground">
            <Send className="h-5 w-5" />
          </button>
        </div>
        <button onClick={handleSave} className="cursor-pointer">
          <Bookmark className={`h-5 w-5 transition-transform active:scale-95 ${isSaved ? "fill-foreground text-foreground" : "text-foreground"}`} />
        </button>
      </div>
      <div className="mt-1.5 text-xs font-semibold text-foreground">{likesCount} likes</div>
    </div>
  );
};

export default CommentActions;