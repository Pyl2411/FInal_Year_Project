import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import MockInterview from "./pages/MockInterview";
import SkillGap from "./pages/SkillGap";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginRegister />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/mock-interview"
          element={isAuthenticated ? <MockInterview /> : <Navigate to="/" />}
        />
        <Route
          path="/skill-gap"
          element={isAuthenticated ? <SkillGap /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
