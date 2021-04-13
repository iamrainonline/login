import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://rain-jwt.herokuapp.com/customer/users").then((data) => {
      const newData = data.data;
      setUsers(newData);
    });
  }, []);

  const deleteName = (id) => {
    axios.delete(`https://rain-jwt.herokuapp.com/customer/users/${id}`);
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <h1>Welcome to Dashboard, Admin</h1>
        <div className="users">
          <h2> List of Registered Users:</h2>
          {users.map((users) => {
            return (
              <div key={users.email}>
                <h4>Email - {users.email}</h4>
                <button onClick={() => deleteName(users._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
