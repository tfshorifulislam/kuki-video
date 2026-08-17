"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const CreateComment = async (
    postId: number,
    userId: string,
    content: string,
    parentId: number | null = null
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    userId,
                    content,
                    parentId,
                }),
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                comment: null,
                message:
                    data.message ||
                    "Failed to create comment.",
            };
        }

        return {
            success: true,
            comment: data.comment,
            message: data.message,
        };

    } catch (error) {
        console.error(
            "Create comment error:",
            error
        );

        return {
            success: false,
            comment: null,
            message: "Something went wrong.",
        };
    }
};