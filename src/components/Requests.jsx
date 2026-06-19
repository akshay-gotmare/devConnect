import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/store/requestSlice";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      const req = response?.data?.data;
      dispatch(addRequests(req));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return <div className="text-center p-4">No pending requests found.</div>;
  }
  return (
    <div>
      <h2 className="p-4 pb-6 text-md font-bold tracking-wider text-center">
        Connection requests received ({requests.length})
      </h2>
      {requests?.map((req) => (
        <div key={req._id} className="flex justify-center items-center">
          <UserCard user={req.fromUserId} type="request" req_id={req._id} />
        </div>
      ))}
    </div>
  );
};

export default Requests;
