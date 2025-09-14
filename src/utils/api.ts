const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";

/**
 * apiFetch - wrapper around fetch that automatically attaches
 * the Authorization header if a token is present in localStorage.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} ${errorText}`);
  }

  return res.json();
}
