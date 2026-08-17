import PostsCard from "@/components/shared/PostsCard";
import StoryTray from "@/components/story/StoryTray";
import { auth } from "@/lib/auth";

import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";
import { headers } from "next/headers";

const HomePage = async () => {

  const getPost = await getAllPosts();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const posts: Post[] =
    getPost?.data ?? [];

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5 w-11/12 mx-auto md:w-full">

      {/* Story Section */}
      
      {session?.user?.id ? (
        <StoryTray
          currentUserId={session.user.id}
        />
      ) : null}


      {/* Posts */}
      {posts.map((post) => (
        <PostsCard
          key={post.id}
          post={post}
        />
      ))}

    </div>
  );
};

export default HomePage;