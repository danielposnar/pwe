import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import Button from "react-bootstrap/esm/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const localUser = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if(localUser){
      const id = localUser._id;
      const data = await axios.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } 
  };
  return (
    <>
    <Button onClick={handleClick} variant="danger" type="submit" className="pull-right">
      Log out
    </Button>
    <ToastContainer />
    </>
    
  );
}