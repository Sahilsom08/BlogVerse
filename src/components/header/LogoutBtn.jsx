import { useDispatch } from "react-redux";
import authServiceObj from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authServiceObj.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
    className='btn'
    onClick={logoutHandler}
    >Logout</button>

  )
}
export default LogoutBtn;
