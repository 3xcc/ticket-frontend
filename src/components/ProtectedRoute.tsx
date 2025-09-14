import { type ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = getToken();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        // Decode JWT payload to get role
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || null);
      } catch {
        setUserRole(null);
      }
    }
  }, [token]);

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
