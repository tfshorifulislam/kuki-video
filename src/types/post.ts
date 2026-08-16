import { Media } from "./media";
import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    description: string | null;
    media: Media[];
    createdAt: string;
    userId: string;
    user: User;
}


export interface PostsCardProps {
    post: Post;
}

export interface PostMediaProps {
    media: Post["media"];
    title?: string;
}

export interface CreatePostPayload {
    title?: string;
    media: Media[];
    userId: string;
}

