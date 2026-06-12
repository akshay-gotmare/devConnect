import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true },
      );

      dispatch(addUser(response.data.data));
      return navigate("/");

      // setEmail("");
      // setPassword("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[85vh] w-full px-4 ">
      <div className="flex flex-col rounded-xl bg-base-200 p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-mono text-primary self-center mb-2 ">
          DEV.Connect
        </h1>
        <h1 className="text-xl font-extrabold text-neutral-content self-center mb-2 tracking-tight">
          Log in
        </h1>

        <span className="self-center text-sm text-base-content/70 font-medium mb-6">
          Don't have an account?
          <a className="text-secondary hover:underline cursor-pointer ml-1 font-semibold">
            Register
          </a>
        </span>

        <button className="btn btn-neutral w-full flex justify-center items-center gap-3 bg-[#1e2330] border-none normal-case font-medium text-neutral-content py-4 h-auto rounded-lg">
          <i className="fa-brands fa-google text-indigo-400 text-lg"></i>
          Log in with Google
        </button>

        <div className="divider text-xs text-base-content/40 my-6 font-semibold tracking-wider">
          OR
        </div>

        <div className="flex flex-col gap-5">
          <label className="form-control w-full">
            <div className="label pt-0 pb-1">
              <span className="label-text text-sm text-base-content/80 font-medium">
                Email
              </span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>

          <label className="form-control w-full">
            <div className="label pt-0 pb-1 flex justify-between items-center">
              <span className="label-text text-sm text-base-content/80 font-medium">
                Password
              </span>
              <a className="text-sm text-accent hover:underline cursor-pointer font-medium">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>
        </div>

        <div className="form-control mt-5">
          <label className="cursor-pointer flex items-center self-start gap-3 select-none">
            <input
              type="checkbox"
              className="checkbox border-gray-700 bg-[#161a23] checkbox-sm rounded-md checked:bg-primary"
            />
            <span className="label-text text-sm text-base-content/70 font-medium">
              Remember me
            </span>
          </label>
        </div>

        <button
          onClick={handleLogin}
          className="btn btn-primary w-full mt-8 py-4 h-auto text-base font-bold rounded-lg tracking-wide border-none text-slate-900"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
