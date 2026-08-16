"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CommentModalProps {
    postId: number | string;
    commentsCount?: number;
}

const CommentModal = ({ postId, commentsCount = 0 }: CommentModalProps) => {
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        console.log(`Submitting comment for post ${postId}:`, commentText);
        setCommentText("");
    };

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

       
            <DialogContent className="w-[92vw] max-w-lg rounded-2xl p-0 bg-white border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                
                {/* হেডার */}
                <DialogHeader className="px-4 py-3 border-b border-gray-100 text-center bg-gray-50/50">
                    <DialogTitle className="text-xs sm:text-sm font-semibold text-gray-800">
                        Comments ({commentsCount})
                    </DialogTitle>
                </DialogHeader>

                {/* কমেন্ট লিস্ট - স্ক্রোলটেবল */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {/* ডামি কমেন্ট */}
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                            <AvatarFallback className="bg-gray-300 font-semibold text-gray-700">J</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="bg-[#F0F2F5] rounded-2xl px-3.5 py-2">
                                <span className="font-semibold text-gray-900 block text-xs">
                                    John Doe
                                </span>
                                <p className="text-gray-800 text-xs sm:text-sm mt-0.5">
                                    This looks amazing! 🔥
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-500 pl-2">
                                <button className="hover:underline">Like</button>
                                <span>·</span>
                                <button className="hover:underline">Reply</button>
                            </div>
                        </div>
                    </div>

                    {/* স্ক্রোল টেস্টের জন্য অতিরিক্ত কমেন্ট */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                                <AvatarFallback className="bg-gray-200 font-semibold text-gray-700">U{i}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="bg-[#F0F2F5] rounded-2xl px-3.5 py-2">
                                    <span className="font-semibold text-gray-900 block text-xs">
                                        User {i + 1}
                                    </span>
                                    <p className="text-gray-800 text-xs sm:text-sm mt-0.5">
                                        Awesome post layout and features!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* কমেন্ট লেখার ইনপুট বক্স */}
                <div className="border-t border-gray-100 p-3 bg-white">
                    <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-gray-200 text-xs font-semibold text-gray-700">
                                U
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 flex items-center bg-[#F0F2F5] rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-gray-400">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                            />
                            {commentText.trim() && (
                                <button
                                    type="submit"
                                    className="text-blue-600 hover:text-blue-700 ml-2 transition-colors cursor-pointer"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default CommentModal;