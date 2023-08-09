import "../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import DataContext from "../context/DataContext";


const Login = () => {
  const { setStudentId } =
    useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const API = "http://localhost:3000";
  const API = "https://blue-ocean-sigma.vercel.app/";

  const navigate = useNavigate();
  const { login, setInstructorId, setInstructorLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const instructorResponse = await fetch(`${API}/instructor_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (instructorResponse.ok) {
        setInstructorLoggedIn(true);
        const data = await instructorResponse.json();
        login(data);
        setInstructorId(data.id);
        navigate("/instructors");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const studentResponse = await fetch(`${API}/student_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (studentResponse.ok) {
        const data = await studentResponse.json();
        login(data);
        setStudentId(data.id)
        navigate("/students");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-bg">
      <div className="sign-in-container">
        <div className="sign-wrapper">
          <div className="sign-in">Welcome back!</div>
          <div className="sign-head">Please sign in</div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                className="username"
                placeholder="E-mail/Username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                className="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="forgot">
              <span className="f-text">Forgot password?</span>
              <button className="sub-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="register">Register</div>
      </div>
    </div>
  );
};

export default Login;
