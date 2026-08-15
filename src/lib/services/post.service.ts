import { CreatePostPayload, } from "@/interfaces/post.interface";

const API_URL = process.env.NEXT_PUBLIC_URL
export const createPostService = async (postData: CreatePostPayload) => {
    try {
        const response = await fetch(`${API_URL}/api/posts/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        });

        return await response.json();
    } catch (error) {
        console.error("API Call Error:", error);
        return {
            success: false,
            message: "Server error occurred"
        };
    }
};