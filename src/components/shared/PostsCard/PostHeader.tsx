import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/interfaces/post";

interface PostHeaderProps {
    user?: User;
    createdAt: string;
}

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    return (
        <div className="flex items-start justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center overflow-hidden relative">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User"}
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    ) : (
                        <span className="font-bold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-black hover:underline cursor-pointer">
                        {user?.name || "User"}
                    </span>
                    <span className="text-gray-500 text-xs">·</span>
                    <span className="text-gray-500 text-xs">
                        {new Date(createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <button className="text-gray-500 hover:text-black hover:bg-gray-100 p-2 rounded-full transition">
                <MoreHorizontal size={18} />
            </button>
        </div>
    );
};

export default PostHeader;