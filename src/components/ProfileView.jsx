import React, { useState } from 'react';
import { Code2, Mail, Calendar, Edit3, Github, Linkedin, Briefcase } from 'lucide-react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const ProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((store) => store.user);
  console.log('ProfileView rendered with user:', user);
  if (!user) return null;

  // Show EditProfile component when editing
  if (isEditing) {
    return <EditProfile user={user} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Header with Cover */}
          <div className="relative h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl hover:bg-white transition-all shadow-lg hover:scale-105 flex items-center gap-2 font-semibold text-slate-700"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Profile Image Section */}
          <div className="relative px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-20">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-40 h-40 rounded-3xl border-4 border-white shadow-2xl object-cover bg-white"
                />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
              </div>

              {/* Name and Basic Info */}
              <div className="flex-1 md:mb-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                  {user.age && (
                    <span className="flex items-center gap-1.5 text-sm">
                      <Calendar className="w-4 h-4" />
                      {user.age} years
                    </span>
                  )}
                  {user.gender && (
                    <span className="capitalize text-sm">
                      {user.gender}
                    </span>
                  )}
                  {user.emailId && (
                    <span className="flex items-center gap-1.5 text-sm">
                      <Mail className="w-4 h-4" />
                      {user.emailId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-8 pb-8 space-y-6">
            
            {/* About Section */}
            {user.about && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  About
                </h2>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-slate-700 leading-relaxed">{user.about}</p>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links Section */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">Social Links</h2>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  <Github className="w-5 h-5 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">GitHub</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  <Linkedin className="w-5 h-5 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">LinkedIn</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Cards (Optional - You can add later) */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-slate-600 mt-1">Connections</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
            <p className="text-3xl font-bold text-indigo-600">0</p>
            <p className="text-sm text-slate-600 mt-1">Projects</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-slate-600 mt-1">Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;