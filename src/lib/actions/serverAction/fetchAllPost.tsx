'use server';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getAllPosts = async () => {
    const res = await fetch(`${baseUrl}/api/users/get-all-users`, {
        cache: "no-store" 
    });

    const result = await res.json();
    return result;
};