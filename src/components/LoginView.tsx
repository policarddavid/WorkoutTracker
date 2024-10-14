import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import "./LoginView.css";

const LoginView = () => {
  return (
    <div className="background">
      <div className="login-container">
        <LoginForm />
      </div>
      <NavBar />
    </div>
  );
};

export default LoginView;
