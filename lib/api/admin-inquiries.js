import { apiRequest, authHeaders } from "./base";

const basePath = "/admin/inquiries";

export function listAdminInquiries(token, { status, source } = {}) {
  const params = new URLSearchParams();

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (source && source !== "all") {
    params.set("source", source);
  }

  const queryString = params.toString();
  const path = queryString ? `${basePath}?${queryString}` : basePath;

  return apiRequest(path, {
    headers: authHeaders(token),
  });
}

export function updateAdminInquiry(token, inquiryId, payload) {
  return apiRequest(`${basePath}/${inquiryId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminInquiry(token, inquiryId) {
  return apiRequest(`${basePath}/${inquiryId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export function sendAdminInquiryEmail(token, inquiryId, payload) {
  return apiRequest(`${basePath}/${inquiryId}/send-email`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}
