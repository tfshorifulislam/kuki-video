"use client";

import { ImagePlus, X, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CreatePostModalProps } from "@/types/modal";


const CreatePostModal = ({
    user,
    mediaList,
    title,
    description,
    isUploading,
    fileInputRef,
    onTitleChange,
    onDescriptionChange,
    onFileChange,
    onRemoveFile,
    onPublish,
    onCancel,
}: CreatePostModalProps) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh]">

                {/* Top Bar - dev.to style */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-700 dark:text-zinc-300 overflow-hidden">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {user?.name || "User"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            className="text-zinc-600 dark:text-zinc-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            disabled={!title.trim() || isUploading}
                            onClick={onPublish}
                            className="bg-[#3b49df] hover:bg-[#2f3ab2] text-white font-medium px-4"
                        >
                            {isUploading ? "Publishing..." : "Publish"}
                        </Button>
                    </div>
                </div>

                {/* Editor Body */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 sm:px-10 py-8 space-y-6">

                        {/* Cover / Media Section */}
                        {mediaList.length === 0 ? (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex flex-col items-center justify-center gap-3 py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group"
                            >
                                <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                                    <ImagePlus className="h-6 w-6" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Add a cover image or video
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        Recommended size 1000×420
                                    </p>
                                </div>
                            </button>
                        ) : (
                            <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                {/* Add more button */}
                                {mediaList.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 rounded-md text-xs font-medium shadow-sm border border-zinc-200 dark:border-zinc-700 hover:bg-white transition-colors"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Add ({mediaList.length}/5)
                                    </button>
                                )}

                                <div
                                    className={`grid gap-1 ${mediaList.length === 1 ? "grid-cols-1" : "grid-cols-2"
                                        }`}
                                >
                                    {mediaList.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 group"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => onRemoveFile(idx)}
                                                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>

                                            {item.isVideo ? (
                                                <video
                                                    src={item.previewUrl}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    fill
                                                    src={item.previewUrl}
                                                    alt={`preview-${idx}`}
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Title */}
                        <input
                            type="text"
                            required
                            placeholder="New post title here..."
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="w-full bg-transparent text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none tracking-tight"
                        />

                        {/* Description / Body */}
                        <textarea
                            rows={8}
                            placeholder="Write your post content here..."
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            className="w-full bg-transparent text-base sm:text-lg text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none resize-none leading-relaxed"
                            style={{ minHeight: "180px" }} 
                        />
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={onFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default CreatePostModal;