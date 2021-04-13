import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "../components/auth/LogOutBtn";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <Link to="/">Home</Link>
      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <LogOutBtn />
        </>
      )}
    </div>
  );
};

export default Navbar;
