import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (value, type) => {
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        return;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      if (response.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] w-full px-4 ">
      <div className="flex flex-col rounded-xl bg-base-200 p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-mono text-primary self-center mb-2 ">
          DEV.Connect
        </h1>
        <h1 className="text-xl font-extrabold text-neutral-content self-center mb-2 tracking-tight">
          Sign up
        </h1>

        <span className="self-center text-sm text-base-content/70 font-medium mb-6">
          Already have an account?
          <Link
            to="/login"
            className="text-secondary hover:underline cursor-pointer ml-1 font-semibold"
          >
            Log in
          </Link>
        </span>

        {/* <button className="btn btn-neutral w-full flex justify-center items-center gap-3 bg-[#1e2330] border-none normal-case font-medium text-neutral-content py-4 h-auto rounded-lg">
          <i className="fa-brands fa-google text-indigo-400 text-lg"></i>
          Log in with Google
        </button> */}

        <div className="divider text-xs text-base-content/40 my-6 font-semibold tracking-wider">
          OR
        </div>

        <div className="flex flex-col gap-5">
          <label className="form-control w-full">
            <div className="label pt-0 pb-1">
              <span className="label-text text-sm text-base-content/80 font-medium">
                First Name *
              </span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleChange(e.target.value, "firstName")}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>

          <label className="form-control w-full">
            <div className="label pt-0 pb-1">
              <span className="label-text text-sm text-base-content/80 font-medium">
                Last Name *
              </span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleChange(e.target.value, "lastName")}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>
          <label className="form-control w-full">
            <div className="label pt-0 pb-1">
              <span className="label-text text-sm text-base-content/80 font-medium">
                Email *
              </span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => handleChange(e.target.value, "email")}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>

          <label className="form-control w-full">
            <div className="label pt-0 pb-1 flex justify-between items-center">
              <span className="label-text text-sm text-base-content/80 font-medium">
                Password *
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => handleChange(e.target.value, "password")}
              className="input bg-[#161a23] border border-gray-800 focus:border-indigo-500 w-full rounded-lg h-12 text-neutral-content focus:outline-none"
            />
          </label>
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>

        {/* <div className="form-control mt-5">
          <label className="cursor-pointer flex items-center self-start gap-3 select-none">
            <input
              type="checkbox"
              className="checkbox border-gray-700 bg-[#161a23] checkbox-sm rounded-md checked:bg-primary"
            />
            <span className="label-text text-sm text-base-content/70 font-medium">
              Remember me
            </span>
          </label>
        </div> */}

        <button
          onClick={handleLogin}
          className="btn btn-primary w-full mt-8 py-4 h-auto text-base font-bold rounded-lg tracking-wide border-none text-slate-900"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Signup;
