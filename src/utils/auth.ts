// src/utils/auth.ts
import { apiFetch } from "./api";

export const TOKEN_KEY = "auth_token";

/**
 * Save JWT token to localStorage
 */
export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Retrieve JWT token from localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from localStorage
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Login with email/password
 * Calls backend /api/admin/login and stores token
 */
export async function login(email: string, password: string) {
  // Ensure we hit the correct backend route
  const data = await apiFetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  // Store token
  if (data?.access_token) {
    saveToken(data.access_token);
  } else {
    throw new Error(data?.detail || "Login failed: No access token returned");
  }

  // Return full response (so we can use role for redirect)
  return data;
}
