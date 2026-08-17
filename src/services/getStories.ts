import { Story } from "@/types/story";

export async function getStories(
    userId?: string
): Promise<Story[]> {

    const url = userId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/stories?userId=${userId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/stories`;

    const response = await fetch(url, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch stories");
    }

    const data = await response.json();

    return data.stories;
}