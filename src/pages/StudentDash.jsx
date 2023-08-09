import { useState, useEffect } from "react";
import "../css/StudentDash.css";
import logo from "../assets/logo.jpg";
import StudentNavigationSideBar from "../components/StudentNavigationSidebar";
import StudentDashContent from "../components/StudentDashContent";
import { useContext } from "react";
import StudentContext, { StudentProvider } from "../context/StudentContext";
import ChatBox from "../components/ChatBox";

const StudentDash = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  const toggleThemeMode = () => {
    setIsDarkModeActive(!isDarkModeActive);
  };

  useEffect(() => {
    if (isDarkModeActive) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [isDarkModeActive]);

  return (
    <div className="student-dashboard-container">
      <div className="student-dashboard-navigation">
        <StudentNavigationSideBar />
      </div>
      <div className="student-dashboard-content-container">
        <StudentDashContent />
        <ChatBox />
      </div>
    </div>
  );
};

export default StudentDash;
