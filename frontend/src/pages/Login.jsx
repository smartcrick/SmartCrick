import { useState, useContext, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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

  // -------------------------------------------
  // GOOGLE LOGIN LOGIC
  // -------------------------------------------
  useEffect(() => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID_HERE",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axiosClient.post("/api/auth/google-login/", {
        id_token: response.credential,
      });

      login(res.data.access, res.data.refresh);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setErrors({ api: "Google login failed" });
    }
  };

  // -------------------------------------------

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
          {errors.api && <p className="error">{errors.api}</p>}

          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot password?</Link>


          </div>

          <button type="submit">Sign In</button>

          <div className="social-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <div className="social-login">
            <div id="google-login-btn"></div>
          </div>

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
