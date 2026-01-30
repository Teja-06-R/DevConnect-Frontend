import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
// import { BaseUrl } from "../utils/constants";
import { Code2, User, Users, Inbox, LogOut, Sparkles } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((store) => store.requests);
  const requestCount = requests?.length || 0;

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-all group-hover:scale-105">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DevConnect
            </span>
          </Link>

          {/* User Section */}
          {user && (
            <div className="flex items-center gap-4">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/connections"
                  className="px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Users className="w-4 h-4" />
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <Inbox className="w-4 h-4" />
                  Requests
                </Link>
              </div>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={user.photoUrl}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-300 transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-700">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">View profile</p>
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-2xl shadow-xl border border-slate-200 w-64 p-3 mt-2"
                >
                  {/* User Info Header */}
                  <li className="mb-2 pointer-events-none">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                      <p className="font-semibold text-slate-800">
                        {user.name} {user.lastName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        @{user.name?.toLowerCase()}
                      </p>
                    </div>
                  </li>

                  {/* Menu Items */}
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                      <User className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                      <span className="font-medium text-slate-700 group-hover:text-blue-600">
                        My Profile
                      </span>
                      <span className="ml-auto badge badge-sm bg-blue-100 text-blue-600 border-blue-200">
                        New
                      </span>
                    </Link>
                  </li>

                  {/* Mobile Only Links */}
                  <li className="md:hidden">
                    <Link
                      to="/connections"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                      <Users className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                      <span className="font-medium text-slate-700 group-hover:text-blue-600">
                        Connections
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/requests"
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                        <span className="font-medium text-slate-700 group-hover:text-blue-600">
                          Requests
                        </span>
                      </span>
                      {requestCount > 0 && (
                        <span className="badge badge-sm bg-red-500 text-white border-red-500">
                          {requestCount}
                        </span>
                      )}
                    </Link>
                  </li>

                  <div className="divider my-2"></div>

                  <li>
                    <a
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-all group cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
                      <span className="font-medium text-slate-700 group-hover:text-red-600">
                        Logout
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
