interface CreateStoryParams {
    userId: string;
    mediaUrl: string;
    mediaType: "image" | "video";
}

export async function createStory({
    userId,
    mediaUrl,
    mediaType,
}: CreateStoryParams) {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stories`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                userId,
                mediaUrl,
                mediaType,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create story"
        );
    }

    return response.json();
}