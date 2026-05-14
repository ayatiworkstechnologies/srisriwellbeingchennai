import { apiRequest, authHeaders } from "./base";

const basePath = "/admin/testimonials";

export function listAdminTestimonials(token, category) {
  const suffix = category ? `?${new URLSearchParams({ category }).toString()}` : "";
  return apiRequest(`${basePath}${suffix}`, {
    headers: authHeaders(token),
  });
}

export function createAdminTestimonial(token, payload) {
  return apiRequest(basePath, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminTestimonial(token, testimonialId, payload) {
  return apiRequest(`${basePath}/${testimonialId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminTestimonial(token, testimonialId) {
  return apiRequest(`${basePath}/${testimonialId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
