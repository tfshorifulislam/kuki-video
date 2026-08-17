export interface CommentLike {
    id: number;
    userId: string;
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    userId: string;
    createdAt: string;

    post: {
        userId: string;
    };

    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };

    likes: CommentLike[];

    replies?: Comment[];
}