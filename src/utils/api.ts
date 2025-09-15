// src/utils/api.ts
import { getToken } from "./auth";

// Base URL comes from .env — no hardcoding
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

export async function apiFetch(path: string, options: RequestInit = {}) {
  // Ensure path starts with /api
  const normalisedPath = path.startsWith("/api") ? path : `/api${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  // Attach token if available
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${normalisedPath}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errMsg = res.statusText;
    try {
      const errData = await res.json();
      errMsg = errData.detail || errMsg;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(`API error: ${res.status} ${errMsg}`);
  }

  return res.json();
}
