"use client";

import { useRef, useState } from "react";

import { createStory } from "@/services/createStory";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";

interface CreateStoryProps {
    userId: string;
    onCreated?: () => void;
}

export default function CreateStory({
    userId,
    onCreated,
}: CreateStoryProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [uploading, setUploading] =
        useState(false);

    async function handleFile(file: File) {

        try {

            setUploading(true);

            console.log(
                "🔥 STORY UPLOAD START"
            );

            // ===============================
            // CLOUDINARY
            // ===============================

            const mediaUrl =
                await uploadToCloudinary(file);

            console.log(
                "CLOUDINARY URL:",
                mediaUrl
            );

            if (!mediaUrl) {
                throw new Error(
                    "Cloudinary upload failed"
                );
            }

            // ===============================
            // MEDIA TYPE
            // ===============================

            const mediaType =
                file.type.startsWith("video/")
                    ? "video"
                    : "image";

            // ===============================
            // CREATE STORY
            // ===============================

            const result =
                await createStory({
                    userId,
                    mediaUrl,
                    mediaType,
                });

            console.log(
                "✅ STORY CREATED:",
                result
            );

            onCreated?.();

        } catch (error) {

            console.error(
                "❌ CREATE STORY ERROR:",
                error
            );

        } finally {

            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={(event) => {

                    const file =
                        event.target.files?.[0];

                    if (!file) return;

                    handleFile(file);
                }}
            />

            <button
                type="button"
                disabled={uploading}
                onClick={() =>
                    inputRef.current?.click()
                }
                className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-dashed
                    border-gray-400
                    disabled:opacity-50
                "
            >
                {uploading ? "..." : "+"}
            </button>
        </>
    );
}