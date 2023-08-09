import { useContext } from "react";
import DataContext from "../context/DataContext";
import "../css/AdminStudentAttendees.css"

function AdminStudentAttendees() {
    const { cohortStudents } = useContext(DataContext)

    const presentStudentsCount = cohortStudents.reduce((count, student) => {
        if (student.is_present) {
          return count + 1;
        } else {
          return count;
        }
    }, 0);

    const percentPresent = (Math.trunc((presentStudentsCount / cohortStudents.length) * 100));

    return (
        <>
            <div className="student-attendees-icon"><i className="fa-solid fa-arrow-right-long fa-2x"></i></div> 
            <div className="student-attendees-main-container">
                <div className="student-attendees-main-title">Attendees</div>
                <div className="student-attendees-main-info">{presentStudentsCount} Students</div>
            </div>
            <div className="student-attendees-statistics-container">
                <div className="student-attendees-statistics">{percentPresent >= 0 ? percentPresent : 0}%</div> 
            </div>
        </>
    );
}

export default AdminStudentAttendees;