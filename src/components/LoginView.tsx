import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import Nav from "./Nav";
import "./LoginView.css";

const LoginView: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="background">
      <div className="login-container">
        <LoginForm />
      </div>
      <Nav />
    </div>
  );
};

export default LoginView;
