'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getAllPosts = async (cursor?: number, limit: number = 10) => {
    const url = cursor 
        ? `${baseUrl}/api/users/get-all-posts?cursor=${cursor}&limit=${limit}`
        : `${baseUrl}/api/users/get-all-posts?limit=${limit}`;

    const res = await fetch(url, {
        cache: "no-store"
    });

    const result = await res.json();
    return result;
};