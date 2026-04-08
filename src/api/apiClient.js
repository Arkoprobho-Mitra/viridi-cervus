/**
 * Central Axios-like fetch wrapper for API calls.
 * Spring Boot runs on :8080, FastAPI on :8000.
 */

const SPRING_BASE = process.env.REACT_APP_SPRING_BASE_URL || "http://localhost:8081";
const FASTAPI_BASE = process.env.REACT_APP_FASTAPI_BASE_URL || "http://localhost:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(baseUrl, path, options = {}) {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || error.message || `HTTP ${res.status}: ${res.statusText}`);
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

export const springApi = {
  get: (path) => request(SPRING_BASE, path, { method: "GET" }),
  post: (path, body) => request(SPRING_BASE, path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(SPRING_BASE, path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(SPRING_BASE, path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(SPRING_BASE, path, { method: "DELETE" }),
};

export const fastapiApi = {
  get: (path) => request(FASTAPI_BASE, path, { method: "GET" }),
  post: (path, body) => request(FASTAPI_BASE, path, { method: "POST", body: JSON.stringify(body) }),
};
