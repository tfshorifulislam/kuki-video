"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const ToggleLike = async (
    postId: number,
    userId: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/like/toggle`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    userId,
                }),
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                "Toggle like request failed:",
                response.status
            );

            return {
                success: false,
                isLiked: false,
                likesCount: 0,
                message: "Failed to toggle like.",
            };
        }

        const data = await response.json();

        if (!data.success) {
            return {
                success: false,
                isLiked: false,
                likesCount: 0,
                message: data.message || "Failed to toggle like.",
            };
        }

        return {
            success: true,
            isLiked: Boolean(data.isLiked),
            likesCount: data.likesCount ?? 0,
            message: data.message,
        };
    } catch (error) {
        console.error("Toggle like error:", error);

        return {
            success: false,
            isLiked: false,
            likesCount: 0,
            message: "Something went wrong.",
        };
    }
};