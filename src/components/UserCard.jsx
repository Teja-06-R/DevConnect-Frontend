import React from 'react';
import { Code2, MapPin, Briefcase, Github, Linkedin, Mail, X, Heart, Sparkles } from 'lucide-react';

const UserCard = ({ user }) => {
  if (!user) return null;

  const { 
    name,
    photoUrl,
    about,
    skills,
    age,
    gender
  } = user;

  

  return (
    <div className="flex items-center justify-center w-full py-8 px-4">
      <div className="w-full max-w-md transition-all duration-300">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Header Section with Image */}
          <div className="relative h-72 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Profile Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-30"></div>
                <img
                  src={photoUrl}
                  alt={name}
                  className="relative w-44 h-44 rounded-full border-4 border-white shadow-2xl object-cover bg-white"
                />
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            </div>

            {/* Intent Badge */}
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-slate-700">Open to Connect</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110">
                <Mail className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-5">
            
            {/* Name and Info */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {name}
              </h2>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                {age && <span>{age} years</span>}
                {gender && <span className="capitalize">{gender}</span>}
              </div>
            </div>

            {/* Bio */}
            {about && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-slate-700 text-sm leading-relaxed text-center">
                  {about}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all hover:scale-105 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                className="flex-1 py-4 bg-white hover:bg-red-50 border-2 border-slate-200 hover:border-red-300 rounded-2xl font-semibold text-slate-600 hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
              >
                <X className="w-5 h-5 transition-transform duration-300" />
                Pass
              </button>
              <button 
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 active:scale-95"
              >
                <Heart className="w-5 h-5" />
                Connect
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                🔒 Only connects when both are interested
              </p>
            </div>
          </div>
        </div>

        {/* Context Hint */}
        <div className="text-center mt-6 space-y-1">
          <p className="text-slate-600 text-sm font-medium">
            Finding your next collaborator
          </p>
          <p className="text-slate-400 text-xs">
            No spam • No noise • Just meaningful connections
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;