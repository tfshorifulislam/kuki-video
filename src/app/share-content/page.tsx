"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, X, UploadCloud, ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";

interface MediaFile {
  file: File;
  previewUrl: string;
  isVideo: boolean;
}

export default function ShareContentPage() {
  const router = useRouter();

  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = 5 - mediaList.length;
    if (availableSlots <= 0) {
      alert("You can only upload up to 5 files.");
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);

    const newMediaItems: MediaFile[] = filesToProcess.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isVideo: file.type.startsWith("video/"),
    }));

    setMediaList((prev) => [...prev, ...newMediaItems]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleRemoveFile = (index: number) => {
    setMediaList((prev) => {
      const itemToRemove = prev[index];
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mediaList.length === 0 || !title.trim()) return;

    setIsUploading(true);

    console.log("Posting:", {
      title,
      description,
      files: mediaList.map((m) => m.file),
    });

    setTimeout(() => {
      setIsUploading(false);
      router.push("/");
    }, 1500);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">

        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 bg-white">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-zinc-900" />
            <h1 className="text-lg font-bold text-zinc-900 tracking-tight">Create Post</h1>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="text-zinc-500 hover:text-zinc-900 p-1.5 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">

          <div className="space-y-1">
            <input
              type="text"
              required
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent font-bold text-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors border-b border-zinc-200 pb-2"
            />
          </div>

          <div className="space-y-1">
            <textarea
              rows={2}
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {mediaList.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl p-8 cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
            >
              <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ImagePlus className="h-6 w-6 text-zinc-600 group-hover:text-zinc-900" />
              </div>
              <p className="text-sm font-semibold text-zinc-700">
                Add Photos/Videos
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Select 1 to 5 images or videos
              </p>
            </div>
          ) : (

            <div className="relative rounded-xl border border-zinc-200 bg-zinc-100 overflow-hidden p-2">
              
              {mediaList.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-4 left-4 z-20 bg-white/90 hover:bg-white text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-sm transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add More ({mediaList.length}/5)
                </button>
              )}

              {/* 🎨 Dynamic Grid Layout */}
              <div
                className={`grid gap-1.5 rounded-lg overflow-hidden h-75 w-full ${
                  mediaList.length === 1
                    ? "grid-cols-1"
                    : mediaList.length === 2
                    ? "grid-cols-2"
                    : mediaList.length === 3
                    ? "grid-cols-2"
                    : "grid-cols-2"
                }`}
              >
                {mediaList.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative bg-black group overflow-hidden ${
                      mediaList.length === 3 && idx === 0
                        ? "row-span-2 h-full"
                        : "h-full"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black text-white p-1 rounded-full backdrop-blur-md transition-colors"
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
                        alt={`upload-preview-${idx}`}
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="pt-3 flex items-center justify-between border-t border-zinc-100">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Cancel
            </button>

            <button
              type="submit"
              disabled={mediaList.length === 0 || !title.trim() || isUploading}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2 shadow-md"
            >
              {isUploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Now"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}