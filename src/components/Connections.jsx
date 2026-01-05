import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl } from '../utils/constants';
import axios from "axios";
import { addConnections } from '../utils/connectionsSlice';
import { Users, Code2, Mail, Calendar } from 'lucide-react';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections);

  const getUserConnections = async () => {
    try {
      const res = await axios.get(BaseUrl + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Connections Yet</h2>
          <p className="text-slate-600">
            Start connecting with developers to grow your network!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Connections</h1>
        <p className="text-slate-600">
          You have {connections.length} connection{connections.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 h-24 relative">
              <div className="absolute -bottom-12 left-6">
                <img
                  src={connection.photoUrl}
                  alt={connection.name}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                />
              </div>
            </div>

            {/* Card Content */}
            <div className="pt-16 px-6 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {connection.name}
              </h3>

              {/* Age & Gender */}
              {(connection.age || connection.gender) && (
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  {connection.age && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {connection.age} years
                    </span>
                  )}
                  {connection.gender && (
                    <span className="capitalize">{connection.gender}</span>
                  )}
                </div>
              )}

              {/* About */}
              {connection.about && (
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {connection.about}
                </p>
              )}

              {/* Skills */}
              {connection.skills && connection.skills.length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <Code2 className="w-3.5 h-3.5" />
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {connection.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                    {connection.skills.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                        +{connection.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;