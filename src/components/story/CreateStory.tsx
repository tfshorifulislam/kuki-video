"use client";

import { useRef, useState } from "react";
import { createStory } from "@/services/createStory";

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


            // =================================
            // UPLOAD TO CLOUDINARY
            // =================================

            const formData = new FormData();

            formData.append(
                "file",
                file
            );


            const uploadResponse =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );


            if (!uploadResponse.ok) {
                throw new Error(
                    "Upload failed"
                );
            }


            const uploaded =
                await uploadResponse.json();


            // =================================
            // MEDIA TYPE
            // =================================

            const mediaType =
                file.type.startsWith(
                    "video/"
                )
                    ? "video"
                    : "image";


            // =================================
            // CREATE STORY
            // =================================

            await createStory({
                userId,

                mediaUrl:
                    uploaded.url,

                mediaType,
            });


            // =================================
            // REFRESH STORY TRAY
            // =================================

            onCreated?.();


        } catch (error) {

            console.error(
                "CREATE STORY ERROR:",
                error
            );

        } finally {

            setUploading(false);

            // Same file আবার select
            // করার সুযোগ থাকবে
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