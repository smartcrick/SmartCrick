import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import axiosClient from "../api/axiosClient";
import GoogleLoginButton from "../component/GoogleLoginButton";
import { AuthContext } from "../context/AuthContext.jsx";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosClient.post("/api/auth/login/", form);
      login(res.data.access, res.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ api: err.response?.data?.error || "Incorrect username or password" });
    }
  };

  return (
    <div className="login-container">
      {/* FULLSCREEN VIDEO BACKGROUND */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/log-vid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LOGIN BOX */}
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-field">
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
            />
            <label>Enter username</label>
          </div>
          {errors.username && <p className="error">{errors.username}</p>}

          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <label>Enter password</label>

            <span
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && <p className="error">{errors.password}</p>}
          {errors.api && <p className="error">{errors.api}</p>}

          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <Link id="but" to="/forgot-password">Forgot password?</Link>
          </div>

          <button id="submit" type="submit">Sign In</button>

          <div className="social-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-login">
            <GoogleLoginButton />
          </div>

          <div className="register">
            <p>
              Don't have an account? <Link id="but" to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
