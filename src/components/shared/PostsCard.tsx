import { PostsCardProps } from "@/types/post";
import { Card } from "@/components/ui/card";
import PostMedia from "./PostMedia";
import PostHeader from "./PostCardHeader";
import PostCardFooter from "./PostCardFooter";
import { LikeStatus } from "@/services/getAllLikeAtOnePost";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const PostsCard = async ({ post }: PostsCardProps) => {
    const {
        createdAt,
        title,
        description,
        media,
        user,
        userId,
        id
    } = post;


    const getLikes = await LikeStatus(id, userId)
    console.log("like count", getLikes)

    const currentUserInfo = await auth.api.getSession({
        headers: await headers()
    })

    const currentUser = currentUserInfo?.user
    console.log(currentUser, 'user')

    return (
        <Card className="w-full max-w-155 mx-auto overflow-hidden rounded-none bg-white transition-colors">

            <PostHeader
                user={user}
                createdAt={createdAt}
            />


            <div className="px-4 pb-3">
                {title && (
                    <h2 className="mb-1 text-[15px] font-semibold leading-6 text-gray-950">
                        {title}
                    </h2>
                )}

                {description && (
                    <p className="whitespace-pre-wrap text-[15px] leading-6 text-gray-700">
                        {description}
                    </p>
                )}
            </div>

            <PostMedia
                media={media}
                title={title}
            />

            <PostCardFooter
                likesCount={getLikes.likesCount}
                postId={id}
                media={media}
                title={title}
                user={user}
                createdAt={createdAt}
                currentUser={currentUser}
            />
        </Card>
    );
};

export default PostsCard;