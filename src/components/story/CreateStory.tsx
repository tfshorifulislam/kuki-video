"use client";

import { useRef, useState } from "react";

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


    async function handleFile(
        file: File
    ) {

        try {

            setUploading(true);


            // =========================
            // CLOUDINARY UPLOAD
            // =========================

            const formData =
                new FormData();

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


            // =========================
            // CREATE STORY
            // =========================

            const mediaType =
                file.type.startsWith(
                    "video/"
                )
                    ? "video"
                    : "image";


            const response =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/stories`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            userId,

                            mediaUrl:
                                uploaded.url,

                            mediaType,
                        }),
                    }
                );


            if (!response.ok) {
                throw new Error(
                    "Story creation failed"
                );
            }


            onCreated?.();

        } catch (error) {

            console.error(
                "CREATE STORY:",
                error
            );

        } finally {

            setUploading(false);

        }
    }


    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="
                    image/*
                    ,video/*
                "
                hidden
                onChange={(event) => {

                    const file =
                        event.target.files?.[0];

                    if (!file) return;

                    handleFile(file);
                }}
            />


            <button
                disabled={uploading}
                onClick={() =>
                    inputRef.current?.click()
                }
                className="
                    h-16
                    w-16
                    rounded-full
                    border-2
                    border-dashed
                    flex
                    items-center
                    justify-center
                "
            >
                {uploading
                    ? "..."
                    : "+"}
            </button>
        </>
    );
}