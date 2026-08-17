
export interface Props {
    user?: User | null;
}

export interface User {
    id: string;
    name?: string | null;
    email?: string;
    emailVerified?: boolean;
    image?: string | null;
    createdAt?: string;
}