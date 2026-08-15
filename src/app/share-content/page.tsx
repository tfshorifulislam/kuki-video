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

        setIsUploading(true);

        try {

            const uploadPromises = mediaList.map((item) => uploadToCloudinary(item.file));
            const uploadedUrls = await Promise.all(uploadPromises);

            const mediaUrls = uploadedUrls.filter((url): url is string => url !== null);

            if (mediaUrls.length === 0) {
                toast.error("File upload failed!");
                setIsUploading(false);
                return;
            }

            const payload = {
                title,
                mediaUrls,
                userId
            };

            const res = await createPostService(payload);

            if (res.success) {
                toast.success("Post created successfully!");
                router.push("/");
            } else {
                toast.error(res.message || "There was a problem creating the post.");
            }
        } catch (error) {
            console.error("Publish Error:", error);
            toast.error("Something went wrong!");
        } finally {
            setIsUploading(false);
        }
    };



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