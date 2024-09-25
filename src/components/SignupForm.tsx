import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  let navigate = useNavigate();
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/register/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/LoginView");
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
      <Form className="signupForm" onSubmit={handleSignup}>
        <Form.Group className="mb-3 email" controlId="signupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="light"
          type="submit"
          disabled={!(password === confirmPassword)}
        >
          Sign up
        </Button>
      </Form>
      <div className="Alerts">
        <Alert key={1} variant="danger" hidden={password === confirmPassword}>
          Your password and confirmation must match!
        </Alert>
        {errors.map((message, index) => (
          <Alert key={index} variant="danger">
            {message + " "}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
