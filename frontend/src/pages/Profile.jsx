import { useContext, useEffect, useState } from "react";

import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/auth-context.js";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get("/api/profile/");
        setProfile(response.data);
      } catch {
        setError("Unable to load your profile.");
      }
    };

    void fetchProfile();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      {profile ? (
        <>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Full name:</strong> {profile.full_name || "Not set"}</p>
          <p><strong>Country:</strong> {profile.country || "Not set"}</p>
          <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>
          <p><strong>Bio:</strong> {profile.bio || "Not set"}</p>
        </>
      ) : (
        !error && <p>Loading profile...</p>
      )}
      <button onClick={logout} type="button">Logout</button>
    </div>
  );
}
