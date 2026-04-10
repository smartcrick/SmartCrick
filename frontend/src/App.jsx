import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth.jsx";
import Layout from "./component/Layout.jsx";
import Analysis from "./pages/Analysis.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import AddPerformance from "./pages/AddPerformance.jsx";
import Profile from "./pages/Profile.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import About from "./pages/Footer/About.jsx";
import Career from "./pages/Footer/Career.jsx";
import Contact from "./pages/Footer/Contact.jsx";
import PrivacyPolicy from "./pages/Footer/Privacy_policy.jsx";
import Terms from "./pages/Footer/Terms.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/performance" element={<AddPerformance />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
