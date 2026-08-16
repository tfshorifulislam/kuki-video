import { MediaFile } from "./media"; 
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
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveFile: (index: number) => void;
    onCancel: () => void;
}