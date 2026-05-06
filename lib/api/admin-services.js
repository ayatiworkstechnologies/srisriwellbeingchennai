import { apiRequest, authHeaders } from "./base";

const basePath = "/api/v1/admin/services";

export function listAdminServices(token) {
  return apiRequest(basePath, {
    headers: authHeaders(token),
  });
}

export function createAdminService(token, payload) {
  return apiRequest(basePath, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminService(token, serviceId, payload) {
  return apiRequest(`${basePath}/${serviceId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminService(token, serviceId) {
  return apiRequest(`${basePath}/${serviceId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
