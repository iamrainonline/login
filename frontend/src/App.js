import React from "react";
import Home from "./components/Home";
import "./App.css";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
};

export default App;
