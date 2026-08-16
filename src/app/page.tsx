import { getAllPosts } from "@/services/fetchAllPost";

const HomePage = async () => {

  const posts = await getAllPosts()
  console.log("posts", posts.data[0]);

  return (
    <div>

    </div>
  );
};

export default HomePage;