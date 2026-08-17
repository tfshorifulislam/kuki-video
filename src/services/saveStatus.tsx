"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const SaveStatus = async (
    postId: number,
    userId: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/save/status/${postId}/${userId}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                isSaved: false,
            };
        }

        return {
            success: data.success,
            isSaved: data.isSaved,
        };

    } catch (error) {
        console.error("Save status error:", error);

        return {
            success: false,
            isSaved: false,
        };
    }
};