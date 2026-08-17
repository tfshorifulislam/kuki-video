"use client";

import { useEffect, useMemo, useState } from "react";

import { Story } from "@/types/story";
import { getStories } from "@/services/getStories";

import CreateStory from "./CreateStory";
import StoryViewer from "./StoryViewer";


interface StoryTrayProps {
    currentUserId: string;
}


export default function StoryTray({
    currentUserId,
}: StoryTrayProps) {

    const [stories, setStories] =
        useState<Story[]>([]);

    const [selectedUserIndex, setSelectedUserIndex] =
        useState<number | null>(null);

    const [loading, setLoading] =
        useState(true);


    // ============================================
    // LOAD STORIES
    // ============================================

    async function loadStories() {

        try {

            setLoading(true);

            const data =
                await getStories(
                    currentUserId
                );

            setStories(data);

        } catch (error) {

            console.error(
                "GET STORIES ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        loadStories();

    }, [currentUserId]);


    // ============================================
    // GROUP STORIES BY USER
    // ============================================

    const storyGroups = useMemo(() => {

        const map =
            new Map<string, Story[]>();


        for (const story of stories) {

            const existing =
                map.get(story.userId) ?? [];

            existing.push(story);

            map.set(
                story.userId,
                existing
            );
        }


        return Array.from(
            map.values()
        );

    }, [stories]);


    // ============================================
    // OPEN USER STORY
    // ============================================

    function openStory(
        userIndex: number
    ) {

        setSelectedUserIndex(
            userIndex
        );
    }


    // ============================================
    // CLOSE VIEWER
    // ============================================

    function closeViewer() {

        setSelectedUserIndex(null);

        // View করার পরে
        // seen status refresh
        loadStories();
    }


    return (
        <>
            <div className="
                flex
                gap-4
                overflow-x-auto
                p-4
                scrollbar-hide
            ">

                {/* ================================= */}
                {/* YOUR STORY */}
                {/* ================================= */}

                <div className="
                    flex
                    shrink-0
                    flex-col
                    items-center
                ">

                    <CreateStory
                        userId={
                            currentUserId
                        }
                        onCreated={
                            loadStories
                        }
                    />

                    <p className="
                        mt-1
                        max-w-16
                        truncate
                        text-xs
                    ">
                        Your story
                    </p>

                </div>


                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}

                {loading && (
                    <>
                        <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200" />

                        <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200" />
                    </>
                )}


                {/* ================================= */}
                {/* OTHER USERS */}
                {/* ================================= */}

                {!loading &&
                    storyGroups.map(
                        (group, index) => {

                            const firstStory =
                                group[0];

                            const hasSeen =
                                group.every(
                                    (story) =>
                                        story.views?.some(
                                            (view) =>
                                                view.userId ===
                                                currentUserId
                                        )
                                );


                            return (
                                <button
                                    type="button"
                                    key={
                                        firstStory.userId
                                    }
                                    onClick={() =>
                                        openStory(
                                            index
                                        )
                                    }
                                    className="
                                        flex
                                        shrink-0
                                        flex-col
                                        items-center
                                    "
                                >

                                    {/* Avatar */}

                                    <div
                                        className={`
                                            h-16
                                            w-16
                                            rounded-full
                                            p-0.5

                                            ${hasSeen
                                                ? "bg-gray-400"
                                                : "bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600"
                                            }
                                        `}
                                    >

                                        <img
                                            src={
                                                firstStory
                                                    .user
                                                    .image ??
                                                "/avatar.png"
                                            }
                                            alt={
                                                firstStory
                                                    .user
                                                    .name ??
                                                "User"
                                            }
                                            className="
                                                h-full
                                                w-full
                                                rounded-full
                                                border-2
                                                border-white
                                                object-cover
                                            "
                                        />

                                    </div>


                                    {/* Name */}

                                    <p className="
                                        mt-1
                                        max-w-16
                                        truncate
                                        text-xs
                                    ">
                                        {
                                            firstStory
                                                .user
                                                .name
                                        }
                                    </p>

                                </button>
                            );
                        }
                    )}

            </div>


            {/* ===================================== */}
            {/* STORY VIEWER */}
            {/* ===================================== */}

            {selectedUserIndex !== null && (

                <StoryViewer
                    groups={
                        storyGroups
                    }

                    initialUserIndex={
                        selectedUserIndex
                    }

                    currentUserId={
                        currentUserId
                    }

                    onClose={
                        closeViewer
                    }
                />

            )}

        </>
    );
}