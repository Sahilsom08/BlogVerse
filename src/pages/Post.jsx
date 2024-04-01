import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serviceObj from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      serviceObj.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    serviceObj.deletePost(post.$id).then((status) => {
      if (status) {
        serviceObj.deleteFile(post.featureImg);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="flex  justify-center py-8 bg-[#19191c] min-h-[80vh]">
      
      <div className="max-w-[60rem] ">
        <Container>
          <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2 max-h-80">
            <img
              src={serviceObj.getFilePreview(post.featureImg)}
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 ">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-[#ffffff]"
                    textColor="text-black"
                    className="mr-3 rounded-lg hover:bg-red-100 hover:font-semibold hover:text-red-500"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-[#ffffff]"
                  textColor="text-black"
                  className="mr-3 rounded-lg hover:bg-red-100  hover:font-semibold hover:text-red-500"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6 px-3">
            <h1 className="text-2xl font-bold text-white">{post.title}</h1>
            <div className="browser-css  text-white">{parse(post.content)}</div>
          </div>
        </Container>
      </div>
    </div>
  ) : null;
}
