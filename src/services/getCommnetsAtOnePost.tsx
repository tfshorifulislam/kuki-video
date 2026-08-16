'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const GetPostComments = async (postId: number) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/comments/post/${postId}`,
            {
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            console.error(
                'Failed to fetch comments:',
                response.status
            );

            return {
                success: false,
                comments: [],
            };
        }

        const data = await response.json();

        return {
            success: data.success,
            comments: data.comments ?? [],
        };
    } catch (error) {
        console.error('Error fetching comments:', error);

        return {
            success: false,
            comments: [],
        };
    }
};