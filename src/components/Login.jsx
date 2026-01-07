import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BaseUrl } from "../utils/constants";
import { Mail, Lock, Code2, AlertCircle, User } from "lucide-react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (isSignup && !formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.emailId.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (isSignup && formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const endpoint = isSignup ? "/signup" : "/login";
      const payload = isSignup 
        ? { name: formData.name, emailId: formData.emailId, password: formData.password }
        : { emailId: formData.emailId, password: formData.password };

      const res = await axios.post(
        BaseUrl + endpoint,
        payload,
        { withCredentials: true }
      );

      // Extract user data from response
      // Backend might return { data: {...} } or just {...}
      const userData = res.data.data || res.data;
      
      console.log('Response:', res.data);
      console.log('User data to dispatch:', userData);
      
      dispatch(addUser(userData));
      navigate("/");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data || "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setFormData({ name: "", emailId: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-200 mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isSignup ? "Join DevConnect" : "Welcome Back"}
          </h1>
          <p className="text-slate-600 mt-2">
            {isSignup 
              ? "Create your account and start connecting with developers"
              : "Sign in to continue connecting with developers"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name Field (Only for Signup) */}
          {isSignup && (
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="emailId"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700"
                placeholder="you@example.com"
                value={formData.emailId}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700"
                placeholder={isSignup ? "At least 6 characters" : "Enter your password"}
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            {isSignup && (
              <p className="text-xs text-slate-500 mt-2 ml-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {isSignup ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              isSignup ? "Create Account" : "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">
                {isSignup ? "Already have an account?" : "New to DevConnect?"}
              </span>
            </div>
          </div>

          {/* Toggle Link */}
          <div className="text-center">
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
            >
              {isSignup ? "Sign in instead →" : "Create an account →"}
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;