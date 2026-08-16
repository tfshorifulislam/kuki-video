import { Media } from "./media";
import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    description: string | null;
    media: Media[];
    createdAt: string;
}

export interface CreatePostPayload {
    title?: string;
    media: Media[];
    userId: string;
}

export interface PostContentProps {
    postItem: Post;
    user?: User;
}


export interface PostCardProps {
    postItem: Post;
    user: User;
}