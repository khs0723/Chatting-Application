import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/auth/Login/LoginPage";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AlertNotification from "./components/AlertNotification";
import ProfilePage from "./pages/auth/Profile/ProfilePage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route
            path="/"
            element={<Navigate replace to="/dashboard" />}
          ></Route>
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
