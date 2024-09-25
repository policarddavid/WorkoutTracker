// src/pages/SignupPage.tsx
import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [first_name, setFirst_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/register/", {
        username,
        first_name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="background">
      <div className="signup-container">
        <SignupForm />
      </div>
      <Nav />
    </div>
  );
};

export default SignupPage;
