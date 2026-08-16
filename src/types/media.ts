export interface MediaFile {
    file: File;
    previewUrl: string;
    isVideo: boolean;
}

export interface Media {
    url: string;
    type: "image" | "video";
}