import { useState, useEffect, useContext } from "react";
import CohortContext from "../context/CohortContext";
import "../css/NavigationSidebar.css";
import logo from "../assets/logo.jpg";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";
import DataContext from "../context/DataContext";

function StudentNavigationSidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isPresent, setIsPresent } = useContext(CohortContext);
  const { isDarkModeActive, toggleThemeMode, student, setStudentId } =
    useContext(DataContext);
  const [clicked, setClicked] = useState(false);

  const toggleAttendance = () => {
    setIsPresent(!isPresent);
    setClicked(true);
  };

  const handleLogout = () => {
    logout();
    setStudentId(null);
    navigate("/");
  };

  useEffect(() => {
    if (isDarkModeActive) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [isDarkModeActive]);

  return (
    <>
      <div className="sidebar-top-container">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo-Image" />
        </div>
        <div className="sidebar-nav-links">
          <div className="sidebar-nav-link">
            <div className="sidebar-nav-link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" />
                <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" />
                <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" />
                <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" />
              </svg>
            </div>
            <div className="sidebar-nav-link-title">
              <span>Dashboard</span>
            </div>
          </div>
          <div className="sidebar-nav-link">
            <div className="sidebar-nav-link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 20V13M12 20V10M4 20L4 16M13.4067 5.0275L18.5751 6.96567M10.7988 5.40092L5.20023 9.59983M21.0607 6.43934C21.6464 7.02513 21.6464 7.97487 21.0607 8.56066C20.4749 9.14645 19.5251 9.14645 18.9393 8.56066C18.3536 7.97487 18.3536 7.02513 18.9393 6.43934C19.5251 5.85355 20.4749 5.85355 21.0607 6.43934ZM5.06066 9.43934C5.64645 10.0251 5.64645 10.9749 5.06066 11.5607C4.47487 12.1464 3.52513 12.1464 2.93934 11.5607C2.35355 10.9749 2.35355 10.0251 2.93934 9.43934C3.52513 8.85355 4.47487 8.85355 5.06066 9.43934ZM13.0607 3.43934C13.6464 4.02513 13.6464 4.97487 13.0607 5.56066C12.4749 6.14645 11.5251 6.14645 10.9393 5.56066C10.3536 4.97487 10.3536 4.02513 10.9393 3.43934C11.5251 2.85355 12.4749 2.85355 13.0607 3.43934Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="sidebar-nav-link-title">
              <span>Analytics</span>
            </div>
          </div>

          <div className="sidebar-nav-link-title">
            <div
              className="sidebar-nav-link"
              onClick={clicked ? undefined : toggleAttendance}
            >
              <div className="check-in-container">
                <div className="check-in-title">
                  <div className="sidebar-profile-link-icon-type-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                    >
                      <path
                        d="M12 2C8.68629 2 6 4.68629 6 8C6 9.41892 6.30157 10.3478 7.125 11.375L12 17L16.875 11.375C17.6984 10.3478 18 9.41892 18 8C18 4.68629 15.3137 2 12 2Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 15.1434C3.14864 15.8694 2 16.881 2 18C2 20.2091 6.47715 22 12 22C17.5228 22 22 20.2091 22 18C22 16.881 20.8514 15.8694 19 15.1434"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="8"
                        r="1"
                        stroke="var(--text)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Check-in to class</span>
                </div>
              </div>
              {isPresent ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="present"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                    style={{
                      fill: "none",
                      stroke: "var(--text)",
                      strokeMiterlimit: 10,
                      strokeWidth: "32px",
                    }}
                  />
                  <polyline
                    points="352 176 217.6 336 160 272"
                    style={{
                      fill: "none",
                      stroke: "var(--text)",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                  />
                </svg>
              ) : (
                <svg
                  className="not-present"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="1 0 24 24"
                  fill="var(--text)"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                </svg>
              )}
            </div>
          </div>
          <div className="sidebar-nav-link">
            <div className="sidebar-nav-link-icon-type-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="sidebar-nav-link-title">
              <span>Settings</span>
            </div>
          </div>
        </div>
        <div className="sidebar-profile-links">
          <div className="sidebar-profile-link">
            <div className="sidebar-profile-link-icon-type-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
              >
                <path
                  d="M9.09 8.62499C9.3251 7.98451 9.78915 7.44443 10.4 7.10041C11.0108 6.75639 11.7289 6.63064 12.4272 6.74542C13.1255 6.86021 13.7588 7.20812 14.2151 7.72754C14.6713 8.24696 14.9211 8.90437 14.92 9.58332C14.92 11.5 11.92 12.4583 11.92 12.4583M12 16.2917H12.01M22 11.5C22 16.7927 17.5228 21.0833 12 21.0833C6.47715 21.0833 2 16.7927 2 11.5C2 6.20726 6.47715 1.91666 12 1.91666C17.5228 1.91666 22 6.20726 22 11.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="sidebar-profile-link-title">
              <span id="help-center-btn">Help Center</span>
            </div>
          </div>

          <div className="sidebar-profile-link">
            <div className="sidebar-theme-switch-container">
              <div className="sidebar-theme-switch-title">
                {isDarkModeActive ? (
                  <div className="sidebar-profile-link-icon-type-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="sidebar-profile-link-icon">
                    <i className="fa-regular fa-sun"></i>
                  </div>
                )}
                <div className="sidebar-profile-link-title">
                  <span>{isDarkModeActive ? "Dark" : "Light"} Mode</span>
                </div>
              </div>
              <div className="sidebar-theme-switch">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider" onClick={toggleThemeMode}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-bottom-container">
        <div className="sidebar-profile-container">
          <div className="sidebar-profile-image">
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "25px",
              }}
              src={student.length > 0 ? student[0].picture : ""}
              alt="User-Image"
            />
          </div>
          <div className="sidebar-profile-title-container">
            <div className="sidebar-profile-username">
              {student.length > 0 ? student[0].student_name : "Loading.."}
            </div>{" "}
            {/*TODO: Change to dynamic username */}
            <div className="sidebar-profile-position">Student</div>{" "}
            {/*TODO: Change to dynamic position title */}
          </div>
        </div>
        <div className="sidebar-profile-logout-btn" title="Logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            onClick={handleLogout}
          >
            <path d="M24.1718 19.9888H22.0099C21.8623 19.9888 21.7239 20.0534 21.6316 20.1672C21.4164 20.4286 21.1857 20.6808 20.9428 20.9206C19.9492 21.9152 18.7722 22.7079 17.477 23.2547C16.1352 23.8215 14.693 24.1122 13.2363 24.1096C11.7633 24.1096 10.3364 23.8205 8.99564 23.2547C7.70046 22.7079 6.52351 21.9152 5.52989 20.9206C4.5345 19.9294 3.74079 18.7545 3.19274 17.461C2.62383 16.1202 2.33784 14.6964 2.33784 13.2234C2.33784 11.7504 2.62691 10.3266 3.19274 8.98578C3.74013 7.69112 4.52738 6.52562 5.52989 5.52618C6.53241 4.52674 7.69791 3.73949 8.99564 3.1921C10.3364 2.62627 11.7633 2.3372 13.2363 2.3372C14.7094 2.3372 16.1363 2.62319 17.477 3.1921C18.7748 3.73949 19.9403 4.52674 20.9428 5.52618C21.1857 5.76912 21.4133 6.02129 21.6316 6.27961C21.7239 6.39339 21.8654 6.45797 22.0099 6.45797H24.1718C24.3655 6.45797 24.4854 6.2427 24.3778 6.07972C22.0191 2.41408 17.8922 -0.0122542 13.2025 4.65544e-05C5.83434 0.0184978 -0.0731207 5.99976 0.000684092 13.3587C0.0744889 20.6008 5.97272 26.4468 13.2363 26.4468C17.9137 26.4468 22.0222 24.0235 24.3778 20.3671C24.4824 20.2041 24.3655 19.9888 24.1718 19.9888ZM26.9056 13.0297L22.5419 9.58545C22.3789 9.45629 22.1421 9.57314 22.1421 9.77918V12.1163H12.486C12.3507 12.1163 12.24 12.227 12.24 12.3624V14.0845C12.24 14.2198 12.3507 14.3305 12.486 14.3305H22.1421V16.6676C22.1421 16.8737 22.382 16.9905 22.5419 16.8614L26.9056 13.4171C26.935 13.3941 26.9588 13.3647 26.9751 13.3312C26.9915 13.2976 27 13.2607 27 13.2234C27 13.1861 26.9915 13.1492 26.9751 13.1157C26.9588 13.0821 26.935 13.0527 26.9056 13.0297Z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default StudentNavigationSidebar;
