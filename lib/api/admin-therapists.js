import { apiRequest, authHeaders } from "./base";

export function listAdminTherapists(token) {
  return apiRequest("/admin/therapists", {
    headers: authHeaders(token),
  });
}

export function createAdminTherapist(token, payload) {
  return apiRequest("/admin/therapists", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminTherapist(token, therapistId, payload) {
  return apiRequest(`/admin/therapists/${therapistId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminTherapist(token, therapistId) {
  return apiRequest(`/admin/therapists/${therapistId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
