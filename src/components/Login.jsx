import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useState } from "react";
import authServiceObj from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authServiceObj.login(data);
      if (session) {
        const userData = await authServiceObj.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/all-posts");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#19191c] flex items-center justify-center h-[70vh] md:my-0 md:min-h-[90vh] text-sm">
      <div className="mx-auto w-[26rem] rounded-xl p-5 md:p-8 border-purple-700 border">
        <div className="mb-4 flex  justify-center items-center">
          <span className="inline-block w-full max-w-[80px] ">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-lg font-bold leading-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-gray-300 hover:text-white transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-6 text-white">
          <div className="space-y-4">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="my-3 font-semibold py-2 px-4 w-full text-white rounded-lg shadow-lg bg-purple-700 hover:bg-purple-800"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
