import {
    ImagePlus,
    X,
    Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CreatePostModalProps } from "@/types/modal";

const CreatePostModal = ({
    user,
    mediaList,
    title,
    isUploading,
    fileInputRef,
    onTitleChange,
    onFileChange,
    onRemoveFile,
    onPublish,
    onCancel,
}: CreatePostModalProps) => {

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto">

                <div className="relative flex items-center justify-center border-b border-zinc-100 px-6 py-4 bg-white">
                    <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                        Create Post
                    </h1>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="absolute right-4 text-zinc-500 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onPublish();
                    }}
                    className="p-4 sm:p-5 space-y-4 bg-white overflow-y-auto max-h-[calc(85vh-100px)]"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-700 overflow-hidden">
                            {user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 text-sm">
                                {user?.name || "User Name"}
                            </h3>
                            <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md font-medium">
                                Public
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            required
                            placeholder="What's on your mind?"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="w-full bg-transparent text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Media Preview Section */}
                    {mediaList.length > 0 && (
                        <div className="relative rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden p-2">
                            {/* Add More button inside preview */}
                            {mediaList.length < 5 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute top-3 left-3 z-20 bg-white/90 hover:bg-white text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border border-zinc-200 flex items-center gap-1.5 backdrop-blur-sm transition-all"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Add More ({mediaList.length}/5)
                                </button>
                            )}


                            <div
                                className={`grid gap-1.5 rounded-lg overflow-hidden h-72 w-full ${mediaList.length === 1
                                    ? "grid-cols-1"
                                    : "grid-cols-2"
                                    }`}
                            >
                                {mediaList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative bg-black group overflow-hidden ${mediaList.length === 3 && idx === 0
                                            ? "row-span-2 h-full"
                                            : "h-full"
                                            }`}
                                    >
                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => onRemoveFile(idx)}
                                            className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Preview Item */}
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
                                                alt={`upload-preview-${idx}`}
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-between border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50 hover:bg-zinc-100/80 transition-colors cursor-pointer"
                    >
                        <span className="text-sm font-semibold text-zinc-700">
                            Add to your post
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="p-2 hover:bg-zinc-200/70 rounded-full text-emerald-600 transition-colors"
                                title="Photo/Video"
                            >
                                <ImagePlus className="h-5 w-5" />
                            </button>
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


                    <Button
                        type="submit"
                        disabled={
                            mediaList.length === 0 ||
                            !title.trim() ||
                            isUploading
                        }
                        className="w-full py-5 rounded-md text-sm font-bold disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "Post"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;