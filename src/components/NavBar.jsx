import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/store/feedSlice";
import { removeConnection } from "../utils/store/conectionSlice";
import { removeUser } from "../utils/store/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get(BASE_URL + "/logout", { withCredentials: true });
    dispatch(removeUser);
    dispatch(removeFeed);
    dispatch(removeConnection);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 shadow-sm sticky top-0 z-10">
      <div className="navbar-start">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-primary text-2xl font-bold font-mono">
          DEV.connect
        </Link>
      </div>
      {user && (
        <div className="navbar-end">
          <span className="m-3">
            {user.lastName}, {user.firstName}
          </span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoUrl
                      ? user.photoUrl
                      : "https://i.pinimg.com/736x/fb/7a/17/fb7a17e227af3cf2e63c756120842209.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-primary-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
