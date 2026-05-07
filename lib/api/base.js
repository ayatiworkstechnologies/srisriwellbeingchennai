export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.message
        ? ` Original error: ${error.message}`
        : "";
    throw new Error(
      `Unable to reach backend at ${API_BASE_URL} for ${path}. Check that the API server is running, publicly reachable, and that CORS allows this frontend origin.${reason}`
    );
  }

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const detail = errorPayload.detail || "Request failed";
    throw new Error(detail);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

export function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}
