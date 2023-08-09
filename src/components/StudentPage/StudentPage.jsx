import React, { useState, useEffect, useContext } from "react";
import DataContext from "../../context/DataContext";
import "./StudentPage.css";

import { Line } from "react-chartjs-2";
import {
  faHourglassHalf,
  faCheck,
  faGauge,
  faCalendarDays,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, //y axis
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const StudentPage = () => {
  const { setSelectedStudent, selectedStudent, isDarkModeActive, assessments } = useContext(DataContext)

  //array of students weekly grades
  const weeklyGrades = assessments.reduce((acc, { grade }) => {
    acc.push(grade || 0); //if grade does not have is undefined or no it will push a 0 into the array
    return acc;
  }, []);

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
        labels: "Grades",
        data: weeklyGrades,
        backgroundColor: "#64CFF6",
        borderColor: "#64CFF6",
        // pointBorderColor: "black",
        //fill: true,
        tension: 0,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Students Progress",
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          color: "#4c4c4f",
        },
        title: {
          display: true,
          // text: "Weeks", //Title
          color: "#e1e1e8",
          font: {
            size: 15,
          },
        },
        ticks: {
          color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
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
          text: "Grades",
          color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color,
          font: { 
            size: 15,
          },
        },
        ticks: {
          color: isDarkModeActive ? '#f5f5fa' : '#0c0c0f', //text color
        },
      },
    },
  };

  //to calculate what assignments have been completed (in DB table is named assessments)
  let pending = 0;
  let completed = 0;
  assessments.forEach((assignment) => {
    if (assignment.grade !== null) {
      completed++;
    } else {
      pending++;
    }
  });


  const studentData = [
    {
      name: selectedStudent.name,
      cohort: selectedStudent.cohort_id,
      gradeAverage: selectedStudent.average_grade,
      pendingAssignments: pending,
      completedAssignments: completed,
      absences: selectedStudent.absences,
      pendingAssignmentsList: ["DOM Worksheet", "CSS WorkSheet"],
    },
  ];

  return (
    <>
      <div className="return-button" onClick={() => setSelectedStudent(null)}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </div>
      <div id="studentName">{studentData[0].name}</div>
      <div className="dansContainer">
        <div className="studentInfoContainer">
          <div id="graph">
            <Line
              data={data}
              options={options}
              width={"500px"}
              height={"450px"}
            ></Line>
          </div>
          <div className="studentInfo">
            {studentData.map((item, index) => (
              <ul key={index}>
                <div id="infoDivider">
                  <li>
                    {" "}
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ fontSize: "20px"}}
                    />
                    &nbsp;&nbsp;&nbsp; Cohort: {item.cohort}
                  </li>
                </div>
                <div id="infoDivider">
                  <li>
                    {" "}
                    <FontAwesomeIcon
                      icon={faGauge}
                      style={{ fontSize: "20px"}}
                    />
                    &nbsp;&nbsp;&nbsp; Average Grade: {item.gradeAverage}
                  </li>
                </div>
                <div id="infoDivider">
                  <li id="assignmentDiv">
                    <FontAwesomeIcon
                      icon={faHourglassHalf}
                      style={{ fontSize: "20px"}}
                    />
                    &nbsp;&nbsp;&nbsp; Pending: {item.pendingAssignments}
                  </li>
                </div>
                <div id="infoDivider">
                  <li id="assignmentDiv">
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ fontSize: "20px"}}
                    />
                    &nbsp;&nbsp;&nbsp; Completed: {item.completedAssignments}
                  </li>
                </div>
                <div id="infoDivider">
                  <li>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ fontSize: "20px"}}
                    />
                    &nbsp;&nbsp;&nbsp; Absences: {item.absences}
                  </li>
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
