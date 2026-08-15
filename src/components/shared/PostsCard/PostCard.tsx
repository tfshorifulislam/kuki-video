import { PostCardProps } from "@/interfaces/post";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostContent from "./PostContent";

const PostCard = ({ postItem, user }: PostCardProps) => {
    return (
        <article className="w-full max-w-[600px] mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6 flex flex-col">
            
            {/* Header Section */}
            <PostHeader user={user} createdAt={postItem.createdAt} />

            {/* Media Section: এখানে কোনো fixed aspect ratio নেই, ছবি বড় এবং ন্যাচারাল দেখাবে */}
            <div className="w-full bg-black relative overflow-hidden flex items-center justify-center">
                <PostMedia mediaList={postItem?.media || []} postTitle={postItem?.title} />
            </div>

            {/* Content Section */}
            <PostContent postItem={postItem} user={user} />
            
        </article>
    );
};

export default PostCard;