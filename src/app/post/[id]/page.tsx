import PostsCard from "@/components/shared/PostsCard";

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

const PostPage = async ({ params }: PostPageProps) => {
    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Post not found
                </h1>
            </div>
        );
    }

    const data = await response.json();
    const  post = data?.post

    if (!data.success || !data.post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Post not found
                </h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 py-6">
            <PostsCard
                post={post}
            />
        </main>
    );
};

export default PostPage;