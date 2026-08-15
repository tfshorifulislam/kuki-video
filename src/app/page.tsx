import PostCard from "@/components/shared/PostsCard/PostCard";
import { getAllPosts } from "@/lib/actions/serverAction/fetchAllPost";

export default async function HomePage() {
  const res = await getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="w-full max-w-[600px] mx-auto space-y-6">
        {res?.data?.map((user: any) =>
          user.posts?.map((post: any) => (
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