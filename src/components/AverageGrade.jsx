import { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../css/AverageGrade.css"
import DataContext from "../context/DataContext";


function AverageGrade() {
	const { isDarkModeActive, cohortGradeAvg } = useContext(DataContext)
	const averageGrade = Math.ceil(cohortGradeAvg.average);
    const data = [
        { name: "Remaining", value: 0 }, //remainder of pie chart from 100%
        { name: "Grade", value: averageGrade }, //average grade of cohort
      ];
    
      //remaining value of pie chart will just be based on grade value
      data[0].value = 100 - data[1].value;
    
	  //Label for the number percentage
      const renderLabel = ({ cx, cy, percent, name }) => {
		if (name === "Grade") {
		  const grade = Math.round(percent * 100);
		  if (averageGrade) {
			return (
			  <text 
				x={cx} 
				y={cy} 
				fill="var(--text)" 
				textAnchor="middle"
				style={{ fontSize: "30px", fontWeight: "bold" }}
			  >
				{`${grade}%`}
			  </text>
			);
		  } else {
			return (
			  <text 
				x={cx} 
				y={cy} 
				fill="var(--text)" 
				textAnchor="middle"
				style={{ fontSize: "30px", fontWeight: "bold" }}
			  >
				N/A
			  </text>
			);
		  }
		} else {
		  return null;
		}
	  };

    return (
		<>
			<div className="avg-grade-header">
				<p>Cohort's Avg Grade</p>
				{/*<div className="month-btn">
					<div className="btn-title">Month</div>
					{showMonths ? <div><i className="fa-solid fa-angle-up"></i></div> : <div><i className="fa-solid fa-angle-down"></i></div>}
				</div>*/}
			</div>
			<div className="pie"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "380px",
				}}
				>
				
				<ResponsiveContainer>
					<PieChart margin={{ top: 110 }}>
						<Pie
							data={data}
							cx="50%" //position of pie chart on x-axis
							cy="50%" //position of pie chart on y-axis
							startAngle={0}
							endAngle={180} //to make it half of a pie chart
							innerRadius={100} //inner circle radius, use to adjust width
							outerRadius={160} //outer circle radius, use to adjust width
							cornerRadius={0} //rounded corners
							blendStroke={true}
							paddingAngle={0}
							dataKey="value"
							label={renderLabel}
							labelLine={false}
							activeShape={null}
						>
							<Cell key={1} fill={isDarkModeActive ? '#2abdf3' : '#64cff6af'}/>
							<Cell key={2} fill={isDarkModeActive ? '#6359e9' : '#afacde'}/>
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className="legend-container">
				<div className="legend-circle"></div>
				<div className="legend-title">Avg Grade</div>
			</div>
			<div className="activity-btn-container">
				<div className="btn-title">View all activity</div>
				<div className="arrow">&#10230;</div>
			</div>
		</>
  );
}

export default AverageGrade;