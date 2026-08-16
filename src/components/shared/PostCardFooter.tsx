
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

interface PostCardFooterProps {
    likesCount?: number;
    commentsCount?: number;
    isLiked?: boolean;
    isSaved?: boolean;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onSave?: () => void;
}

const PostCardFooter = ({
    likesCount,
    commentsCount = 0,
    isLiked = false,
    isSaved = false,
    onLike,
    onComment,
    onShare,
    onSave,
}: PostCardFooterProps) => {
    return (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-black">

            <div className="flex flex-wrap items-center justify-between gap-2 font-medium">

                {/* Left side actions */}
                <div className="flex items-center gap-2">
                    {/* Comment Link */}
                    <button
                        type="button"
                        onClick={onComment}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Comments ({commentsCount})</span>
                    </button>

                    <span className="text-gray-300">|</span>

                    {/* Like / Favorite Link */}
                    <button
                        type="button"
                        onClick={onLike}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${isLiked ? "bg-black text-white font-bold" : "bg-gray-100 hover:bg-gray-200 text-black"
                            }`}
                    >
                        <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                        <span>{isLiked ? "Favorited" : "Favorites"} ({likesCount})</span>
                    </button>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    {/* Share Link */}
                    <button
                        type="button"
                        onClick={onShare}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share</span>
                    </button>

                    <span className="text-gray-300">|</span>

                    {/* Save / Bookmark Link */}
                    <button
                        type="button"
                        onClick={onSave}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${isSaved ? "bg-black text-white font-bold" : "bg-gray-100 hover:bg-gray-200 text-black"
                            }`}
                    >
                        <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PostCardFooter;