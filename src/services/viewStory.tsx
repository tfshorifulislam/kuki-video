export async function viewStory(
    storyId: number,
    userId: string
) {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/stories/${storyId}/view`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                userId,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to mark story as viewed"
        );
    }

    return response.json();
}