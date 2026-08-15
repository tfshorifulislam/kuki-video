"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { User, Post } from "@/interfaces/post";
import PostMedia from "./PostMedia"; // PostMedia কম্পোনেন্টটি এখানেই ইম্পোর্ট করা হলো যাতে সিরিয়াল ঠিক থাকে

interface PostContentProps {
    postItem: Post;
    user?: User;
}

const PostContent = ({ postItem, user }: PostContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    
    const descriptionText = postItem?.description || "";
    const isLongText = descriptionText.length > 100;
    const truncatedText = isLongText && !isExpanded 
        ? descriptionText.substring(0, 100) + "..." 
        : descriptionText;

    const handleLikeToggle = () => {
        if (isLiked) {
            setIsLiked(false);
            setLikesCount((prev) => prev - 1);
        } else {
            setIsLiked(true);
            setLikesCount((prev) => prev + 1);
        }
    };

    return (
        <div className="px-4 pb-3">
            {/* 1. Title / Post Text */}
            {postItem?.title && (
                <h2 className="text-base font-semibold text-black mb-1">
                    {postItem.title}
                </h2>
            )}

            {/* 2. Description */}
            {descriptionText && (
                <div className="text-sm text-gray-900 leading-normal mb-2">
                    <span>{truncatedText}</span>
                    {isLongText && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)} 
                            className="text-gray-500 hover:text-black ml-1 text-xs font-semibold focus:outline-none"
                        >
                            {isExpanded ? "show less" : "show more"}
                        </button>
                    )}
                </div>
            )}

            {/* 3. Media (টেক্সটের পরে এবং আইকনের আগে) */}
            <PostMedia mediaList={postItem?.media || []} postTitle={postItem?.title} />

            {/* 4. Instagram Style Action Bar (LIKE, COMMENT, SEND, BOOKMARK) - একদম পোস্টের নিচে */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
                <div className="flex items-center gap-6">
                    {/* Like Button */}
                    <button 
                        onClick={handleLikeToggle}
                        className="flex items-center gap-1.5 group text-gray-700 hover:text-black transition"
                    >
                        <Heart 
                            size={20} 
                            className={`transition transform active:scale-75 ${
                                isLiked ? "text-black fill-black" : "text-gray-700"
                            }`} 
                        />
                        <span className="text-xs font-medium">{likesCount}</span>
                    </button>

                    {/* Comment Button */}
                    <button className="flex items-center gap-1.5 text-gray-700 hover:text-black transition">
                        <MessageCircle size={20} />
                        <span className="text-xs font-medium">0</span>
                    </button>

                    {/* Send / Share Button */}
                    <button className="text-gray-700 hover:text-black transition">
                        <Send size={20} />
                    </button>
                </div>

                {/* Bookmark / Save Button */}
                <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className="text-gray-700 hover:text-black transition"
                >
                    <Bookmark 
                        size={20} 
                        className={`transition ${isSaved ? "text-black fill-black" : "text-gray-700"}`} 
                    />
                </button>
            </div>
        </div>
    );
};

export default PostContent;