// types/post.ts

export interface Media {
    url: string;
    type: "image" | "video";
}

export interface Post {
    id: number;
    title: string;
    description: string | null;
    media: Media[];
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    posts: Post[];
}

export interface PostCardProps {
    postItem: Post;
    user: User;
}// types/post.ts

export interface Media {
    url: string;
    type: "image" | "video";
}

export interface Post {
    id: number;
    title: string;
    description: string | null;
    media: Media[];
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    posts: Post[];
}

export interface PostCardProps {
    postItem: Post;
    user: User;
}