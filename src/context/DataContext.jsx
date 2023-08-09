import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { instructorId, instructorLoggedIn } = useContext(AuthContext) //1
  const [cohorts, setCohorts] = useState([]); //2
  const [cohortStudents, setCohortStudents] = useState([]);//3
  const [cohortNpsScores, setCohortNpsScores] = useState([]);//4
  const [student, setStudent] = useState([]);//5
  const [messages, setMessages] = useState([]);//6
  const [assessments, setAssessments] = useState([]);//7
  const [studentNpsScores, setStudentNpsScores] = useState([]);//8
  const [studentId, setStudentId] = useState(null);//9
  const [cohortId, setCohortId] = useState(null);//10
  const [cohortGradeAvg, setCohortGradeAvg] = useState([])//11
  const [isDarkModeActive, setIsDarkModeActive] = useState(false); //TODO: Integrate into user profile settings saved to database
  const [selectedStudent, setSelectedStudent] = useState(null) //when student is clicked in roster
  const [isMaxStudentRosterVisible, setIsMaxStudentRosterVisible] = useState(false)
  const [analyticsButtonClicked, setAnalyticsButtonClicked] = useState(false)
  const [cohortAssessments, setCohortAssessments] = useState([]) //16

  const fetchUrl = "http://localhost:3000"; //Change once deployed or for testing

  const toggleThemeMode = () => {
    setIsDarkModeActive(!isDarkModeActive);
  };

  useEffect(() => {
    const fetchCohorts = async () => {
      const response = await fetch(`${fetchUrl}/cohorts/${instructorId}`);
      const data = await response.json();
      setCohorts(data);
    };

    fetchCohorts();
  }, [instructorId]);

  //fetch one student
  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`${fetchUrl}/students/${studentId}`);
      const data = await response.json();
      setStudent(data);
    };
    fetchStudent();
  }, [studentId]);


  // fetch all students in one cohort
  useEffect(() => {
    const fetchCohortStudents = async () => {
      const response = await fetch(`${fetchUrl}/cohort/students/${cohortId}`);
      const data = await response.json();
      setCohortStudents(data);
    };
    fetchCohortStudents();
  }, [cohortId]);

  // fetch all student NPSs in one cohort
  useEffect(() => {
    const fetchCohortNpsScores = async () => {
      const response = await fetch(`${fetchUrl}/cohort/nps/${cohortId}`);
      const data = await response.json();
      setCohortNpsScores(data);
    };
    fetchCohortNpsScores();
  }, [cohortId]);

  // fetch all messages from one student
  useEffect(() => {
    const fetchStudentMessages = async () => {
      const response = await fetch(`${fetchUrl}/messages/${studentId}`);
      const data = await response.json();
      setMessages(data);
    };
    fetchStudentMessages();
  }, [selectedStudent, studentId]);

  // fetch all assessments from one student
  useEffect(() => {
    const fetchStudentAssessments = async () => {
      const response = await fetch(`${fetchUrl}/assessments/${studentId}`);
      const data = await response.json();
      setAssessments(data);
    };
    fetchStudentAssessments();
  }, [studentId]);

  // fetch all assessments from one cohort
  useEffect(() => {
    const fetchCohortAssessments = async () => {
      const response = await fetch(`${fetchUrl}/cohort/assessments/${cohortId}`);
      const data = await response.json();
      setCohortAssessments(data);
    };
    fetchCohortAssessments();
  }, [cohortId]);


  // fetch NPSs for one student
  useEffect(() => {
    const fetchStudentNpsScores = async () => {
      const response = await fetch(`${fetchUrl}/nps/${studentId}`);
      const data = await response.json();
      setStudentNpsScores(data);
    };
    fetchStudentNpsScores();
  }, [studentId]);

  //fetch grade average for cohort selected
  useEffect(() => {
    const fetchCohortGradeAvg = async () => {
      const response = await fetch(`${fetchUrl}/gradeAverage/${cohortId}`);
      const data = await response.json();
      setCohortGradeAvg(data[0]);
    };
    fetchCohortGradeAvg();
  }, [cohortId]);

  //sets studentId when a student is clicked from roster table
  useEffect(() => {
    if (selectedStudent && instructorLoggedIn) {
      setStudentId(selectedStudent.id);
    } else {
      setStudentId(null);
    }
  }, [selectedStudent, instructorLoggedIn]);


  return (
    <DataContext.Provider
      value={{
        cohorts,
        setCohorts,
        student,
        cohortStudents,
        cohortNpsScores,
        messages,
        setMessages,
        assessments,
        studentNpsScores,
        studentId,
        setStudentId,
        cohortId,
        setCohortId,
        isDarkModeActive,
        toggleThemeMode,
        fetchUrl,
        cohortGradeAvg,
        setSelectedStudent,
        selectedStudent,
        isMaxStudentRosterVisible,
        setIsMaxStudentRosterVisible,
        analyticsButtonClicked,
        setAnalyticsButtonClicked,
        cohortAssessments
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
