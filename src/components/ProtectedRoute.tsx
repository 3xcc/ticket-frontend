import { type ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";
import { apiFetch } from "../utils/api";

interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = getToken();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Decode locally for instant role
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || null);

        // Validate token & role with backend
        const me = await apiFetch("/admin/me");
        if (me?.role) {
          setUserRole(me.role);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        clearToken();
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  if (loading) {
    return <p>Checking access…</p>;
  }

  // No token? Kick to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is set, enforce it
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
