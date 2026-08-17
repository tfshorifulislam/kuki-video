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

    const apiUrl =
        process.env.NEXT_PUBLIC_URL;

    if (!apiUrl) {
        throw new Error(
            "NEXT_PUBLIC_URL is not defined"
        );
    }

    const response = await fetch(
        `${apiUrl}/api/stories`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                userId,
                mediaUrl,
                mediaType,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        console.error(
            "CREATE STORY API ERROR:",
            data
        );

        throw new Error(
            data?.message ??
            "Failed to create story"
        );
    }

    return data;
}