import { PostsCardProps } from "@/types/post";

const PostsCard = ({ post }: PostsCardProps) => {
    const {
        createdAt,
        title,
        media,
        user,

    } = post
    return (
        <div>

        </div>
    );
};

export default PostsCard;