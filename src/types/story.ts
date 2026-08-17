export interface StoryUser {
    id: string;
    name: string | null;
    image: string | null;
}

export interface StoryView {
    id?: number;
    userId: string;
}

export interface Story {
    id: number;

    userId: string;

    mediaUrl: string;

    mediaType: "image" | "video";

    createdAt: string;

    expiresAt: string;

    user: StoryUser;

    views?: StoryView[];
}