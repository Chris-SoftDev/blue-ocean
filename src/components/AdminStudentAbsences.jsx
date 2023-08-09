import { useContext } from "react";
import DataContext from "../context/DataContext";
import "../css/AdminStudentAbsences.css"

function AdminStudentAbsences() {
    const { cohortStudents } = useContext(DataContext)

    const absentStudentsCount = cohortStudents.reduce((count, student) => {
        if (!student.is_present) {
          return count + 1;
        } else {
          return count;
        }
    }, 0);

    const percentAbsent = (Math.trunc((absentStudentsCount / cohortStudents.length) * 100));

    return (
        <>
            <div className="student-absences-icon"><i className="fa-solid fa-arrow-left-long fa-2x"></i></div> 
            <div className="student-absences-main-container">
                <div className="student-absences-main-title">Absences</div>
                <div className="student-absences-main-info">{absentStudentsCount} Students</div>
            </div>
            <div className="student-absences-statistics-container">
                <div className="student-absences-statistics">{percentAbsent >= 0 ? percentAbsent : 0}%</div> 
            </div>
        </>
    );
}

export default AdminStudentAbsences;