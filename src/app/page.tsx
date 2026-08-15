import PostCard from "@/components/shared/PostsCard/PostCard";
import { getAllPosts } from "@/lib/actions/serverAction/fetchAllPost";

interface Media {
  url: string;
  type: "image" | "video";
}

interface Post {
  id: number;
  title: string;
  description: string | null;
  media: Media[];
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  posts: Post[];
}

interface GetAllPostsResponse {
  success: boolean;
  message: string;
  data: User[];
}

export default async function HomePage() {
  const res: GetAllPostsResponse = await getAllPosts();

  return (
    <main className="min-h-screen py-6">
      <div className="w-full max-w-150 mx-auto space-y-6">
        {res.data.map((user) =>
          user.posts.map((post) => (
            <PostCard
              key={`${user.id}-${post.id}`}
              postItem={post}
              user={user}
            />
          ))
        )}
      </div>
    </main>
  );
}