import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "../Pages/Login";
import Support from "../Pages/Support";
import Home from "../Pages/Home";
import NavBar from "../Components/Navbar/navbar";
import Dashboard from "../Pages/Dashboard";
import AddressSection from "../Components/Forms/AddressSection";
import DwellingSection from "../Components/Forms/DwellingSection";
import FeedbackSection from "../Components/Forms/FeedbackSection";

const AppRoutes = () => {
    return (
        <Router>
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/support" element={<Support />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/address" element={<AddressSection />} />
                    <Route exact path="/dwelling" element={<DwellingSection />} />
                    <Route exact path="/feedback" element={<FeedbackSection />} />
                </Routes>
        </Router >
    );
};

export default AppRoutes;