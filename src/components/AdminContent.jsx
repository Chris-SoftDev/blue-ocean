import "../css/AdminContent.css"
import CohortAnalytics from "./CohortAnalytics";
import AverageGrade from "./AverageGrade";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import AdminStudentRoster from "./AdminStudentRoster"
import AdminStudentAttendees from "./AdminStudentAttendees";
import AdminStudentAbsences from "./AdminStudentAbsences";
import StudentPage from "./StudentPage/StudentPage";
import ChatBox from "./ChatBox";
import AuthContext from "../context/AuthContext";
import AnalyticsLineGraph from "./AnalyticsLineGraph";

function AdminContent() {

    const { instructor } = useContext(AuthContext)
    const { selectedStudent, isMaxStudentRosterVisible, analyticsButtonClicked } = useContext(DataContext)

    return (
        <>
            <div className="content-header-container">
                <div className="content-header-greeting-container">
                    <div className="content-header-greeting-title">Welcome Back, {instructor ? instructor.name : "Loading..."}! &#128075;</div>
                    <div className="content-header-greeting-message">Here's what's happening with your students today.</div>
                </div>
                <div className="content-header-search-container">
                    <input type="text" name="header-search" id="content-header-search-input" placeholder="Search for anything..."/>
                    <i className="fa fa-search"></i>
                </div>
            </div>
            {selectedStudent === null ? 
                (isMaxStudentRosterVisible ? 
                    ((<div  className="content-main-container">
                        <div className="content-main-student-roster-container">
                            <AdminStudentRoster />
                        </div>
                    </div>)) 
                    : 
                    (analyticsButtonClicked ? 
                        (<div  className="content-main-container">
                            {/* <div className="content-main-cohort-analytics-container">
                                    <CohortAnalytics />
                                </div> */}
                            <div className="content-main-analytics-linegraph-container">
                                <AnalyticsLineGraph />
                            </div>
                        </div>) 
                        : 
                        (<div  className="content-main-container">
                            <div className="content-main-left-pane">
                                <div className="content-main-cohort-analytics-container">
                                    <CohortAnalytics />
                                </div>
                                <div className="content-main-student-roster-container">
                                    <AdminStudentRoster />
                                </div>
                            </div>
                            <div className="content-main-right-pane">
                                <div className="content-main-student-attendees">
                                    <AdminStudentAttendees />
                                </div>
                                <div className="content-main-student-absences">
                                    <AdminStudentAbsences />
                                </div>
                                <div className="content-main-avg-grade">
                                    <AverageGrade />
                                </div>
                            </div>
                        </div>)
                    )
                )
                :
                (<div  className="content-main-container">
                    <div className="content-main-student-page">
                        <StudentPage />
                        <ChatBox />
                    </div>
                </div>)
            } 
        </>
    );
}

export default AdminContent;
