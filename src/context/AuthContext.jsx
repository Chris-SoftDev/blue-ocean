import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [instructorId, setInstructorId] = useState(null);
  const [instructor, setInstructor] = useState([]);
  const [instructorLoggedIn, setInstructorLoggedIn] = useState(false)

  // const fetchUrl = "http://localhost:3000"; //Change once deployed or for testing
  const fetchUrl = "https://blue-ocean-sigma.vercel.app/";

  const login = (token) => {
    setAccessToken(token.accessToken);
    const decodedToken = jwtDecode(token.accessToken)
    setProfile(decodedToken.id)
    setIsAuthenticated(true)
  };

  const logout = () => {
    setAccessToken('')
    setProfile('')
    setIsAuthenticated(false)
  }

  //fetch instructor after login
  useEffect(() => {
    const fetchInstructor = async () => {
      const response = await fetch(`${fetchUrl}/instructors/${instructorId}`);
      const data = await response.json();
      setInstructor(data[0]);
      //console.log(instructor)
    };

    fetchInstructor();   
  }, [instructorId]);

  return (
    <AuthContext.Provider
      value={{ 
        profile, 
        accessToken, 
        login, 
        isAuthenticated, 
        setIsAuthenticated, 
        logout,
        setInstructorId,
        instructorId, 
        instructor,
        instructorLoggedIn,
        setInstructorLoggedIn
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
