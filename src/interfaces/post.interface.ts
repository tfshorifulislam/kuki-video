
export interface CreatePostPayload {
  title?: string;
  media: {
    url: string;
    type: "image" | "video";
  }[];
  userId: string;
}
