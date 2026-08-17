'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const CreateComment = async (
    postId: number,
    userId: string,
    content: string
) => {
    try {
        console.log("BASE URL:", baseUrl);
        console.log("POST ID:", postId);
        console.log("USER ID:", userId);
        console.log("CONTENT:", content);

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
                }),
                cache: "no-store",
            }
        );

        console.log("RESPONSE STATUS:", response.status);

        const data = await response.json();

        console.log("RESPONSE DATA:", data);

        if (!response.ok) {
            return {
                success: false,
                comment: null,
                message: data.message ?? "Failed to create comment",
            };
        }

        return {
            success: data.success,
            comment: data.comment ?? null,
            message: data.message,
        };
    } catch (error) {
        console.error("========== CREATE COMMENT ERROR ==========");
        console.error(error);

        return {
            success: false,
            comment: null,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        };
    }
};