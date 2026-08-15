"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Volume2,
    VolumeX,
    Play,
    Pause,
} from "lucide-react";
import { PostCardProps } from "@/interfaces/post";

const PostCard = ({ postItem, user }: PostCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaList = postItem?.media || [];

    // স্ক্রিন থেকে চলে গেলে ভিডিও অটো পজ এবং মিউট হয়ে যাবে
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
    }, [currentIndex]);

    const currentMedia = mediaList[currentIndex];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.clientWidth;
        const index = Math.round(scrollLeft / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const scrollToImage = (index: number) => {
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
            setCurrentTime(current);
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

    return (
        <article className="w-11/12 mx-auto md:w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gray-300 p-px bg-gray-50 flex items-center justify-center overflow-hidden relative">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                fill
                                sizes="40px"
                                className="object-cover grayscale"
                            />
                        ) : (
                            <span className="font-semibold text-gray-800 text-sm">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(postItem.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition">
                    <MoreHorizontal size={21} />
                </button>
            </div>

            {/* Media Container */}
            {mediaList.length > 0 && (
                <div className="w-full bg-black aspect-square relative group overflow-hidden">
                    <div
                        ref={containerRef}
                        onScroll={handleScroll}
                        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {mediaList.map((media, index) => (
                            <div
                                key={index}
                                className="w-full h-full shrink-0 snap-center relative flex items-center justify-center bg-black"
                            >
                                {media.type === "video" ? (
                                    <div className="w-full h-full relative flex items-center justify-center">
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
                                            className="w-full h-full object-contain cursor-pointer"
                                        />

                                        {!isPlaying && index === currentIndex && (
                                            <div 
                                                onClick={togglePlayPause}
                                                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                                            >
                                                <div className="bg-black/60 p-3 rounded-full text-white backdrop-blur-sm">
                                                    <Play size={32} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Video Control Bar */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
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
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={media.url}
                                            alt={postItem.title || "Post media"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 600px"
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Previous Button */}
                    {currentIndex > 0 && (
                        <button
                            onClick={() => scrollToImage(currentIndex - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md z-10"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    {/* Next Button */}
                    {currentIndex < mediaList.length - 1 && (
                        <button
                            onClick={() => scrollToImage(currentIndex + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md z-10"
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}

                    {/* Pagination Dots */}
                    {mediaList.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
                            {mediaList.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToImage(index)}
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
            )}

            {/* Content Section */}
            <div className="px-4 pt-3 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-800">
                        <button className="hover:text-black transition">
                            <Heart size={25} />
                        </button>
                        <button className="hover:text-black transition">
                            <MessageCircle size={25} />
                        </button>
                        <button className="hover:text-black transition">
                            <Send size={25} />
                        </button>
                    </div>

                    <button className="text-gray-800 hover:text-black transition">
                        <Bookmark size={25} />
                    </button>
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-900">
                    0 likes
                </p>

                {postItem?.title && (
                    <p className="mt-2 text-sm text-gray-900">
                        <span className="font-semibold mr-2">{user?.name}</span>
                        {postItem.title}
                    </p>
                )}

                {postItem?.description && (
                    <p className="mt-1 text-sm text-gray-700">
                        {postItem.description}
                    </p>
                )}

                <button className="mt-2 text-sm text-gray-500 hover:text-gray-800 transition">
                    View all comments
                </button>

                <p className="mt-2 text-[10px] uppercase text-gray-400 tracking-wider">
                    {new Date(postItem.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
        </article>
    );
};

export default PostCard;