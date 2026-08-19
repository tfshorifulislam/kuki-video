import PostsCard from "@/components/shared/PostsCard";
import XFeedHeader from "@/components/shared/XFeedHeader"; // চাইলে এটা পরিবর্তন করে BlogHeader বানাতে পারেন
import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";

const HomePage = async () => {
    const getPost = await getAllPosts();
    const posts: Post[] = getPost?.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50/50 py-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4">
                
                {/* Blog Feed Header */}
                <div className="flex flex-col gap-2 border-b border-gray-200 pb-5">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Explore Stories & Ideas
                    </h1>
                    <p className="text-sm text-gray-600">
                        Discover thoughts, writing, and expertise from various writers.
                    </p>
                </div>

                <section className="flex flex-col gap-6">
                    {posts.length === 0 ? (
                        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center shadow-sm">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    No articles published yet
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Check back later for new stories and blog posts.
                                </p>
                            </div>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <PostsCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    )}
                </section>
            </div>
        </main>
    );
};

export default HomePage;