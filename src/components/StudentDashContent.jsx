import "../css/StudentDash.css";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";

const StudentDashContent = () => {
  //sample data for pie chart
  const { cohortStudents, student, isDarkModeActive, setCohortId } =
    useContext(DataContext);
  const data = [
    { name: "Remaining", value: 0 },
    {
      name: "Grade",
      value: student.length > 0 ? student[0].average_grade : "Loading..",
    },
  ];
  data[0].value = 100 - data[1].value;

  const renderLabel = ({ cx, cy, percent, name }) => {
    if (name === "Grade") {
      const grade = Math.round(percent * 100);
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
      return null;
    }
  };
  function formatDateRoster(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  function formatDateCohort(start_date, end_date) {
    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    const startDateStr = startDateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const endDateStr = endDateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return `${startDateStr} - ${endDateStr}`;
  }

  useEffect(() => {
    if (student.length > 0) {
      setCohortId(student[0].cohort_id);
    }
  }, [student]);

  //  console.log(students[0])
  //remaining value of pie chart will just be based on grade value

  return (
    <>
      <div className="student-content-header-container">
        <div className="student-content-header-greeting-container">
          <div className="student-content-header-greeting-title">
            Welcome Back,{" "}
            {student.length > 0 ? student[0].student_name : "Loading.."}{" "}
            &#128075;
          </div>
          <div className="student-content-header-greeting-message">
            Here's what's happening in class.
          </div>
        </div>
        <div className="student-content-header-search-container">
          <input
            type="text"
            name="header-search"
            id="content-header-search-input"
            placeholder="Search for anything..."
          />
          <i className="fa fa-search"></i>
        </div>
      </div>
      <div className="student-content-main-container">
        <div className="student-content-main-left-pane">
          <div className="student-content-main-student-roster-container">
            <div className="roster-header">
              <div>
                <h2>Student Roster</h2>
                <div className="roster-message">
                  {cohortStudents.length} total students
                </div>
              </div>
              <div className="roster-search">
                <input
                  type="text"
                  name="header-search"
                  id="roster-input"
                  placeholder="Search for student..."
                />
                <i className="fa fa-search"></i>
              </div>
              <div className="class-drop">
                <i className="fa fa-calendar"></i>
                <div className="drop-txt">
                  <div>
                    {student.length > 0
                      ? student[0].cohort_name.toUpperCase()
                      : "Loading"}
                  </div>
                  <div>
                    {student.length > 0
                      ? formatDateCohort(
                          student[0].start_date,
                          student[0].end_date
                        )
                      : "Loading"}
                  </div>
                </div>
                {/* <i className="fa fa-caret-down"></i> */}
              </div>
            </div>

            <div className="student-roster-info-container">
              {/* Name container that holds name label avtr and name*/}
              <div className="name-ctg">
                <div className="name-txt">Name</div>
                {cohortStudents.map((cohortStudent, index) => (
                  <div key={index} className="avtr-name-container">
                    <div className="avtr">
                      <img
                        alt="Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "25px",
                        }}
                        src={cohortStudent.picture}
                      ></img>
                    </div>
                    <div className="student-name">
                      <span>{cohortStudent.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/*Last login container that holds label and login date*/}
              <div className="last-login-container">
                <div className="last-login-ctg">Last Login Date</div>
                {cohortStudents.map((cohortStudent) => (
                  <div key={cohortStudent.id} className="last-login-txt">
                    {formatDateRoster(cohortStudent.last_login)}
                  </div>
                ))}
              </div>
              {/* <div className="student-status">
                <div className="status-ctg">Status</div>
                <div className="status-pill-present">Present</div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="student-content-main-right-pane">
          <div className="student-content-main-avg-grade">
            <div className="avg-header">
              <div>
                <h2>Average Grade</h2>
              </div>
              {/* <div className="avg-dropdown">
                Month
                <i className="fa fa-caret-down"></i>
              </div> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
              }}
            >
              <ResponsiveContainer>
                <PieChart margin={{ top: 110 }}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    startAngle={0}
                    endAngle={180}
                    innerRadius={100}
                    outerRadius={160}
                    blendStroke={true}
                    paddingAngle={0}
                    dataKey="value"
                    label={renderLabel}
                    labelLine={false}
                    activeShape={null}
                  >
                    <Cell
                      key={1}
                      fill={isDarkModeActive ? "#2abdf3" : "#64cff6af"}
                    />
                    <Cell
                      key={2}
                      fill={isDarkModeActive ? "#6359e9" : "#afacde"}
                    />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashContent;
