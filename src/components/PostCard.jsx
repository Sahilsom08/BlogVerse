import serviceObj from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featureImg }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full  h-[90%] flex flex-col items-center text-center  rounded-2xl bg-[#38383d]  p-3 hover:bg-gray-200 text-white hover:text-black ">
        <div className="w-full  flex justify-center mb-4 h-[80%] ">
          <img
            src={serviceObj.getFilePreview(featureImg)}
            alt={title}
            className="rounded-2xl w-[250px] sm:w-full"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
export default PostCard;
