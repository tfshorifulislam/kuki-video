import PostsCard from "@/components/shared/PostsCard";
import { getAllPosts } from "@/services/fetchAllPost";
import { Post } from "@/types/post";

const HomePage = async () => {

  const getPost = await getAllPosts()
  const posts:Post[] = await getPost?.data ?? [];
  // console.log(posts)

  return (
    <div>
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