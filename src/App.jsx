import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SportsPage from "./pages/SportsPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import SportRegistration from "./pages/SportRegistration";
import BrochureViewer from "./components/BrochureViewer";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./utils/ScrollToTop";


const App = () => {
  useEffect(() => {
    document.body.style.userSelect = "none"; 
    document.body.style.webkitUserSelect = "none"; 
    document.body.style.mozUserSelect = "none"; 
    document.body.style.msUserSelect = "none";

    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("copy", disableRightClick);
    document.addEventListener("dragstart", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("copy", disableRightClick);
      document.removeEventListener("dragstart", disableRightClick);
    };
  }, []);
  
  return (
    <Router>
      <ScrollToTop />
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/brochure" element={<BrochureViewer />} />
        <Route path="/sport-registration" element={<SportRegistration />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;