"use client";

import {
    Copy,
    // Facebook,
    MessageCircle,
    X,
    Check,
    X as CloseIcon,
} from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
    postId: number;
    title?: string;
    onClose: () => void;
}

const ShareModal = ({
    postId,
    title,
    onClose,
}: ShareModalProps) => {

    const [copied, setCopied] = useState(false);

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/post/${postId}`
            : "";

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(
        title || "Check out this post!"
    );

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const handleWhatsApp = () => {
        window.open(
            `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            "_blank",
            "width=600,height=500"
        );
    };

    const handleMessenger = () => {
        window.open(
            `https://www.facebook.com/dialog/send?link=${encodedUrl}`,
            "_blank",
            "width=600,height=500"
        );
    };

    const handleX = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            "_blank",
            "width=600,height=500"
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold">
                        Share Post
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>


                {/* Copy Link */}
                <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {copied ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <Copy className="w-5 h-5" />
                        )}
                    </div>

                    <div className="text-left">
                        <p className="font-medium">
                            {copied ? "Copied!" : "Copy link"}
                        </p>

                        <p className="text-sm text-gray-500">
                            Copy post link
                        </p>
                    </div>
                </button>


                {/* Social Buttons */}
                <div className="grid grid-cols-4 gap-4 mt-5">

                    {/* WhatsApp */}
                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6" />
                        </div>

                        <span className="text-xs">
                            WhatsApp
                        </span>
                    </button>


                    {/* Facebook */}
                    <button
                        type="button"
                        onClick={handleFacebook}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            {/* <Facebook className="w-6 h-6" /> */}
                        </div>

                        <span className="text-xs">
                            Facebook
                        </span>
                    </button>


                    {/* Messenger */}
                    <button
                        type="button"
                        onClick={handleMessenger}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6" />
                        </div>

                        <span className="text-xs">
                            Messenger
                        </span>
                    </button>


                    {/* X */}
                    <button
                        type="button"
                        onClick={handleX}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <X className="w-6 h-6" />
                        </div>

                        <span className="text-xs">
                            X
                        </span>
                    </button>

                </div>


                {/* Cancel */}
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-6 py-3 rounded-xl bg-gray-100 font-medium hover:bg-gray-200 transition"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default ShareModal;