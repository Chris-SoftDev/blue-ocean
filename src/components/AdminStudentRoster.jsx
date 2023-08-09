import { useContext } from 'react';
import DataContext from '../context/DataContext';
import CohortContext from '../context/CohortContext';
import RosterFilterContext from '../context/RosterFilterContext';
import CohortMenu from './CohortMenu';
import AdminStudentRosterTable from './AdminStudentRosterTable';
import "../css/AdminStudentRoster.css"

function AdminStudentRoster() {
    const { cohortStudents, cohortId } = useContext(DataContext)
    const { isCohortMenuVisible, toggleCohortMenu, selectedCohort, rosterDropdownRef } = useContext(CohortContext)
    const { rosterGlobalFilter, setRosterGlobalFilter } = useContext(RosterFilterContext)

    return (
        <>
            <div className="student-roster-header-container">
                <div className="student-roster-header-title-container">
                    <div className="student-roster-title">Student Roster</div>
                    <div className="student-roster-qty">{cohortStudents.length} Total Students</div>
                </div>
                <div className="student-roster-header-utils">
                    <div className="student-roster-search-container">
                        <input type="text" name="roster-search" id="student-roster-search-input" 
                            placeholder="Search for student..." 
                            value={rosterGlobalFilter || ''} 
                            onChange={(e) => setRosterGlobalFilter(e.target.value)}
                        />
                        <i className="fa fa-search"></i>
                    </div>
                    <div className="student-roster-dropdown-container" onClick={toggleCohortMenu} ref={rosterDropdownRef}>
                        <div><i className="fa-regular fa-calendar-days"></i></div>
                        <div className="student-roster-dropdown-cohort">
                            {cohortId == null ? 
                                <div>Select a cohort...</div>
                            : 
                                <>
                                    <div className="student-roster-dropdown-cohort-name">{selectedCohort.cohort}</div>
                                    <div className="student-roster-dropdown-cohort-term">{selectedCohort.term}</div>
                                </>
                            }
                        </div>
                        {isCohortMenuVisible ? <div><i className="fa-solid fa-angle-up"></i></div> : <div><i className="fa-solid fa-angle-down"></i></div>}
                        {isCohortMenuVisible && <CohortMenu />}
                    </div>
                </div>
            </div> 
            <div className="student-roster-main-container">
                <AdminStudentRosterTable />
            </div>
        </>
    );
}

export default AdminStudentRoster;