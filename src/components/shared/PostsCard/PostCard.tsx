import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

const PostCard = ({ postItem, user }: any) => {
    const media = postItem?.media?.[0];

    return (
        <article className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">

                    {/* Avatar - Black & White Theme */}
                    <div className="w-10 h-10 rounded-full border border-gray-300 p-[1px] bg-gray-50 flex items-center justify-center overflow-hidden">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full object-cover grayscale"
                            />
                        ) : (
                            <span className="font-semibold text-gray-800 text-sm">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        )}
                    </div>

                    {/* User Name & Date */}
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(postItem.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition">
                    <MoreHorizontal size={21} />
                </button>
            </div>

            {/* Media (Image or Auto-playing Video) */}
            {media && (
                <div className="w-full bg-black aspect-square flex items-center justify-center overflow-hidden relative">
                    {media.type === "video" ? (
                        <video
                            src={media.url}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain"
                        />
                    ) : media.type === "image" ? (
                        <div className="w-full h-full relative">
                            <img
                                src={media.url}
                                alt={postItem.title || "Post"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : null}
                </div>
            )}

            {/* Content Section */}
            <div className="px-4 pt-3 pb-4">

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-800">
                        <button className="hover:text-black transition">
                            <Heart size={25} />
                        </button>

                        <button className="hover:text-black transition">
                            <MessageCircle size={25} />
                        </button>

                        <button className="hover:text-black transition">
                            <Send size={25} />
                        </button>
                    </div>

                    <button className="text-gray-800 hover:text-black transition">
                        <Bookmark size={25} />
                    </button>
                </div>

                {/* Likes */}
                <p className="mt-3 text-sm font-semibold text-gray-900">
                    0 likes
                </p>

                {/* Caption */}
                {postItem?.title && (
                    <p className="mt-2 text-sm text-gray-900">
                        <span className="font-semibold mr-2">
                            {user?.name}
                        </span>
                        {postItem.title}
                    </p>
                )}

                {/* Description */}
                {postItem?.description && (
                    <p className="mt-1 text-sm text-gray-700">
                        {postItem.description}
                    </p>
                )}

                {/* Comments */}
                <button className="mt-2 text-sm text-gray-500 hover:text-gray-800 transition">
                    View all comments
                </button>

                {/* Formatted Date */}
                <p className="mt-2 text-[10px] uppercase text-gray-400 tracking-wider">
                    {new Date(postItem.createdAt).toLocaleDateString(
                        undefined,
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }
                    )}
                </p>

            </div>
        </article>
    );
};

export default PostCard;