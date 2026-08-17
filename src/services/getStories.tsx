import { Story } from "@/types/story";

export async function getStories(
    userId?: string
): Promise<Story[]> {

    const baseUrl =
        process.env.NEXT_PUBLIC_URL;

    console.log("API URL:", baseUrl);

    if (!baseUrl) {
        throw new Error(
            "NEXT_PUBLIC_URL is missing"
        );
    }

    const url = userId
        ? `${baseUrl}/api/stories?userId=${userId}`
        : `${baseUrl}/api/stories`;

    console.log("STORY REQUEST:", url);

    try {

        const response = await fetch(url, {
            cache: "no-store",
        });

        console.log(
            "STORY STATUS:",
            response.status
        );

        if (!response.ok) {

            const text =
                await response.text();

            console.error(
                "STORY RESPONSE:",
                text
            );

            throw new Error(
                `Stories API failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "STORY DATA:",
            data
        );

        return data.stories ?? [];

    } catch (error) {

        console.error(
            "STORY FETCH ERROR:",
            error
        );

        throw error;
    }
}