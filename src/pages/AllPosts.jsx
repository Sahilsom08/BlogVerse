import { PostCard, Container } from "../components";
import serviceObj from "../appwrite/config";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  serviceObj.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8 bg-[#19191c] min-h-[80vh] ">
      <div>
        <h1 className="text-[2rem] text-white  md:text-[2.5rem] text-center font-semibold">
          All Posts
        </h1>
      </div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2  w-full sm:w-1/3  xl:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default AllPosts;
