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
    const contentType = response.headers.get("content-type") || "";
    const errorPayload = contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : {};
    const plainText = contentType.includes("application/json")
      ? ""
      : await response.text().catch(() => "");
    const detail =
      errorPayload.detail ||
      plainText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ||
      "Request failed";
    const proxyHint =
      response.status === 404 && API_BASE_URL.includes("/api/backend")
        ? " Check BACKEND_API_URL on the frontend host and confirm the backend service is live."
        : "";
    const statusHint = `Backend request failed (${response.status}) at ${path}.`;
    throw new Error(`${statusHint} ${detail}.${proxyHint}`.trim());
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
