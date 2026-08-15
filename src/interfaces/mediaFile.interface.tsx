export interface MediaFile {
    file: File;
    previewUrl: string;
    isVideo: boolean;
}

export interface CreatePostModalProps {
    user?: {
        id: string;
        name: string;
        email: string;
        image?: string | null;
    };

    mediaList: MediaFile[];
    title: string;
    isUploading: boolean;

    fileInputRef: React.RefObject<HTMLInputElement | null>;

    onTitleChange: (value: string) => void;

    onPublish: () => void;
    onFileChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onRemoveFile: (index: number) => void;
    onCancel: () => void;
}

