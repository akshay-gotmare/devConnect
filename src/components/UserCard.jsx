import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/store/requestSlice";
import { removeUserFromFeed } from "../utils/store/feedSlice";

const UserCard = ({ user, type = "feed", req_id = "" }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
    user;

  const dispatch = useDispatch();

  const reviewConection = async (action, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/sendConnectionRequest/${action}/${userId}`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200 && response.data) {
        dispatch(removeUserFromFeed(response.data.connection.toUserId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (action) => {
    try {
      const response = await axios.post(
        BASE_URL + `/sendConnectionRequest/review/${action}/${req_id}`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200 && response.data) {
        dispatch(removeRequest(req_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="h-90 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-top"
          src={
            user?.photoUrl
              ? user.photoUrl
              : "https://i.pinimg.com/736x/fb/7a/17/fb7a17e227af3cf2e63c756120842209.jpg"
          }
          alt="user photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {lastName},{firstName}
        </h2>
        <p>{about ? about : "No details"}</p>
        <p>
          {gender}, {age}
        </p>
        <div className="card-actions justify-center">
          {skills.map((skill) => (
            <div className="badge badge-outline">{skill}</div>
          ))}
        </div>
      </div>
      {type === "feed" && (
        <div className="card-actions justify-center gap-3">
          <button
            onClick={() => reviewConection("ignored", _id)}
            className="btn btn-error"
          >
            Ignore
          </button>
          <button
            onClick={() => reviewConection("interested", _id)}
            className="btn btn-primary"
          >
            Interested
          </button>
        </div>
      )}
      {type === "request" && (
        <div className="card-actions justify-center gap-3">
          <button
            name="rejected"
            className="btn btn-error"
            onClick={() => reviewRequest("rejected")}
          >
            Reject
          </button>
          <button
            name="accepted"
            className="btn btn-primary"
            onClick={() => reviewRequest("accepted")}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
