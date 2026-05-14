const DEFAULT_BACKEND_URL = "https://srisriwellbeingchennai-backend.onrender.com";

function getBackendBaseUrl() {
  return (process.env.BACKEND_API_URL || DEFAULT_BACKEND_URL)
    .replace(/\/+$/, "")
    .replace(/\/api$/i, "");
}

function buildTargetUrl(request, pathSegments) {
  const backendBaseUrl = getBackendBaseUrl();
  const incomingUrl = new URL(request.url);
  const joinedPath = ["api", ...pathSegments].filter(Boolean).join("/");
  const targetUrl = new URL(`${backendBaseUrl}/${joinedPath}`);

  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  return targetUrl;
}

async function forwardRequest(request, context) {
  const params = await context.params;
  const pathSegments = params?.path || [];
  const targetUrl = buildTargetUrl(request, pathSegments);
  const method = request.method;
  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");

  if (contentType) headers.set("content-type", contentType);
  if (authorization) headers.set("authorization", authorization);

  const init = {
    method,
    headers,
    cache: "no-store",
    redirect: "follow",
  };

  if (!["GET", "HEAD"].includes(method)) {
    init.body = await request.text();
  }

  let response;
  try {
    response = await fetch(targetUrl, init);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown proxy error";
    return Response.json(
      {
        detail: `Backend proxy could not reach ${targetUrl.origin}. ${message}`,
      },
      { status: 502 }
    );
  }
  const responseBody = await response.arrayBuffer();
  const responseHeaders = new Headers();
  const responseContentType = response.headers.get("content-type");

  if (responseContentType) {
    responseHeaders.set("content-type", responseContentType);
  }

  if ([204, 205, 304].includes(response.status)) {
    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  }

  return new Response(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const dynamic = "force-dynamic";

export async function GET(request, context) {
  return forwardRequest(request, context);
}

export async function POST(request, context) {
  return forwardRequest(request, context);
}

export async function PUT(request, context) {
  return forwardRequest(request, context);
}

export async function PATCH(request, context) {
  return forwardRequest(request, context);
}

export async function DELETE(request, context) {
  return forwardRequest(request, context);
}

export async function OPTIONS(request, context) {
  return forwardRequest(request, context);
}
