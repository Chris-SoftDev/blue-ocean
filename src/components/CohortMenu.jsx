import { useContext } from "react";
import DataContext from "../context/DataContext";
import CohortContext from "../context/CohortContext";
import "../css/CohortMenu.css"

function CohortMenu() {
    const { cohorts, setCohortId, isMaxStudentRosterVisible } = useContext(DataContext)
    const { cohortMenuRef, setSelectedCohort } = useContext(CohortContext)

    const selectCohort = (event) => {
        setCohortId(parseInt(event.currentTarget.id));
        setSelectedCohort(formatSelectedCohort(event))
    }
    
    const formatSelectedCohort = (event) => {
        const cohortDivider = (event.currentTarget.innerText).indexOf(':');
        const cohort = ((event.currentTarget.innerText).slice(0, cohortDivider));
        const term = ((event.currentTarget.innerText).slice(cohortDivider + 1))
        const termDivider = term.indexOf('-');
        const startDate = term.slice(0, termDivider - 1)
        const endDate = term.slice(termDivider + 1)
        const formattedTerm = `${formatSelectedTermDate(startDate)} - ${formatSelectedTermDate(endDate)} `
        return {cohort, term: formattedTerm};
    }

    const formatSelectedTermDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear().toString().slice(-2);
        return `${day} ${month} ${year}`;
    }

    const formatMenuDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear().toString().slice(-2);
        return `${day} ${month} ${year}`;
    }

    return (
        <div className="cohort-menu-container" ref={cohortMenuRef} style={isMaxStudentRosterVisible ? { position: "absolute", right: 430, top: 215 } : null}>
            <ul>
                {cohorts.map(cohort => (
                    <li key={cohort.id} id={cohort.id} onClick={(event) => selectCohort(event)}>
                        {cohort.name.toUpperCase()}:<br />
                        <span>{formatMenuDate(cohort.start_date)} - {formatMenuDate(cohort.end_date)}</span>
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default CohortMenu;