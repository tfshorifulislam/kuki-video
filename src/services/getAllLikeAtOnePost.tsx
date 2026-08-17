"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const LikeStatus = async (
    postId: number,
    userId: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/like/status/${postId}/${userId}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                "Like status request failed:",
                response.status
            );

            return {
                likesCount: 0,
                isLiked: false,
            };
        }

        const data = await response.json();

        if (!data.success) {
            return {
                likesCount: 0,
                isLiked: false,
            };
        }

        return {
            likesCount: data.likesCount ?? 0,
            isLiked: Boolean(data.isLiked),
        };
    } catch (error) {
        console.error("Failed to fetch like status:", error);

        return {
            likesCount: 0,
            isLiked: false,
        };
    }
};