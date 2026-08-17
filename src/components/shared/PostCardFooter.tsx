
import { PostCardFooterProps } from "@/types/post";
import { Bookmark, Heart, Share2 } from "lucide-react";
import CommentDrawer from "./CommentBox";
import CommentModal from "./CommentBox";

const PostCardFooter = ({
    likesCount,
    commentsCount = 0,
    isLiked = false,
    isSaved = false,
    onLike,
    onShare,
    onSave,
    postId,
    title,
    media,
    createdAt,
    user
}: PostCardFooterProps) => {


    return (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-black">

            <div className="flex flex-wrap items-center justify-between gap-2 font-medium">

                {/* Left side actions */}
                <div className="flex items-center gap-2">
                    {/* Comment Link */}
                    <div className="px-4 py-2">
                        <div>

                            <CommentModal
                                postId={postId}
                                commentsCount={commentsCount}
                                title={title}
                                media={media}
                                createdAt={createdAt}
                                user={user}
                            />
                        </div>
                    </div>

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