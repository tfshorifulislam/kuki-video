import { ReactNode } from "react";
import { Media } from "./media";
import type { User } from "./user";

export interface CommentModalProps {
    postId: number;
    commentsCount?: number;
    title?: string;
    media?: Media[];
    createdAt?: string | Date;

    user?: User | null;
    currentUser?: User | null;

    handleLike: () => void;
    likesCount: number;
    isLiked: boolean;

    handleSave: () => void;
    isSaved: boolean;

    setIsShareOpen: (value: boolean) => void;
    children?: ReactNode;
}

export interface CommentUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    userId: string;
    parentId: number | null;
    createdAt: string;

    user: {
        id: string;
        name: string;
        image: string | null;
    };

    post: {
        userId: string;
    };

    likes?: {
        id: number;
        userId: string;
        commentId: number;
        createdAt: string;
    }[];

    isLiked?: boolean;

    replies?: Comment[];
}