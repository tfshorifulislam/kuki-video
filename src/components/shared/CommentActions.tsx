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
    <div className="px-4 py-2.5 border-t border-gray-100 bg-white shrink-0 space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="hover:opacity-75 transition-opacity cursor-pointer"
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-black text-black" : "text-gray-800"}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="hover:opacity-75 transition-opacity cursor-pointer text-gray-800"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <button type="button" onClick={handleSave} className="group cursor-pointer">
          <Bookmark
            className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-200 ${
              isSaved ? "fill-black text-black" : "text-gray-700 group-hover:text-black"
            }`}
          />
        </button>
      </div>
      <div className="text-xs font-semibold text-gray-900">{likesCount} likes</div>
    </div>
  );
};

export default CommentActions;