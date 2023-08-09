import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CohortProvider } from "./context/CohortContext";
import { DataProvider } from "./context/DataContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDash from "./pages/StudentDash";
import "./App.css";

function App() {

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CohortProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/students" element={<StudentDash />} />
                <Route path="/instructors" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </CohortProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
