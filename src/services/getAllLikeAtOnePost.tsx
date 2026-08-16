'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const LikeStatus = async (postId: number, userId: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/like/status/${postId}/${userId}`, {
            cache: 'no-store',
        });

        const data = await response.json();

        if (data.success) {
            console.log("Total likes count:", data.likesCount);
            console.log("Is liked by user:", data.isLiked);

            return {
                likesCount: data.likesCount,
                isLiked: data.isLiked,
            };
        }

        return { likesCount: 0, isLiked: false };
    } catch (error) {
        console.error("Failed to fetch like status:", error);
        return { likesCount: 0, isLiked: false };
    }
};