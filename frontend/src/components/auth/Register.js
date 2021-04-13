import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "../../img/avatar.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      await axios.post("/auth", registerData);
      await getLoggedIn();
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginbox">
      <div className="loginbox-wrapper">
        <img src={Avatar} class="avatar" alt="#"></img>
        <h1>Register a new account</h1>
        <form onSubmit={register}>
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />{" "}
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p>Re-type Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          />
          <br />
          {/* <button type="submit">Register</button> */}
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
