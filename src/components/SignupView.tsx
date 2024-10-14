// src/pages/SignupPage.tsx
import NavBar from "./NavBar";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="background">
      <div className="signup-container">
        <SignupForm />
      </div>
      <NavBar />
    </div>
  );
};

export default SignupPage;
