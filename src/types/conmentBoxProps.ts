import { Media } from "./media";

export interface CommentModalProps {
    postId: number;
    commentsCount?: number;
    title?: string;
    media?: Media[];
    createdAt?: string | Date;

    user?: {
        id: string;
        name?: string;
        image?: string | null;
    };

    currentUser?: {
        id: string;
        name?: string;
        image?: string | null;
    };
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    userId: string;
    createdAt: string;

    user: {
        id: string;
        name: string;
        image?: string | null;
    };

    post: {
        userId: string;
    };
}