import PostsCard from "@/components/shared/PostsCard";
import BloggerHeader from "@/components/shared/XFeedHeader";
import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";

const HomePage = async () => {
    const getPost = await getAllPosts();
    const posts: Post[] = getPost?.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50/50 pb-12 pt-4">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 sm:px-6">

                {/* Blog Feed Header / Navigation Tabs (DEV.to style) */}
                <BloggerHeader />

                {/* Feed Section */}
                <section className="flex flex-col gap-4">
                    {posts.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                            <h3 className="text-base font-semibold text-gray-800 mb-1">
                                No posts found
                            </h3>
                            <p className="text-sm text-gray-500">
                                Check back later or be the first one to publish an article!
                            </p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div 
                                key={post.id} 
                                className="transition-all duration-200"
                            >
                                <PostsCard post={post} />
                            </div>
                        ))
                    )}
                </section>
                
            </div>
        </main>
    );
};

export default HomePage;