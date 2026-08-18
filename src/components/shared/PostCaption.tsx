import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

interface Props {
  user?: User | null;
  title?: string;
  createdAt?: string | Date;
}

const PostCaption = ({ user, title, createdAt }: Props) => {
  if (!title) return null;

  return (
    <div className="flex items-start gap-3 text-xs">
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarImage src={user?.image ?? undefined} alt={user?.name || "User"} />
        <AvatarFallback className="bg-gray-200 font-bold text-gray-700 text-xs">
          {user?.name?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0.5">
        <p className="text-gray-900 text-xs">
          <span className="font-semibold mr-2 cursor-pointer hover:underline">
            {user?.name || "tyco_developers"}
          </span>
          {title}
        </p>
        <p className="text-[10px] text-gray-400">
          {createdAt ? new Date(createdAt).toLocaleDateString() : "1d"}
        </p>
      </div>
    </div>
  );
};

export default PostCaption;