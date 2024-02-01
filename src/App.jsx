import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./components/Context/UserContext";
import NavBar from "./components/NavBar/NavBar";
import Authentications from "./pages/Authentications/Authentications";
import Home from "./pages/Home/Home";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";
import MyResumes from "./pages/MyResumes/MyResumes";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const { user } = useUser();

  useEffect(() => {
    // Additional logic can be added here if needed
  }, [user]);

  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/authentications" element={<Authentications />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/my-resumes" element={<MyResumes />} />
          {/* Add a default route to navigate to the home page */}
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
