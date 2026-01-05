import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { Inbox, Check, X, Code2, Calendar } from 'lucide-react';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loadingStates, setLoadingStates] = useState({});

  const getUserRequests = async () => {
    try {
      const res = await axios.get(BaseUrl + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.connectionRequests));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    // Set loading state for this specific request
    setLoadingStates(prev => ({ ...prev, [requestId]: status }));

    try {
      await axios.post(
        BaseUrl + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      
      // Remove request from UI after successful action
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    } finally {
      // Clear loading state
      setLoadingStates(prev => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };

  useEffect(() => {
    getUserRequests();
  }, []);

  if (requests === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Pending Requests</h2>
          <p className="text-slate-600">
            You're all caught up! New connection requests will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Connection Requests</h1>
        <p className="text-slate-600">
          {requests.length} pending request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => {
          const { _id, name, photoUrl, age, gender, about, skills } = request.fromUserId;
          const isLoading = loadingStates[request._id];

          return (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={photoUrl}
                      alt={name}
                      className="w-24 h-24 rounded-2xl border-2 border-slate-200 object-cover bg-white"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {name}
                    </h3>

                    {/* Age & Gender */}
                    {(age || gender) && (
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                        {age && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {age} years
                          </span>
                        )}
                        {gender && (
                          <span className="capitalize">{gender}</span>
                        )}
                      </div>
                    )}

                    {/* About */}
                    {about && (
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {about}
                      </p>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          <Code2 className="w-3.5 h-3.5" />
                          Tech Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => reviewRequest("rejected", request._id)}
                        disabled={isLoading}
                        className="flex-1 md:flex-initial px-6 py-3 bg-white hover:bg-red-50 border-2 border-slate-200 hover:border-red-300 rounded-xl font-semibold text-slate-600 hover:text-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading === 'rejected' ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5" />
                            Reject
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => reviewRequest("accepted", request._id)}
                        disabled={isLoading}
                        className="flex-1 md:flex-initial px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading === 'accepted' ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Accepting...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Accept
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;