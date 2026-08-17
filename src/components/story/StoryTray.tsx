"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/story";
import { getStories } from "@/services/getStories";
import StoryViewer from "./StoryViewer";

interface StoryTrayProps {
    currentUserId: string;
}

export default function StoryTray({
    currentUserId,
}: StoryTrayProps) {

    const [stories, setStories] = useState<Story[]>([]);
    const [selectedUserIndex, setSelectedUserIndex] =
        useState<number | null>(null);

    useEffect(() => {

        async function loadStories() {

            try {
                const data = await getStories(
                    currentUserId
                );

                setStories(data);

            } catch (error) {
                console.error(error);
            }
        }

        loadStories();

    }, [currentUserId]);


    const grouped = Array.from(
        new Map(
            stories.map((story) => [
                story.userId,
                story,
            ])
        ).values()
    );


    return (
        <>
            <div className="flex gap-4 overflow-x-auto p-4">

                {/* Create Story */}

                <button
                    className="flex-shrink-0"
                >
                    <div className="
                        h-16
                        w-16
                        rounded-full
                        border-2
                        border-dashed
                        flex
                        items-center
                        justify-center
                    ">
                        +
                    </div>

                    <p className="text-xs mt-1">
                        Your story
                    </p>
                </button>


                {/* Stories */}

                {grouped.map(
                    (story, index) => {

                        const hasSeen =
                            story.views?.some(
                                (view) =>
                                    view.userId ===
                                    currentUserId
                            );

                        return (
                            <button
                                key={story.userId}
                                onClick={() =>
                                    setSelectedUserIndex(
                                        index
                                    )
                                }
                                className="flex-shrink-0"
                            >

                                <div
                                    className={`
                                        h-16
                                        w-16
                                        rounded-full
                                        p-[2px]
                                        ${
                                            hasSeen
                                                ? "bg-gray-400"
                                                : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                                        }
                                    `}
                                >
                                    <img
                                        src={
                                            story.user.image ??
                                            "/avatar.png"
                                        }
                                        alt={
                                            story.user.name ??
                                            "User"
                                        }
                                        className="
                                            h-full
                                            w-full
                                            rounded-full
                                            object-cover
                                            border-2
                                            border-white
                                        "
                                    />
                                </div>

                                <p className="
                                    text-xs
                                    mt-1
                                    max-w-16
                                    truncate
                                ">
                                    {story.user.name}
                                </p>

                            </button>
                        );
                    }
                )}

            </div>


            {selectedUserIndex !== null && (

                <StoryViewer
                    groups={Array.from(
                        new Map(
                            stories.map(
                                (story) => [
                                    story.userId,
                                    stories.filter(
                                        (item) =>
                                            item.userId ===
                                            story.userId
                                    ),
                                ]
                            )
                        ).values()
                    )}
                    initialUserIndex={
                        selectedUserIndex
                    }
                    currentUserId={
                        currentUserId
                    }
                    onClose={() =>
                        setSelectedUserIndex(null)
                    }
                />

            )}
        </>
    );
}