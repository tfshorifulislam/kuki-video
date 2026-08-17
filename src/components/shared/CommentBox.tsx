"use client";

import { useState } from "react";
import { MessageCircle, Send, X, Smile, Heart, MessageSquare, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

interface CommentModalProps {
    postId: number | string;
    commentsCount?: number;
    title?: string;
    media?: any;
    createdAt?: string | Date;
    user?: {
        name?: string;
        image?: string;
    };
}

const CommentModal = ({
    postId,
    commentsCount = 0,
    title,
    media,
    createdAt,
    user,
}: CommentModalProps) => {
    const [commentText, setCommentText] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        console.log(`Submitting comment for post ${postId}:`, commentText);
        setCommentText("");
    };

    const mediaUrl = media[0].url;
    console.log('mediaUrl', mediaUrl)

    return (
        <Dialog>
            <DialogTrigger >
                <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-xs font-medium text-gray-600 cursor-pointer"
                >
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span>Comment ({commentsCount})</span>
                </button>
            </DialogTrigger>

            {/* মডালের উইথ অনেক বাড়িয়ে ১২০০ পিক্সেল করা হয়েছে */}
            <DialogContent
                style={{ maxWidth: "1200px" }}
                className="w-[98vw] h-[90vh] max-h-[850px] p-0 bg-white rounded-xl overflow-hidden border-none shadow-2xl grid grid-cols-1 md:grid-cols-[1.6fr_1fr] [&>button]:hidden"
            >

                {/* বাম দিক: ইনস্টাগ্রাম পোস্ট ইমেজ / মিডিয়া ভিউ */}
                <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden relative">
                    {media ? (
                        <Image
                            fill
                            src={mediaUrl || "/placeholder.png"}
                            alt="Post media"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-white text-sm p-6 text-center">
                            {title || "No Media Available"}
                        </div>
                    )}
                </div>

                {/* ডান দিক: ইনস্টাগ্রাম রাইট সাইডবার (হেডার, ক্যাপশন, কমেন্ট লিস্ট ও ইনপুট) */}
                <div className="w-full bg-white flex flex-col h-full relative border-l border-gray-100 overflow-hidden">

                    {/* ইনস্টাগ্রাম প্রোফাইল হেডার */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10 shrink-0">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.image} alt={user?.name || "User"} />
                                <AvatarFallback className="bg-gray-200 font-bold text-gray-700 text-xs">
                                    {user?.name?.[0] || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer">
                                    {user?.name || "tyco_developers"}
                                </h3>
                                <span className="text-gray-400 text-xs">•</span>
                                <span className="text-xs text-blue-500 font-semibold cursor-pointer">Follow</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="text-gray-600 hover:text-black cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                            {/* ক্রস (X) বাটন */}
                            <DialogClose>
                                <button className="rounded-full p-1.5 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
                                    <X className="h-4 w-4" />
                                </button>
                            </DialogClose>
                        </div>
                    </div>

                    {/* স্ক্রোলটেবল কন্টেন্ট সেকশন (ক্যাপশন ও কমেন্টস) */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-white flex flex-col">

                        {/* পোস্টের ক্যাপশন */}
                        {title && (
                            <div className="flex items-start gap-3 text-xs">
                                <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                                    <AvatarImage src={user?.image} alt={user?.name || "User"} />
                                    <AvatarFallback className="bg-gray-200 font-bold text-gray-700 text-xs">
                                        {user?.name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-0.5">
                                    <p className="text-gray-900 text-xs">
                                        <span className="font-semibold mr-2 cursor-pointer hover:underline">
                                            {user?.name || "tyco_developers"}
                                        </span>
                                        {title}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        {createdAt ? new Date(createdAt).toLocaleDateString() : "1d"}
                                    </p>
                                </div>
                            </div>
                        )}

                        <hr className="border-gray-100 my-1" />

                        {/* কমেন্ট ১ */}
                        <div className="flex items-start gap-3 text-xs">
                            <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                                <AvatarFallback className="bg-gradient-to-tr from-yellow-400 to-fuchsia-600 text-white font-bold text-xs">N</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-gray-900 text-xs">
                                    <span className="font-semibold mr-2 cursor-pointer hover:underline">
                                        nexus_lab
                                    </span>
                                    Outstanding Work 🔥
                                </p>
                                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                                    <span>23h</span>
                                    <button className="hover:text-gray-600 cursor-pointer">Reply</button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer pt-1"
                            >
                                <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                        </div>

                        {/* রিপ্লাই কমেন্ট */}
                        <div className="flex items-start gap-3 text-xs pl-7">
                            <Avatar className="h-6 w-6 shrink-0 mt-0.5">
                                <AvatarFallback className="bg-gray-800 text-white font-bold text-[10px]">TD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-gray-900 text-xs">
                                    <span className="font-semibold mr-2 cursor-pointer hover:underline">
                                        tyco_developers
                                    </span>
                                    @nexus_lab Thank you so much! ❤️
                                </p>
                                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                                    <span>2h</span>
                                    <button className="hover:text-gray-600 cursor-pointer">Reply</button>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 cursor-pointer pt-1">
                                <Heart className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* ইনস্টাগ্রাম অ্যাকশন বাটন বার */}
                    <div className="px-4 py-2.5 border-t border-gray-100 bg-white shrink-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="hover:opacity-75 transition-opacity cursor-pointer"
                                >
                                    <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-800"}`} />
                                </button>
                                <button className="hover:opacity-75 transition-opacity cursor-pointer text-gray-800">
                                    <MessageSquare className="h-5 w-5 -scale-x-100" />
                                </button>
                                <button className="hover:opacity-75 transition-opacity cursor-pointer text-gray-800">
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                            <button className="hover:opacity-75 transition-opacity cursor-pointer text-gray-800">
                                <Bookmark className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="text-xs font-semibold text-gray-900">
                            11 likes
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                            {createdAt ? new Date(createdAt).toLocaleDateString() : "YESTERDAY"}
                        </div>
                    </div>

                    {/* একদম নিচে ইনস্টাগ্রাম কমেন্ট ইনপুট বক্স */}
                    <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
                        <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
                            <button type="button" className="text-gray-800 hover:text-gray-600 cursor-pointer">
                                <Smile className="h-6 w-6" />
                            </button>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none"
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

                </div>

            </DialogContent>
        </Dialog>
    );
};

export default CommentModal;