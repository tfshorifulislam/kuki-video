"use client";

import { VideoPlayerProps } from "@/types/videoPlayerProps";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
    ({ url, volume }, ref) => {
        const localVideoRef = useRef<HTMLVideoElement>(null);

        // প্যারেন্ট কম্পোনেন্টের ref কে লোকাল ref এর সাথে যুক্ত করা
        useImperativeHandle(ref, () => localVideoRef.current as HTMLVideoElement);

        // ভলিউম ও মিউট কন্ট্রোল (സുরক্ষিত ও নিরাপদ চেকসহ)
        useEffect(() => {
            const video = localVideoRef.current;
            if (!video) return;

            // ভলিউমের মান সংখ্যা না হলে বা অবৈধ হলে ডিফল্টভাবে ৫০ বা ০ ধরে নেওয়া
            const safeVolume = typeof volume === "number" && !isNaN(volume) ? volume : 50;

            video.volume = Math.max(0, Math.min(1, safeVolume / 100));
            video.muted = safeVolume === 0;
        }, [volume]);

        // স্ক্রিনে আসলে অটো প্লে এবং স্ক্রিন থেকে চলে গেলে পজ হওয়ার অপশন
        useEffect(() => {
            const video = localVideoRef.current;
            if (!video) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        const safeVolume = typeof volume === "number" && !isNaN(volume) ? volume : 50;
                        video.volume = Math.max(0, Math.min(1, safeVolume / 100));
                        video.muted = safeVolume === 0;
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                },
                {
                    threshold: 0.6,
                }
            );

            observer.observe(video);

            return () => {
                observer.disconnect();
            };
        }, [volume]);

        return (
            <div className="relative h-full w-full bg-black flex items-center justify-center">
                <video
                    ref={localVideoRef}
                    src={url}
                    controls
                    playsInline
                    loop
                    preload="metadata"
                    className="h-full w-full object-contain"
                />
            </div>
        );
    }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;