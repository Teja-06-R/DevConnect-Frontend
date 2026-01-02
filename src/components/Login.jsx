import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BaseUrl } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
       BaseUrl+"/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center pt-24 ">
      <div className="bg-base-200 rounded-xl p-6 shadow-xl w-80 md:w-96">
        <h1 className="text-2xl font-bold mb-4  ">Login</h1>

        <label className="label">Email</label>
        <input
          className="input input-bordered w-full "
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label mt-3">Password</label>
        <input
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 pt-1.5">{error}</p>
        <button className="btn btn-primary w-full mt-6 tracking-wide" 
        onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
