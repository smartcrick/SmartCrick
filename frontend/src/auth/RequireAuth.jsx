import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ⛔ Prevent redirect until auth check is done
 if (loading) return <div className="loading">Loading...</div>;


  // ❌ Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // ✔ Logged in → allow page
  return children;
}
