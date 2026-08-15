"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Volume2,
    VolumeX,
    Play,
    Pause,
} from "lucide-react";
import { Media } from "@/interfaces/post";

interface PostMediaProps {
    mediaList: Media[];
    postTitle?: string;
}

const PostMedia = ({ mediaList, postTitle }: PostMediaProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentMedia = mediaList[currentIndex];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                } else if (entry.isIntersecting && videoRef.current && currentMedia?.type === "video") {
                    videoRef.current.play().catch(() => {});
                    setIsPlaying(true);
                }
            },
            { threshold: 0.6 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [currentIndex, currentMedia?.type]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.clientWidth;
        const index = Math.round(scrollLeft / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const scrollToMedia = (index: number) => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth;
            containerRef.current.scrollTo({
                left: width * index,
                behavior: "smooth",
            });
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const dur = videoRef.current.duration;
            setDuration(dur);
            setProgress((current / dur) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = (parseFloat(e.target.value) / 100) * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            const targetVol = volume === 0 ? 0.5 : volume;
            setVolume(targetVol);
            if (videoRef.current) videoRef.current.volume = targetVol;
        } else {
            setIsMuted(true);
            if (videoRef.current) videoRef.current.volume = 0;
        }
    };

    if (!mediaList || mediaList.length === 0) return null;

    // const isVideo = currentMedia?.type === "video";

    return (
        <div className="w-full relative group bg-black flex items-center justify-center">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {mediaList.map((media, index) => {
                    const isMediaVideo = media.type === "video";

                    return (
                        <div
                            key={index}
                            className="w-full shrink-0 snap-center relative flex items-center justify-center bg-black"
                        >
                            {isMediaVideo ? (
                                <div className="w-full aspect-[9/16] max-h-[750px] relative flex items-center justify-center bg-black">
                                    <video
                                        ref={index === currentIndex ? videoRef : null}
                                        src={media.url}
                                        autoPlay={index === currentIndex}
                                        muted={isMuted}
                                        loop
                                        playsInline
                                        preload="auto"
                                        onTimeUpdate={index === currentIndex ? handleTimeUpdate : undefined}
                                        onClick={togglePlayPause}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />

                                    {!isPlaying && index === currentIndex && (
                                        <div 
                                            onClick={togglePlayPause}
                                            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
                                        >
                                            <div className="bg-black/60 p-3.5 rounded-full text-white backdrop-blur-sm">
                                                <Play size={28} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Controls Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress || 0}
                                            onChange={handleSeek}
                                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
                                        />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={togglePlayPause}
                                                    className="text-white hover:text-gray-300 transition"
                                                >
                                                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                                </button>

                                                <button
                                                    onClick={toggleMute}
                                                    className="text-white hover:text-gray-300 transition"
                                                >
                                                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                                </button>

                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={handleVolumeChange}
                                                    className="w-16 h-1 bg-white/40 rounded-lg appearance-none cursor-pointer accent-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full aspect-[4/5] max-h-[750px] relative flex items-center justify-center bg-black">
                                    <Image
                                        src={media.url}
                                        alt={postTitle || "Post media"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 600px"
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Previous Navigation Button */}
            {currentIndex > 0 && (
                <button
                    onClick={() => scrollToMedia(currentIndex - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition shadow-md z-30"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {/* Next Navigation Button */}
            {currentIndex < mediaList.length - 1 && (
                <button
                    onClick={() => scrollToMedia(currentIndex + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition shadow-md z-30"
                >
                    <ChevronRight size={20} />
                </button>
            )}

            {/* Media Pagination Dots */}
            {mediaList.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm z-30">
                    {mediaList.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToMedia(index)}
                            className={`h-1.5 rounded-full transition-all ${
                                currentIndex === index
                                    ? "w-4 bg-white"
                                    : "w-1.5 bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostMedia;