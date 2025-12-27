import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile</h1>

      <p>You are logged in.</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
