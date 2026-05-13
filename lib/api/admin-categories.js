import { apiRequest, authHeaders } from "./base";

const basePath = "/api/v1/admin/categories";

export function listAdminCategories(token) {
  return apiRequest(basePath, {
    headers: authHeaders(token),
  });
}

export function createAdminCategory(token, payload) {
  return apiRequest(basePath, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminCategory(token, categoryId, payload) {
  return apiRequest(`${basePath}/${categoryId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminCategory(token, categoryId) {
  return apiRequest(`${basePath}/${categoryId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
