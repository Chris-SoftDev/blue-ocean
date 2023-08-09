import { createContext, useState, useEffect } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const fetchAPI = `https://blue-ocean-sigma.vercel.app/`;
  //setStudentId needs to be set on Login route towards a student. The route returns an ID that associates with student
  //setStudentId to data.id once login button is clicked
  //Student will be filled in with data from the fetch below then assign data to respective fields.
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState([]);

  //fetch student
  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`${fetchAPI}/students/${studentId}`);
      const data = await response.json();
      setStudent(data);
    };
    if (id !== null) {
      fetchStudent();
    }
  }, [studentId]);

  return (
    <StudentContext.Provider value={{ studentId, setStudentId, student }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
