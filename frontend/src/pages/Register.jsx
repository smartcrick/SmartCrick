import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "../css/Login.css";
import GoogleLoginButton from "../component/GoogleLoginButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    full_name: "",
    country: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&#]/.test(password);
    if (hasUpper && hasLower && hasNumber && hasSpecial && password.length >= 8) {
      return "Strong";
    }
    return "Medium";
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (form.password !== form.confirm_password) newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosClient.post("/api/register/", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.response && err.response.data) {
        setErrors(err.response.data); // Capture server errors (e.g., username taken)
      } else {
        setErrors({ api: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="wrapper">
        <form onSubmit={submitForm}>
          <h2>Create Account</h2>

          {/* USERNAME */}
          <div className="input-field">
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
            <label>Enter Username</label>
          </div>
          {errors.username && <p className="error">{errors.username}</p>}

          {/* FULL NAME */}
          <div className="input-field">
            <input type="text" name="full_name" value={form.full_name} onChange={handleChange} required />
            <label>Enter Full name</label>
          </div>
          {errors.full_name && <p className="error">{errors.full_name}</p>}

          {/* EMAIL */}
          <div className="input-field">
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Enter Email</label>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          {/* --- ADDED MISSING COUNTRY FIELD --- */}
          <div className="input-field">
            <input type="text" name="country" value={form.country} onChange={handleChange} required />
            <label>Enter Country</label>
          </div>
          {errors.country && <p className="error">{errors.country}</p>}

          {/* PASSWORD */}
          <div className="input-field password-field">
            <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required />
            <label>Enter Password</label>
            <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {form.password && <p className={`strength ${passwordStrength.toLowerCase()}`}>Strength: {passwordStrength}</p>}
          {errors.password && <p className="error">{errors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <div className="input-field password-field">
            <input type={showConfirmPassword ? "text" : "password"} name="confirm_password" value={form.confirm_password} onChange={handleChange} required />
            <label>Confirm Password</label>
            <span className="toggle-password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
          
          {errors.api && <p className="error">{errors.api}</p>}

          <button id="submit" type="submit">Register</button>
          
          <div className="social-divider"><span>OR SIGN UP WITH</span></div>
          <div className="social-login"><GoogleLoginButton /></div>
          
          <div className="register">
            <p>Already have an account? <Link id="but" to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}