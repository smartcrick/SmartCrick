import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "../css/Login.css";

export default function Register() {
  const navigate = useNavigate();

  /* ==========================
     1️⃣ FORM STATE
     ========================== */
  const [form, setForm] = useState({
    username: "",
    email: "",
    full_name: "",
    country: "",
    password: "",
    confirm_password: "",
  });

  /* ==========================
     2️⃣ ERROR STATE
     ========================== */
  const [errors, setErrors] = useState({});

  /* ==========================
     3️⃣ PASSWORD VISIBILITY
     ========================== */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ==========================
     4️⃣ PASSWORD STRENGTH
     ========================== */
  const getPasswordStrength = (password) => {
    if (!password) return "";

    if (password.length < 6) return "Weak";

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&#]/.test(password);

    if (
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSpecial &&
      password.length >= 8
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const passwordStrength = getPasswordStrength(form.password);

  /* ==========================
     5️⃣ HANDLE INPUT CHANGE
     ========================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ==========================
     6️⃣ FRONTEND VALIDATION
     ========================== */
  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim())
      newErrors.username = "Username is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";

    if (!form.full_name.trim())
      newErrors.full_name = "Full Name is required";

    if (!form.country.trim())
      newErrors.country = "Country is required";

    if (!form.password.trim())
      newErrors.password = "Password is required";

    if (!form.confirm_password.trim())
      newErrors.confirm_password = "Confirm password is required";

    if (
      form.password &&
      form.confirm_password &&
      form.password !== form.confirm_password
    ) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ==========================
     7️⃣ SUBMIT FORM
     ========================== */
  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axiosClient.post("/api/register/", form);
      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ api: "Registration failed" });
      }
    }
  };

  return (
    <div className="login-container">

      {/* VIDEO BACKGROUND */}
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
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label>Enter your username</label>
          </div>
          {errors.username && <p className="error">{errors.username}</p>}

          {/* EMAIL */}
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Enter your email</label>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          {/* FULL NAME */}
          <div className="input-field">
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <label>Enter your full name</label>
          </div>
          {errors.full_name && <p className="error">{errors.full_name}</p>}

          {/* COUNTRY */}
          <div className="input-field">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="country-select"
            >
              <option value="" disabled hidden>
                Select Country
              </option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          {errors.country && <p className="error">{errors.country}</p>}

          {/* PASSWORD */}
          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Create a password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* PASSWORD STRENGTH INDICATOR */}
          {form.password && (
            <p className={`strength ${passwordStrength.toLowerCase()}`}>
              Strength: {passwordStrength}
            </p>
          )}

          {errors.password && <p className="error">{errors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <div className="input-field password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              required
            />
            <label>Confirm your password</label>
            <span
              className="toggle-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>

          {errors.confirm_password && (
            <p className="error">{errors.confirm_password}</p>
          )}

          {errors.api && <p className="error">{errors.api}</p>}

          <button type="submit">Register</button>

          <div className="social-divider">
            <span>OR SIGN UP WITH</span>
          </div>

          <div className="social-login">
            <button type="button" className="google-btn">
              <img src="/google-icon.png" alt="Google" />
            </button>
          </div>

          <div className="register">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
