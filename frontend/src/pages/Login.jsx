import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import GoogleLoginButton from "../component/GoogleLoginButton";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      navigate("/profile");
    } catch (err) {
      setErrors({ api: "Incorrect username or password" });
    }
  };

  return (
    <div className="login-container">
      {/* FULLSCREEN VIDEO BACKGROUND */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LOGIN BOX */}
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          {/* Username */}
          <div className="input-field">
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
            />
            <label>Enter your username</label>
          </div>
          {errors.username && <p className="error">{errors.username}</p>}

          {/* Password */}
          <div className="input-field">
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <label>Enter your password</label>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          {/* API Error */}
          {errors.api && <p className="error">{errors.api}</p>}

          {/* Remember & Forgot */}
          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* Login Button */}
          <button type="submit">Sign In</button>

          {/* Divider */}
          <div className="social-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <div className="social-login">
            <GoogleLoginButton />
          </div>

          {/* Register */}
          <div className="register">
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
