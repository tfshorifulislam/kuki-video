import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/interfaces/post"; // আপনার সঠিক পাথ দিন

interface PostHeaderProps {
    user?: User;
    createdAt: string;
}

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-300 p-px bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User"}
                            fill
                            sizes="40px"
                            className="object-cover grayscale"
                        />
                    ) : (
                        <span className="font-semibold text-gray-800 text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                    )}
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-900">
                        {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition">
                <MoreHorizontal size={21} />
            </button>
        </div>
    );
};

export default PostHeader;