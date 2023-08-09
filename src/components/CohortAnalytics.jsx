import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../css/CohortAnalytics.css"
import { useContext } from 'react';
import DataContext from '../context/DataContext'
import CohortContext from '../context/CohortContext'
import CohortMenu from '../components/CohortMenu'

//register ("activate")
ChartJS.register( CategoryScale, LinearScale, BarElement, Title,Tooltip )

function CohortAnalytics() {
	const { cohortId, isDarkModeActive, cohortNpsScores} = useContext(DataContext)
	const { selectedCohort, analyticsCohortMenuRef, analyticsDropdownRef, showAnalyticsCohortMenu, toggleCohortMenuInAnalytics } = useContext(CohortContext)
	
	//groups cohortNpsScores by week
	const weeks = cohortNpsScores.reduce((weeksObj, current) => {//weeksObj = {}, current = within loop current obj
		if (!weeksObj[current.week]) { //if current.week (week 1) doesn't exist
			weeksObj[current.week] = [current.score]; //creates week 1 as a new key with the score in that obj
		} else { //if current.week exists
			weeksObj[current.week].push(current.score);//push score into week 1
		}
		return weeksObj;
	}, {});

	//calculate average of the scores in each week (i.e. week 1 =[5,5,5])
	const average = Object.entries(weeks).map(([week, scores]) => {
		const sum = scores.reduce((acc, curr) => acc + curr);
		const avg = sum / scores.length;
		return avg;
	});

	//converting average scores to percentage to use for the bars length
	const percentages = average.map(num => num * 20);

	const data = {
		//labels for x-axis, each cohort is 10 weeks so hardcoded labels is fine :)
		labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],//takes from above month variable
		datasets: [
			{
				data: percentages, // Cohort NPS scores
				backgroundColor: isDarkModeActive ? '#6359e9' : '#afacde',//color of bars
				fill: false,
			},
		]
	}

	const options = {
		scales: {
			x: {
            grid: {
                display: false, // Remove vertical grid lines
				},
				ticks: {
					font: {
						size: 14 //font of labels on x-axis
					},
					color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
				},
         },
			y: { 
				grid: {
					color: 'rgba(255, 255, 255, 0.1)' // color of vertical grid lines
				},
			  	min: 40, //start number for y-axis
			  	ticks: {
					stepSize: 10, //count by 10s, default is 5s
					callback: function(value) {
						//changing default labels to customized labels
						switch(value) {
							case 40:
								return '             ';
							case 50: //default label
								return '1 Star'; //customized label
							case 60: 
								return '2 Star';
							case 70:
								return '3 Star';
							case 80:
								return '4 Star';
							case 90:
								return '5 Star';
							default:
								return '';
						}
					},
					font: {
						size: 13 //font size for y-axis labels
					},
					color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
			  	}
			},
		},
		elements: {
			bar: {
			  borderRadius: 50, // rounded top on bars
			},
		},
		barThickness: 10, //bar width
		plugins: {
			//to customize what you want to show up in the tooltip when bars are hovered over
			tooltip: {
				callbacks: {
					label: function(context) {
						//toFixed rounds to 10th a decimal value, and regex to take any .0 out 
						const newValue = average[context.dataIndex].toFixed(1).replace(/\.0$/, '');
						return ` ${newValue} Stars`;
					}
				}
			}
		}
	}
	
	return (
		<div className='analytics-container'>
			<div className='analytics-header'>
				<div className='analytics-title'>
					<h1>Cohort's Analytics</h1>
				</div>
				<div className='analytics-right-side'>
					<div className='chart-legend-container'>
						<div className='legend-circle'></div>
						<div className='legend-title'>Avg NPS</div>
						<div className="student-roster-dropdown-container" onClick={toggleCohortMenuInAnalytics} ref={analyticsDropdownRef}>
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
                        {showAnalyticsCohortMenu ? <div><i className="fa-solid fa-angle-up"></i></div> : <div><i className="fa-solid fa-angle-down"></i></div>}{/*to toggle the caret */}
                        {showAnalyticsCohortMenu && (
									<div className='cohort-menu' style={{ position: "absolute", right: 0, top: -415 }} ref={analyticsCohortMenuRef}> {/*to position CohortMenu when cohort button is clicked */}
										<CohortMenu />
									</div>
								)}
                  </div>
					</div>
				</div>
			</div>
			<div className='analyticsButtonClicked'>
				<Bar 
					data = {data}
					options = {options}
					//height={analyticsButtonClicked ? 300 : 200}
					className = 'chart'
				/>
			</div>
		</div>
	)
}

export default CohortAnalytics;