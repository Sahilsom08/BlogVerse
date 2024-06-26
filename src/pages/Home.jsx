import { useEffect, useState } from "react";
import serviceObj from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import heroImgOne from "../../public/images/one.svg"


function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    serviceObj.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="bg-[#19191c] w-full h-screen flex py-16  md:p-0 md:items-center">
      <Container>
        <div className=" max-w-[1200px] h-[28rem] flex flex-col items-center md:flex-row m-auto rounded-lg gap-7 md:gap-10">
          <div className=" w-full md:w-1/2 flex flex-col  gap-5">
            <h1 className="text-4xl md:text-7xl font-extrabold text-purple-700 ">
              Create a{" "}
              <span className="bg-gradient-to-r from-yellow-300  to-orange-500 text-transparent bg-clip-text">
                unique
              </span>{" "}
              and beautiful blog
            </h1>
            <p className="text-white text-base">
              Unleash your inner writer and explore a universe of ideas! Share
              your stories, passions, discoveries on Blogverse.
            </p>
            {authStatus ? (
               <button
               className="text-white w-40 md:w-48 py-2  rounded-full font-semibold bg-orange-500"
               onClick={() => navigate("/add-post")}
             >
               Start Writing
             </button>
            ) : (
              <button
                className="text-white w-40 md:w-48 py-2  rounded-full font-semibold bg-orange-500"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            )}
          </div>
          <div className=" w-full md:w-1/2 flex items-center justify-center">
            <img
              className="w-[350px] md:w-[500px]"
              src={`${heroImgOne}`}
              alt="Hero Image"
            />
          </div>
        </div>
      </Container>
    </div>
  );

}
export default Home;
