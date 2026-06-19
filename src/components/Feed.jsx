import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];

  const fetchFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      const feedData = response?.data;
      dispatch(addFeed(feedData.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed.length === 0) {
    return <div className="text-center p-4">No users found in your feed.</div>;
  }
  return (
    <div>
      {/* {feed.map((user) => ( */}
      <div key={feed[0]._id} className="flex justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
      {/* ))} */}
    </div>
  );
};

export default Feed;
