import { apiRequest, authHeaders } from "./base";

export function listAdminUsers(token) {
  return apiRequest("/api/v1/admin/users", {
    headers: authHeaders(token),
  });
}

export function createAdminUser(token, payload) {
  return apiRequest("/api/v1/admin/users", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminUser(token, userId, payload) {
  return apiRequest(`/api/v1/admin/users/${userId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminUser(token, userId) {
  return apiRequest(`/api/v1/admin/users/${userId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
