import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/store/conectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1>No connections found!</h1>;
  return (
    <div className="max-width-xl min-w-lg mx-auto p-4">
      <ul className="list bg-base-300 rounded-box shadow-md w-full">
        <li className="p-4 pb-6 text-md font-bold tracking-wider text-center">
          Accepted Connections
        </li>
        {connections.map((conn) => (
          <li key={conn._id} className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={
                  conn.photoUrl
                    ? conn.photoUrl
                    : "https://img.daisyui.com/images/profile/demo/1@94.webp"
                }
              />
            </div>
            <div>
              <div className="capitalize flex gap-1">
                <h2>{conn.firstName}</h2>
                <h2>{conn.lastName}</h2>
              </div>
              <div className="text-xs capitalize font-semibold opacity-60 flex gap-3">
                <p>{conn.gender}</p>
                <p>{conn.age} years</p>
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </button>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </g>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
