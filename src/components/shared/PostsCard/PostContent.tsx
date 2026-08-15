"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { User, Post } from "@/interfaces/post";

interface PostContentProps {
    postItem: Post;
    user?: User;
}

const PostContent = ({ postItem, user }: PostContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const descriptionText = postItem?.description || "";
    const isLongText = descriptionText.length > 100;
    const truncatedText = isLongText && !isExpanded 
        ? descriptionText.substring(0, 100) + "..." 
        : descriptionText;

    return (
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

            <p className="mt-3 text-sm font-semibold text-gray-900">
                0 likes
            </p>

            {/* Title / Header text */}
            {postItem?.title && (
                <p className="mt-2 text-sm text-gray-900 font-medium">
                    <span className="font-semibold mr-2">{user?.name}</span>
                    {postItem.title}
                </p>
            )}

            {/* Description with See More / See Less */}
            {descriptionText && (
                <div className="mt-1 text-sm text-gray-700">
                    <span className="font-semibold mr-2">{user?.name}</span>
                    <span>{truncatedText}</span>
                    {isLongText && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)} 
                            className="text-gray-400 hover:text-gray-600 ml-1 text-xs font-medium focus:outline-none"
                        >
                            {isExpanded ? "see less" : "more"}
                        </button>
                    )}
                </div>
            )}

            <button className="mt-2 text-sm text-gray-500 hover:text-gray-800 transition block">
                View all comments
            </button>

            <p className="mt-2 text-[10px] uppercase text-gray-400 tracking-wider">
                {new Date(postItem.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
    );
};

export default PostContent;