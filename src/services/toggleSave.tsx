"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const ToggleSave = async (
    postId: number,
    userId: string
) => {
    try {
        const response = await fetch(
            `${baseUrl}/api/save/toggle`,
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

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                saved: false,
                message: data.message || "Failed to save post.",
            };
        }

        return {
            success: data.success,
            saved: data.saved,
            message: data.message,
        };

    } catch (error) {
        console.error("Toggle save error:", error);

        return {
            success: false,
            saved: false,
            message: "Something went wrong.",
        };
    }
};