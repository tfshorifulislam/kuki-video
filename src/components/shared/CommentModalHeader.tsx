import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogClose } from "@/components/ui/dialog";
import { Props } from "@/types/user";
import { MoreHorizontal, X } from "lucide-react";

const CommentModalHeader = ({ user }: Props) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10 shrink-0">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image ?? undefined} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-gray-200 font-bold text-gray-700 text-xs">
                        {user?.name?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer">
                        {user?.name || "tyco_developers"}
                    </h3>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-xs text-blue-500 font-semibold cursor-pointer">Follow</span>
                </div>
            </div>
        </div>
    );
};

export default CommentModalHeader;