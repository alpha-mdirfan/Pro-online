const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

export async function loginWithEmail(email, password) {
  const res = await fetch(`${API_BASE}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Login failed");
  }
  return data; 
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token available");

  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Refresh failed");

  localStorage.setItem("access", data.access);
  return data.access;
}

export async function authFetch(url, options = {}) {
  const access = localStorage.getItem("access");
  const headers = new Headers(options.headers || {});
  if (access) headers.set("Authorization", `Bearer ${access}`);

  let res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    try {
      const newAccess = await refreshToken();
      headers.set("Authorization", `Bearer ${newAccess}`);
      res = await fetch(url, { ...options, headers });
    } catch {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error("Session expired. Please sign in again.");
    }
  }
  return res;
}