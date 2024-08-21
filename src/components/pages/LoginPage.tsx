// src/pages/LoginPage.tsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthTokens, setLoading, setUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setUser(jwtDecode(response.data.access));
        setLoading(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleLogin}>
        {" "}
        Submit
      </button>
    </div>
  );
};

export default LoginPage;
