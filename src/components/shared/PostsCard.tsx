import { PostsCardProps } from "@/types/post";
import { Card } from "@/components/ui/card";
import PostMedia from "./PostMedia";
import PostHeader from "./PostCardHeader";
import PostCardFooter from "./PostCardFooter";
import { LikeStatus } from "@/services/getAllLikeAtOnePost";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import PostTitleDescription from "./PostTitleDescription";

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

    const getLikes = await LikeStatus(id, userId);

    const currentUserInfo = await auth.api.getSession({
        headers: await headers()
    });

    const currentUser = currentUserInfo?.user;

    return (
        <div className="w-full ">

            {/* Author & Meta Header */}
            <div>
                <PostHeader
                    user={user}
                    createdAt={createdAt}
                />
            </div>

            {/* Blog Content / Title & Excerpt */}
            <PostTitleDescription
                title={title}
                description={description} />

            {/* Featured Blog Image/Media */}
            {media && media.length > 0 && (
                <div>
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                        <PostMedia media={media} title={title} />
                    </div>
                </div>
            )}

            {/* Footer with Claps/Likes, Bookmarks, and Comments */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                <PostCardFooter
                    likesCount={getLikes.likesCount}
                    postId={id}
                    media={media}
                    title={title}
                    user={user}
                    createdAt={createdAt}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
};

export default PostsCard;