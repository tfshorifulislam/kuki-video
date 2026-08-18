import PostsCard from "@/components/shared/PostsCard";
import XFeedHeader from "@/components/shared/XFeedHeader";
import XPostComposer from "@/components/shared/XPostComposer";

import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";

const HomePage = async () => {

    const getPost = await getAllPosts();

    const posts: Post[] =
        getPost?.data ?? [];

    return (
        <main className="min-h-screen bg-white">

            <div className="mx-auto flex w-full max-w-150 flex-col border-x border-gray-200">


                <XFeedHeader />

                <XPostComposer />

                <section>

                    {posts.length === 0 ? (

                        <div className="flex min-h-75 items-center justify-center px-6 text-center">

                            <div>
                                <h2 className="text-xl font-bold">
                                    No posts yet
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    When people post, you'll see
                                    their posts here.
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