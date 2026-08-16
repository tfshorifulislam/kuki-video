"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface VideoVolumeContextType {
    volume: number;
    setVolume: (volume: number) => void;
}

const VideoVolumeContext =
    createContext<VideoVolumeContextType | null>(null);

export const VideoVolumeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // localStorage থেকে প্রিভিয়াস ভলিউম রিড করা, না থাকলে ডিফল্ট ৫০
    const [volume, setVolumeState] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const savedVolume = localStorage.getItem("video_volume");
            return savedVolume !== null ? Number(savedVolume) : 50;
        }
        return 50;
    });

    const setVolume = (newVolume: number) => {
        setVolumeState(newVolume);
        if (typeof window !== "undefined") {
            localStorage.setItem("video_volume", newVolume.toString());
        }
    };

    return (
        <VideoVolumeContext.Provider
            value={{
                volume,
                setVolume,
            }}
        >
            {children}
        </VideoVolumeContext.Provider>
    );
};

export const useVideoVolume = () => {
    const context = useContext(VideoVolumeContext);

    if (!context) {
        throw new Error(
            "useVideoVolume must be used inside VideoVolumeProvider"
        );
    }

    return context;
};