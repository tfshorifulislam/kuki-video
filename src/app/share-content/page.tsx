"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MediaFile } from "@/interfaces/mediaFile.interface";
import { createPostService } from "@/lib/services/post.service";
import { uploadToCloudinary } from "@/lib/cloudinaryUploadHelper/uploadToCloudinary";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import CreatePostModal from "@/components/shared/CreatePostModal";

export default function ShareContentPage() {

    const [mediaList, setMediaList] = useState<MediaFile[]>([]);
    const [title, setTitle] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const { data: session } = useSession()
    const user = session?.user;
    const userId = session?.user?.id as string


    const handlePublish = async () => {
        if (mediaList.length === 0 || !title.trim()) {
            toast.error("Please provide a title and at least one file!");
            return;
        }

        if (!userId) {
            toast.error("User not found. Please login again.");
            return;
        }

        setIsUploading(true);

        try {
            const uploadPromises = mediaList.map(async (item) => {
                const url = await uploadToCloudinary(item.file);

                if (!url) {
                    return null;
                }

                return {
                    url,
                    type: item.isVideo ? "video" : "image",
                };
            });

            const uploadedMedia = await Promise.all(uploadPromises);

            const media = uploadedMedia.filter(
                (item): item is {
                    url: string;
                    type: "image" | "video";
                } => item !== null
            );

            if (media.length === 0) {
                toast.error("File upload failed!");
                return;
            }

            const payload = {
                title,
                media,
                userId,
            };

            console.log("PAYLOAD:", payload);

            const res = await createPostService(payload);

            if (res.success) {
                toast.success("Post created successfully!");
                router.push("/");
            } else {
                toast.error(
                    res.message || "There was a problem creating the post."
                );
            }
        } catch (error) {
            console.error("Publish Error:", error);
            toast.error("Something went wrong!");
        } finally {
            setIsUploading(false);
        }
    };


    const getVideoDuration = (file: File): Promise<number> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");

            video.preload = "metadata";

            const objectUrl = URL.createObjectURL(file);
            video.src = objectUrl;

            video.onloadedmetadata = () => {
                URL.revokeObjectURL(objectUrl);
                resolve(video.duration);
            };

            video.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Unable to read video duration"));
            };
        });
    };



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        const availableSlots = 5 - mediaList.length;

        if (availableSlots <= 0) {
            toast.error("You can only upload up to 5 files.");
            return;
        }

        const filesToProcess = files.slice(0, availableSlots);

        const validFiles: MediaFile[] = [];

        for (const file of filesToProcess) {

            if (file.type.startsWith("video/")) {
                try {
                    const duration = await getVideoDuration(file);
                    if (duration > 300) {
                        toast.error(
                            `"${file.name}" is longer than 5 minutes.`
                        );
                        continue;
                    }
                } catch (error) {
                    console.error("Video duration error:", error);

                    toast.error(
                        `Could not process "${file.name}".`
                    );

                    continue;
                }
            }

            validFiles.push({
                file,
                previewUrl: URL.createObjectURL(file),
                isVideo: file.type.startsWith("video/"),
            });
        }

        if (validFiles.length > 0) {
            setMediaList((prev) => [
                ...prev,
                ...validFiles,
            ]);
        }

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


    const handleCancel = () => {
        router.back();
    };

    return (
        <CreatePostModal
            user={user}
            mediaList={mediaList}
            title={title}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            onTitleChange={setTitle}
            onPublish={handlePublish}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onCancel={handleCancel}
        />
    );
}