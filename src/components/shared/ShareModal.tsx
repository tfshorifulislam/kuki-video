"use client";

import { ShareModalProps } from "@/types/shareModalProps";
import { useState } from "react";
import {
    FiCopy,
    FiCheck,
    FiX,
    FiLink,
} from "react-icons/fi";
import {
    FaFacebookF,
    FaFacebookMessenger,
    FaWhatsapp,
    FaXTwitter,
} from "react-icons/fa6";

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
            "_blank",
            "noopener,noreferrer"
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
            className="
                fixed inset-0 z-[100]
                flex items-end sm:items-center justify-center
                bg-black/50
                backdrop-blur-[2px]
                p-0 sm:p-4
                animate-in fade-in duration-200
            "
            onClick={onClose}
        >
            <div
                className="
                    relative
                    w-full
                    sm:max-w-[460px]
                    bg-white
                    rounded-t-[28px]
                    sm:rounded-[24px]
                    shadow-2xl
                    overflow-hidden
                    animate-in
                    slide-in-from-bottom-5
                    sm:zoom-in-95
                    duration-200
                "
                onClick={(e) => e.stopPropagation()}
            >

                {/* Mobile Drag Indicator */}
                <div className="flex justify-center pt-3 sm:hidden">
                    <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>


                {/* Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-4 sm:pt-5 pb-4">
                    <div>
                        <h2 className="text-[18px] font-semibold text-gray-900">
                            Share Post
                        </h2>

                        <p className="text-[13px] text-gray-500 mt-0.5">
                            Share this post with your friends
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex items-center justify-center
                            w-9 h-9
                            rounded-full
                            bg-gray-100
                            text-gray-600
                            hover:bg-gray-200
                            hover:text-gray-900
                            transition
                            cursor-pointer
                        "
                        aria-label="Close"
                    >
                        <FiX className="w-[18px] h-[18px]" />
                    </button>
                </div>


                {/* Divider */}
                <div className="h-px bg-gray-100" />


                {/* Copy Link */}
                <div className="px-5 sm:px-6 pt-5">

                    <button
                        type="button"
                        onClick={handleCopy}
                        className="
                            w-full
                            flex items-center
                            gap-4
                            p-3
                            rounded-2xl
                            border border-gray-200
                            hover:border-gray-300
                            hover:bg-gray-50
                            active:scale-[0.99]
                            transition-all
                            cursor-pointer
                        "
                    >
                        {/* Icon */}
                        <div
                            className="
                                flex-shrink-0
                                w-11 h-11
                                rounded-full
                                bg-gray-100
                                flex items-center justify-center
                                text-gray-700
                            "
                        >
                            {copied ? (
                                <FiCheck className="w-5 h-5" />
                            ) : (
                                <FiLink className="w-5 h-5" />
                            )}
                        </div>


                        {/* Text */}
                        <div className="flex-1 text-left min-w-0">
                            <p className="text-[14px] font-semibold text-gray-900">
                                {copied ? "Link copied!" : "Copy link"}
                            </p>

                            <p className="text-[12px] text-gray-500 mt-0.5 truncate">
                                {shareUrl}
                            </p>
                        </div>


                        {/* Copy Icon */}
                        <div className="flex-shrink-0 text-gray-400">
                            {copied ? (
                                <FiCheck className="w-5 h-5 text-green-600" />
                            ) : (
                                <FiCopy className="w-5 h-5" />
                            )}
                        </div>
                    </button>

                </div>


                {/* Share To */}
                <div className="px-5 sm:px-6 pt-6">

                    <p className="text-[13px] font-semibold text-gray-900 mb-4">
                        Share to
                    </p>


                    <div className="grid grid-cols-4 gap-3">

                        {/* WhatsApp */}
                        <button
                            type="button"
                            onClick={handleWhatsApp}
                            className="
                                group
                                flex flex-col
                                items-center
                                gap-2
                                cursor-pointer
                            "
                        >
                            <div
                                className="
                                    w-14 h-14
                                    rounded-full
                                    bg-[#25D366]/10
                                    flex items-center justify-center
                                    text-[#25D366]
                                    group-hover:bg-[#25D366]
                                    group-hover:text-white
                                    group-hover:scale-105
                                    transition-all
                                    duration-200
                                "
                            >
                                <FaWhatsapp className="w-7 h-7" />
                            </div>

                            <span className="text-[11px] font-medium text-gray-600">
                                WhatsApp
                            </span>
                        </button>


                        {/* Facebook */}
                        <button
                            type="button"
                            onClick={handleFacebook}
                            className="
                                group
                                flex flex-col
                                items-center
                                gap-2
                                cursor-pointer
                            "
                        >
                            <div
                                className="
                                    w-14 h-14
                                    rounded-full
                                    bg-[#1877F2]/10
                                    flex items-center justify-center
                                    text-[#1877F2]
                                    group-hover:bg-[#1877F2]
                                    group-hover:text-white
                                    group-hover:scale-105
                                    transition-all
                                    duration-200
                                "
                            >
                                <FaFacebookF className="w-6 h-6" />
                            </div>

                            <span className="text-[11px] font-medium text-gray-600">
                                Facebook
                            </span>
                        </button>


                        {/* Messenger */}
                        <button
                            type="button"
                            onClick={handleMessenger}
                            className="
                                group
                                flex flex-col
                                items-center
                                gap-2
                                cursor-pointer
                            "
                        >
                            <div
                                className="
                                    w-14 h-14
                                    rounded-full
                                    bg-[#0084FF]/10
                                    flex items-center justify-center
                                    text-[#0084FF]
                                    group-hover:bg-[#0084FF]
                                    group-hover:text-white
                                    group-hover:scale-105
                                    transition-all
                                    duration-200
                                "
                            >
                                <FaFacebookMessenger className="w-7 h-7" />
                            </div>

                            <span className="text-[11px] font-medium text-gray-600">
                                Messenger
                            </span>
                        </button>


                        {/* X */}
                        <button
                            type="button"
                            onClick={handleX}
                            className="
                                group
                                flex flex-col
                                items-center
                                gap-2
                                cursor-pointer
                            "
                        >
                            <div
                                className="
                                    w-14 h-14
                                    rounded-full
                                    bg-black/5
                                    flex items-center justify-center
                                    text-black
                                    group-hover:bg-black
                                    group-hover:text-white
                                    group-hover:scale-105
                                    transition-all
                                    duration-200
                                "
                            >
                                <FaXTwitter className="w-6 h-6" />
                            </div>

                            <span className="text-[11px] font-medium text-gray-600">
                                X
                            </span>
                        </button>

                    </div>

                </div>


                {/* Cancel */}
                <div className="px-5 sm:px-6 py-5 mt-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            w-full
                            h-11
                            rounded-xl
                            bg-gray-100
                            hover:bg-gray-200
                            active:scale-[0.99]
                            text-sm
                            font-semibold
                            text-gray-700
                            transition-all
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ShareModal;