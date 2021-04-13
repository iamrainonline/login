import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  const logOut = async () => {
    await axios.get("https://rain-jwt.herokuapp.com/auth/logout");
    await getLoggedIn();
    history.push("/");
  };
  return (
    <button className="lgbtn" onClick={logOut}>
      Log Out
    </button>
  );
};

export default LogOutBtn;
