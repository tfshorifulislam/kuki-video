"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Story } from "@/types/story";
import { viewStory } from "@/services/viewStory";


interface StoryViewerProps {
    groups: Story[][];
    initialUserIndex: number;
    currentUserId: string;
    onClose: () => void;
}


export default function StoryViewer({
    groups,
    initialUserIndex,
    currentUserId,
    onClose,
}: StoryViewerProps) {

    const [userIndex, setUserIndex] =
        useState(initialUserIndex);

    const [storyIndex, setStoryIndex] =
        useState(0);

    const [progress, setProgress] =
        useState(0);


    const videoRef =
        useRef<HTMLVideoElement>(null);


    const currentGroup =
        groups[userIndex] ?? [];


    const currentStory =
        currentGroup[storyIndex];


    // ============================================
    // NEXT STORY
    // ============================================

    const goNext = useCallback(() => {

        if (
            storyIndex <
            currentGroup.length - 1
        ) {

            setStoryIndex(
                (previous) =>
                    previous + 1
            );

            return;
        }


        if (
            userIndex <
            groups.length - 1
        ) {

            setUserIndex(
                (previous) =>
                    previous + 1
            );

            setStoryIndex(0);

            return;
        }


        onClose();

    }, [
        storyIndex,
        currentGroup.length,
        userIndex,
        groups.length,
        onClose,
    ]);


    // ============================================
    // PREVIOUS STORY
    // ============================================

    const goPrevious = useCallback(() => {

        if (storyIndex > 0) {

            setStoryIndex(
                (previous) =>
                    previous - 1
            );

            return;
        }


        if (userIndex > 0) {

            const previousGroup =
                groups[userIndex - 1];

            setUserIndex(
                (previous) =>
                    previous - 1
            );

            setStoryIndex(
                previousGroup.length - 1
            );
        }

    }, [
        storyIndex,
        userIndex,
        groups,
    ]);


    // ============================================
    // MARK AS VIEWED
    // ============================================

    useEffect(() => {

        if (!currentStory) {
            return;
        }


        viewStory(
            currentStory.id,
            currentUserId
        ).catch((error) => {

            console.error(
                "VIEW STORY ERROR:",
                error
            );

        });

    }, [
        currentStory,
        currentUserId,
    ]);


    // ============================================
    // IMAGE PROGRESS
    // ============================================

    useEffect(() => {

        if (!currentStory) {
            return;
        }


        // Video নিজের event
        // দিয়ে progress handle করবে

        if (
            currentStory.mediaType ===
            "video"
        ) {
            return;
        }


        setProgress(0);


        const duration = 5000;

        const start =
            Date.now();


        const interval =
            setInterval(() => {

                const elapsed =
                    Date.now() -
                    start;


                const percentage =
                    Math.min(
                        (elapsed /
                            duration) *
                            100,
                        100
                    );


                setProgress(
                    percentage
                );


                if (
                    percentage >=
                    100
                ) {

                    clearInterval(
                        interval
                    );

                    goNext();
                }

            }, 50);


        return () => {

            clearInterval(
                interval
            );

        };

    }, [
        currentStory,
        goNext,
    ]);


    // ============================================
    // VIDEO PROGRESS
    // ============================================

    function handleVideoTimeUpdate() {

        const video =
            videoRef.current;

        if (!video) {
            return;
        }


        if (
            !video.duration ||
            Number.isNaN(
                video.duration
            )
        ) {
            return;
        }


        const percentage =
            (video.currentTime /
                video.duration) *
            100;


        setProgress(
            percentage
        );
    }


    // ============================================
    // VIDEO LOADED
    // ============================================

    function handleVideoLoaded() {

        setProgress(0);

    }


    // ============================================
    // VIDEO ENDED
    // ============================================

    function handleVideoEnded() {

        setProgress(100);

        goNext();

    }


    // ============================================
    // NOTHING
    // ============================================

    if (!currentStory) {
        return null;
    }


    return (
        <div className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black
        ">

            {/* ================================= */}
            {/* TOP AREA */}
            {/* ================================= */}

            <div className="
                absolute
                left-1/2
                top-4
                z-20
                w-full
                max-w-[500px]
                -translate-x-1/2
                px-3
            ">

                {/* ================================= */}
                {/* PROGRESS BARS */}
                {/* ================================= */}

                <div className="
                    mb-3
                    flex
                    gap-1
                ">

                    {currentGroup.map(
                        (_, index) => {

                            let width = 0;


                            if (
                                index <
                                storyIndex
                            ) {
                                width = 100;
                            }


                            if (
                                index ===
                                storyIndex
                            ) {
                                width =
                                    progress;
                            }


                            return (
                                <div
                                    key={index}
                                    className="
                                        h-[3px]
                                        flex-1
                                        overflow-hidden
                                        rounded-full
                                        bg-white/30
                                    "
                                >

                                    <div
                                        className="
                                            h-full
                                            bg-white
                                        "
                                        style={{
                                            width:
                                                `${width}%`,
                                        }}
                                    />

                                </div>
                            );
                        }
                    )}

                </div>


                {/* ================================= */}
                {/* USER HEADER */}
                {/* ================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div className="
                        flex
                        items-center
                        gap-2
                    ">

                        <img
                            src={
                                currentStory
                                    .user
                                    .image ??
                                "/avatar.png"
                            }
                            alt={
                                currentStory
                                    .user
                                    .name ??
                                "User"
                            }
                            className="
                                h-9
                                w-9
                                rounded-full
                                object-cover
                            "
                        />

                        <span className="
                            text-sm
                            font-semibold
                            text-white
                        ">
                            {
                                currentStory
                                    .user
                                    .name
                            }
                        </span>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            text-white
                        "
                    >
                        <X size={28} />
                    </button>

                </div>

            </div>


            {/* ================================= */}
            {/* MEDIA */}
            {/* ================================= */}

            <div className="
                relative
                flex
                h-full
                w-full
                max-w-[500px]
                items-center
                justify-center
            ">

                {currentStory.mediaType ===
                "video" ? (

                    <video
                        ref={videoRef}
                        src={
                            currentStory.mediaUrl
                        }
                        autoPlay
                        playsInline
                        muted
                        onTimeUpdate={
                            handleVideoTimeUpdate
                        }
                        onLoadedMetadata={
                            handleVideoLoaded
                        }
                        onEnded={
                            handleVideoEnded
                        }
                        className="
                            max-h-full
                            max-w-full
                            object-contain
                        "
                    />

                ) : (

                    <img
                        src={
                            currentStory.mediaUrl
                        }
                        alt="Story"
                        className="
                            max-h-full
                            max-w-full
                            object-contain
                        "
                    />

                )}


                {/* ================================= */}
                {/* PREVIOUS */}
                {/* ================================= */}

                <button
                    type="button"
                    onClick={goPrevious}
                    className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-1/3
                    "
                    aria-label="Previous story"
                >
                    <ChevronLeft
                        className="
                            text-white
                            opacity-0
                        "
                    />
                </button>


                {/* ================================= */}
                {/* NEXT */}
                {/* ================================= */}

                <button
                    type="button"
                    onClick={goNext}
                    className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-1/3
                    "
                    aria-label="Next story"
                >
                    <ChevronRight
                        className="
                            text-white
                            opacity-0
                        "
                    />
                </button>

            </div>

        </div>
    );
}