export interface PostCardProps {
    post: {
        id: number;
        title: string;
        description?: string;
        media: Array<{ previewUrl: string; isVideo: boolean }>;
        createdAt: string;
    };
    user: {
        name: string;
        image?: string | null;
    };
}