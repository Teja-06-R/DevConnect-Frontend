import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {removeUser} from '../utils/userSlice'
import { BaseUrl } from "../utils/constants";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
   try{
      await axios.post(BaseUrl+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate('/login');
   }
   catch(err){
    console.log(err);
   }
  }


  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content shadow-md">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl ">DevConnect</Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-10 relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center ring-2 ring-white/70">
                  <img
                    src={user.photoUrl}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>
              </div>
              <ul 
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
