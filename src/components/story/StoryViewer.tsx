"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { Story } from "@/types/story";

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


    const currentGroup =
        groups[userIndex] ?? [];

    const currentStory =
        currentGroup[storyIndex];


    const STORY_DURATION = 5000;


    // ============================================
    // VIEW STORY
    // ============================================

    useEffect(() => {

        if (!currentStory) return;

        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/stories/${currentStory.id}/view`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    userId: currentUserId,
                }),
            }
        ).catch(console.error);

    }, [
        currentStory,
        currentUserId,
    ]);


    // ============================================
    // PROGRESS
    // ============================================

    useEffect(() => {

        if (!currentStory) return;

        setProgress(0);

        const interval = setInterval(() => {

            setProgress((previous) => {

                const next =
                    previous +
                    100 /
                    (STORY_DURATION / 100);

                if (next >= 100) {

                    clearInterval(interval);

                    goNext();

                    return 100;
                }

                return next;
            });

        }, 100);

        return () => {
            clearInterval(interval);
        };

    }, [
        userIndex,
        storyIndex,
    ]);


    // ============================================
    // NEXT
    // ============================================

    function goNext() {

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
    }


    // ============================================
    // PREVIOUS
    // ============================================

    function goPrevious() {

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
    }


    if (!currentStory) {
        return null;
    }


    return (
        <div className="
            fixed
            inset-0
            z-[999]
            bg-black
            flex
            items-center
            justify-center
        ">

            {/* TOP */}

            <div className="
                absolute
                top-4
                left-1/2
                -translate-x-1/2
                w-full
                max-w-[500px]
                px-3
                z-20
            ">

                {/* Progress */}

                <div className="
                    flex
                    gap-1
                    mb-3
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
                                        bg-white/30
                                        rounded-full
                                        flex-1
                                        overflow-hidden
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


                {/* User */}

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
                                currentStory.user
                                    .image ??
                                "/avatar.png"
                            }
                            className="
                                w-9
                                h-9
                                rounded-full
                                object-cover
                            "
                        />

                        <span className="
                            text-white
                            text-sm
                            font-semibold
                        ">
                            {
                                currentStory.user
                                    .name
                            }
                        </span>

                    </div>


                    <button
                        onClick={onClose}
                        className="
                            text-white
                        "
                    >
                        <X size={28} />
                    </button>

                </div>

            </div>


            {/* MEDIA */}

            <div className="
                relative
                h-full
                w-full
                max-w-[500px]
                flex
                items-center
                justify-center
            ">

                {currentStory.mediaType ===
                "video" ? (

                    <video
                        src={
                            currentStory.mediaUrl
                        }
                        autoPlay
                        playsInline
                        muted
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


                {/* PREVIOUS AREA */}

                <button
                    onClick={goPrevious}
                    className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-1/3
                    "
                >
                    <ChevronLeft
                        className="
                            text-white
                            opacity-0
                        "
                    />
                </button>


                {/* NEXT AREA */}

                <button
                    onClick={goNext}
                    className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-1/3
                    "
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