import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("loggedIn", "true");
        axios
          .get("http://127.0.0.1:8000/user/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            localStorage.setItem(
              `myWorkout`,
              JSON.parse(response.data.workout)
            );
            localStorage.setItem(
              `calendar`,
              JSON.parse(response.data.calendar)
            );
          })
          .catch((error) => {
            console.log(error.response.data);
          });

        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data);
        let tempErrors: string[] = [];
        for (let key in error.response.data) {
          tempErrors.push(error.response.data[key]);
        }
        setErrors(tempErrors);
      });
  };
  return (
    <div className="form-container">
      <Form className="loginForm" onSubmit={handleLogin}>
        <Form.Group className="mb-3 email" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="light" type="submit">
          Login
        </Button>
      </Form>
      {errors.map((message, index) => (
        <Alert key={index} variant="danger">
          {message + " "}
        </Alert>
      ))}
    </div>
  );
};

export default LoginForm;
