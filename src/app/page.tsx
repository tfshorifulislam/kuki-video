import PostsCard from "@/components/shared/PostsCard";
import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";

const HomePage = async () => {

  const getPost = await getAllPosts()
  const posts:Post[] = await getPost?.data ?? [];
  console.log(posts)

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5 w-11/12 mx-auto md:w-full">
      {
        posts.map(post =>
          <PostsCard
            key={post.id}
            post={post}
          />
        )
      }
    </div>
  );
};

export default HomePage;