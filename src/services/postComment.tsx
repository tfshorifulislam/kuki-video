'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const CreateComment = async (
    postId: number,
    userId: string,
    content: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    userId,
                    content,
                }),
            }
        );

        if (!response.ok) {
            console.error(
                'Failed to create comment:',
                response.status
            );

            return {
                success: false,
                comment: null,
            };
        }

        const data = await response.json();

        return {
            success: data.success,
            comment: data.comment ?? null,
        };
    } catch (error) {
        console.error('Error creating comment:', error);

        return {
            success: false,
            comment: null,
        };
    }
};