import { GoogleLogin } from "@react-oauth/google";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        console.log("Credential Response:", credentialResponse);
        try {
          const res = await axiosClient.post("/api/auth/google-login/", {
            id_token: credentialResponse.credential,
          });

          login(res.data.access, res.data.refresh);
          navigate("/profile");
        } catch (err) {
          console.error("Google login error:", err.response?.data || err);
          alert("Google login failed");
        }
      }}
      onError={() => {
        alert("Google Login Failed");
      }}
    />
  );
}
