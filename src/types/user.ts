
export interface Props {
    user?: User | null;
}

export interface User {
    id: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}