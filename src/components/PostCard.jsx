import serviceObj from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featureImg, author }) {
  // console.log(status);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full  h-full flex flex-col items-center text-center  rounded-2xl bg-[#38383d]  p-3 text-white card-hover">
        <div className="w-full  flex justify-center mb-4 h-[300px] ">
          <img
            src={serviceObj.getFilePreview(featureImg)}
            alt={title}
            className="rounded-2xl object-cover"
          />
        </div>
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <h2 className="text-lg text-gray-300 w-full text-left capitalize font-semibold">{author ? author: 'Anonymous'}</h2>
      </div>
    </Link>
  );
}
export default PostCard;
