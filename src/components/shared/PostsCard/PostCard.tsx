import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { PostCardProps } from "@/interfaces/post";

const PostCard = ({ postItem, user }: PostCardProps) => {
    return (
        <article className="w-full max-w-[600px] mx-auto bg-white border-b border-gray-200 hover:bg-gray-50/50 transition">
            <PostHeader user={user} createdAt={postItem.createdAt} />
            <div className="pl-12 pr-4">
                <PostContent postItem={postItem} user={user} />
            </div>
        </article>
    );
};

export default PostCard;