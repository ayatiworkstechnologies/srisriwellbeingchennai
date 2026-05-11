function resolveApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/backend";

  if (typeof window === "undefined") {
    return configuredBaseUrl;
  }

  return new URL(configuredBaseUrl, window.location.origin).toString().replace(/\/+$/, "");
}

export const API_BASE_URL = resolveApiBaseUrl();

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function apiRequest(path, options = {}) {
  let response;
  const requestUrl = `${API_BASE_URL}${path}`;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      response = await fetch(requestUrl, {
        ...options,
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
      break;
    } catch (error) {
      if (attempt < 2) {
        await wait(500 * (attempt + 1));
        continue;
      }

      const reason =
        error instanceof Error && error.message
          ? ` Original error: ${error.message}`
          : "";
      throw new Error(
        `Unable to reach backend at ${requestUrl}. Check that the frontend dev server is running and the backend proxy is reachable.${reason}`
      );
    }
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
