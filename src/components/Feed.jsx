import axios from "axios";
import React, { useEffect } from "react"; // ✅ Removed useCallback
import { BaseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, setLoading, setError } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Loader2, RefreshCw, Users } from "lucide-react";

const Feed = () => {
  const { users, currentIndex, loading, error } = useSelector(
    (store) => store.feed
  );
  const dispatch = useDispatch();

  // ✅ FIX: Simple effect, no dependencies on users.length
  useEffect(() => {
    const getFeed = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(BaseUrl + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data?.data || []));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Failed to load feed")
        );
      }
    };

    getFeed();
  }, []); // ✅ Empty deps = fetch once on mount

  // Manual refresh function
  const handleRefresh = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(BaseUrl + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to load feed")
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-slate-600 font-medium">Finding developers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="p-4 bg-red-50 rounded-full">
          <RefreshCw className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-slate-700 font-medium">{error}</p>
        <button
          onClick={handleRefresh}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="p-4 bg-slate-100 rounded-full">
          <Users className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-700">
          No new developers right now
        </h2>
        <p className="text-slate-500">Check back later for new connections 👋</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <div className="w-full">
      <div className="flex justify-center mb-2">
        <span className="text-sm text-slate-400">
          {currentIndex + 1} of {users.length} developers
        </span>
      </div>
      {currentUser && <UserCard user={currentUser} />}
    </div>
  );
};

export default Feed;