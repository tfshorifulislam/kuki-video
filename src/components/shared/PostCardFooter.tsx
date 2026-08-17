
import { PostCardFooterProps } from "@/types/post";
import { Bookmark, Heart, Share2 } from "lucide-react";
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
    user,
    currentUser
}: PostCardFooterProps) => {


    return (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-black">

            <div className="flex flex-wrap items-center justify-between gap-2 font-medium">

                <div className="flex items-center gap-2">
                    <div>
                        <div>

                            <CommentModal
                                postId={postId}
                                commentsCount={commentsCount}
                                title={title}
                                media={media}
                                createdAt={createdAt}
                                user={user}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>

                    <span className="text-gray-300">|</span>

                    <button
                        type="button"
                        onClick={onLike}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium ${isLiked ? "bg-black text-white font-bold" : "text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            }`}
                    >
                        <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                        <span>{isLiked ? "Favorited" : "Favorites"} ({likesCount})</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
  
                    <button
                        type="button"
                        onClick={onShare}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share</span>
                    </button>

                    <span className="text-gray-300">|</span>

                    {/* Save / Bookmark Link */}
                    <button
                        type="button"
                        onClick={onSave}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium ${isSaved ? "bg-black text-white font-bold" : "text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
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