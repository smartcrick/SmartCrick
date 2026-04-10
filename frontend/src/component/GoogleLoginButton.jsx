import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/auth-context.js";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await axiosClient.post("/api/auth/google-login/", {
            id_token: credentialResponse.credential,
          });

          login(res.data.access, res.data.refresh);
          navigate("/dashboard");
        } catch {
          alert("Google login failed");
        }
      }}
      onError={() => {
        alert("Google Login Failed");
      }}
    />
  );
}
