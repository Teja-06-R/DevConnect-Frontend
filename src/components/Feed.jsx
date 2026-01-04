import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BaseUrl + "/user/feed", {
        withCredentials: true,
      });
      console.log("ACTION:", addFeed);

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0) {
    return <h2 className="flex justify-center my-10">No new users founds!</h2>;
  }
  return feed && (
    <div className="w-full">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
