import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Wait silently — no layout, no CSS
  if (loading) return null;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Logged in
  return children;
}
