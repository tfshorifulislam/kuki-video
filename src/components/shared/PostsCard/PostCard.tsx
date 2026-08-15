import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const PostCard = ({ postItem, user }: any) => {
  const media = postItem?.media?.[0];

  return (
    <article className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-semibold text-gray-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>
          </div>

          {/* User */}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(postItem.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={21} />
        </button>
      </div>

      {/* Media */}
      {media && (
        <div className="w-full bg-black aspect-square flex items-center justify-center overflow-hidden">
          
          {media.type === "video" ? (
            <video
              src={media.url}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            />
          ) : media.type === "image" ? (
            <img
              src={media.url}
              alt={postItem.title || "Post"}
              className="w-full h-full object-cover"
            />
          ) : null}

        </div>
      )}

      {/* Content */}
      <div className="px-4 pt-3 pb-4">

        {/* Actions */}
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button className="hover:text-red-500 transition">
              <Heart size={25} />
            </button>

            <button className="hover:text-gray-500 transition">
              <MessageCircle size={25} />
            </button>

            <button className="hover:text-gray-500 transition">
              <Send size={25} />
            </button>
          </div>

          <button className="hover:text-gray-500 transition">
            <Bookmark size={25} />
          </button>

        </div>

        {/* Likes */}
        <p className="mt-3 text-sm font-semibold">
          0 likes
        </p>

        {/* Caption */}
        {postItem?.title && (
          <p className="mt-2 text-sm">
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
        <button className="mt-2 text-sm text-gray-500">
          View all comments
        </button>

        {/* Date */}
        <p className="mt-2 text-[10px] uppercase text-gray-400">
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