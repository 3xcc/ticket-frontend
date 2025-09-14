// src/utils/auth.ts

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
 * Calls backend /admin/login and stores token
 */
export async function login(email: string, password: string) {
  const res = await fetch("https://ticket-backend-jdpp.onrender.com/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  // Store token
  saveToken(data.access_token);

  // Return full response (so we can use role for redirect)
  return data;
}