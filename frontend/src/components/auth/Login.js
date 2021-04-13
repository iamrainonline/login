import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "../../img/avatar.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("/auth/login", loginData);
      await getLoggedIn();

      history.push("/dashboard");
    } catch (error) {
      // error.response.status === 401 && setError(error.response.data.msg);
      const myError = error.response.data.errorMessage;
      setError(myError);
    }
  }

  return (
    <div className="loginbox">
      <div className="loginbox-wrapper">
        <img src={Avatar} class="avatar" alt="#"></img>
        <h1>{isError && <span>{isError}</span>}</h1>
        <h1>Login to your account</h1>
        <form onSubmit={login}>
          <p>Username</p>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <input type="submit" name="" value="Login" />
          <a href="#">Lost your password?</a>
          <br />
          <a href="#">Don't have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
