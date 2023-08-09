import "../css/AnalyticsLineGraph.css"
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale, // x axis
	LinearScale, //y axis
	PointElement,
	Tooltip,
} from "chart.js";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import CohortContext from "../context/CohortContext";
import CohortMenu from './CohortMenu'

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip
);

const AnalyticsLineGraph = () => {
  	const { isDarkModeActive, cohortAssessments, cohortNpsScores, cohortId } = useContext(DataContext)
  	const { cohortMenuInLineAnalytics, toggleCohortMenuInLineAnalytics, selectedCohort, cohortMenuInLineAnalyticsRef, lineAnalyticsDropdownRef } = useContext(CohortContext)

	//grouping each assessment by week
	const assessmentsByWeeks = cohortAssessments.reduce((weeksObj, current) => {//weeksObj = {}, current = within loop current obj
		if (!weeksObj[current.week]) { //if current.week (week 1) doesn't exist
			weeksObj[current.week] = [current.grade]; //creates week 1 as a new key with the grade in that obj
		} else { //if current.week exists
			weeksObj[current.week].push(current.grade);//push grade into week 1
		}
		return weeksObj;
	}, {});

	//calculate average grade of assessments for  each week 
	const assessmentAvg = Object.entries(assessmentsByWeeks).map(([week, grades]) => {
		const sum = grades.reduce((acc, curr) => acc + curr);
		const avg = sum / grades.length;
		return avg;
	});

	//GROUP COHORTNPSSCORES BY WEEK 
	const weeks = cohortNpsScores.reduce((weeksObj, current) => {//weeksObj = {}, current = within loop current obj
		if (!weeksObj[current.week]) { //if current.week (week 1) doesn't exist
			weeksObj[current.week] = [current.score]; //creates week 1 as a new key with the score in that obj
		} else { //if current.week exists
			weeksObj[current.week].push(current.score);//push score into week 1
		}
		return weeksObj;
	}, {});
	//calculate average of the scores in each week (i.e. week 1 =[5,5,5])
	const averageNpsScores = Object.entries(weeks).map(([week, scores]) => {
		const sum = scores.reduce((acc, curr) => acc + curr);
		const avg = Math.floor(sum / scores.length * 20);
		return avg;
	});
	
	const data = {
    	labels: [
			"Week 1",
			"Week 2",
			"Week 3",
			"Week 4",
			"Week 5",
			"Week 6",
			"Week 7",
			"Week 8",
			"Week 9",
			"Week 10",
    	],
    	datasets: [
			{
			label: " Avg NPS",
			data: averageNpsScores,
			//backgroundColor: isDarkModeActive ? '#6359e9' : '#afacde',
			borderColor: isDarkModeActive ? '#6359e9' : '#afacde',
			tension: 0,
			borderWidth: 3,
			},
			{
			label: " Avg Grade",
			data: assessmentAvg,
			//backgroundColor: isDarkModeActive ? '#6359e9' : '#afacde',
			borderColor: isDarkModeActive ? '#2abdf3' : '#64cff6af',
			tension: 0,
			borderWidth: 3,
			},
    	],
  	};

  const options = {
    	interaction: {
      	intersect: faLessThanEqual,
      	mode: "index",
    	},
    	scales: {
			x: {
					grid: {
						color: "#4c4c4f",
					},
					title: {
					display: false, //to show weeks title
					text: "Weeks", //Title
					},
					ticks: {
						color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
						font: {
							size: 17,
						}
					},
				},
			y: {
				grid: {
				color: "#4c4c4f",
				},
				min: 0,
				max: 100,
				title: {
				display: true,
				//text: "Grades",
					color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color,
				},
				ticks: {
					color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
					font: {
						size: 17,
					}
				},
			},
    	},
  	};


  	return (
    	<>
      	<div className="analytics-line-graph-container">
				<div className="line-graph-header">
					<h1>Cohort Analytics</h1>
					<div className="line-graph-legend-container">
						<div className="nps-legend-container">
							<div className="nps-circle"></div>
							<div className="nps-title">Avg NPS</div>
						</div>
						<div className="grade-legend-container">
							<div className="grade-circle"></div>
							<div className="grade-title">Avg Grade</div>
						</div>
					</div>
					<div className="student-roster-dropdown-container" onClick={toggleCohortMenuInLineAnalytics} ref={lineAnalyticsDropdownRef}>
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
                        {cohortMenuInLineAnalytics ? <div><i className="fa-solid fa-angle-up"></i></div> : <div><i className="fa-solid fa-angle-down"></i></div>}
                        {cohortMenuInLineAnalytics && (
									<div className='cohort-menu-line-analytics' style={{ position: "absolute", right: -420, top: -422 }} ref={cohortMenuInLineAnalyticsRef}> {/*to position CohortMenu when cohort button is clicked */}
										<CohortMenu />
									</div>
								)}
                    </div>
				</div>
         	<div className="line-graph">
					<Line
					data={data}
					options={options}
					width={"300px"}
					height={"200px"}
					>
					</Line>
          	</div>
      	</div>
    	</>
  	);
};

export default AnalyticsLineGraph;
