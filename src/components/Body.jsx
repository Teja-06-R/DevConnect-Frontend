import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
//import { BaseUrl } from "../utils/constants";
import api from "../utils/api";

import {addUser} from '../utils/userSlice'; 

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user);

const fetchUser = async () => {
  if (userdata) return;

  try {
    const res = await api.get( "/profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err?.response?.status === 401) {
      navigate("/login");
    } else {
      console.error("Unexpected error:", err);
    }
  }
};

  useEffect(()=>{
    fetchUser();  
  },[]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
  <NavBar />
  <div className="flex-grow flex justify-center items-start pt-16">
    <Outlet />
  </div>
  <Footer />
</div>
  );
};

export default Body;
