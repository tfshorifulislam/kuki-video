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

export interface PostHeaderProps {
    user?: {
        name?: string | null;
        image?: string | null;
        email?: string | null;
        emailVerified?: boolean | null;
    };
    createdAt: string | Date;
}


export interface PostCardFooterProps {
    postId: number;

    title?: string;
    media?: Media[];
    createdAt?: string | Date;

    likesCount?: number;
    commentsCount?: number;
    isLiked?: boolean;
    isSaved?: boolean;

    currentUser?: {
        id: string;
        name?: string;
        image?: string | null;
    };

    user?: {
        id: string;
        name?: string;
        image?: string | null;
    };

    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onSave?: () => void;
}


export interface CreatePostPayload {
    title?: string;
    media: Media[];
    userId: string;
}

