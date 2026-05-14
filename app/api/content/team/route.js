const DEFAULT_BACKEND_URL = "https://srisriwellbeingchennai-backend.onrender.com";

function getBackendBaseUrl() {
  return (process.env.BACKEND_API_URL || DEFAULT_BACKEND_URL)
    .replace(/\/+$/, "")
    .replace(/\/api$/i, "");
}

export const dynamic = "force-dynamic";

export async function GET() {
  const targetUrl = `${getBackendBaseUrl()}/api/content/team`;

  try {
    const response = await fetch(targetUrl, {
      cache: "no-store",
      headers: { accept: "application/json" },
    });

    if (response.status === 404) {
      return Response.json([]);
    }

    const responseBody = await response.arrayBuffer();
    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");

    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    }

    return new Response(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json([]);
  }
}
