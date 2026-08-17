"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const ToggleCommentLike = async (
    commentId: number,
    userId: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/comment-likes/toggle`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commentId,
                    userId,
                }),
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                isLiked: false,
                likesCount: 0,
                message: data.message || "Failed to like comment.",
            };
        }

        return data;

    } catch (error) {
        console.error("Toggle comment like error:", error);

        return {
            success: false,
            isLiked: false,
            likesCount: 0,
            message: "Something went wrong.",
        };
    }
};