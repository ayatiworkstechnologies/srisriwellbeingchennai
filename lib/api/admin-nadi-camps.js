import { apiRequest, authHeaders } from "./base";

const basePath = "/admin/nadi-camps";

export function listAdminNadiCamps(token) {
  return apiRequest(basePath, {
    headers: authHeaders(token),
  });
}

export function createAdminNadiCamp(token, payload) {
  return apiRequest(basePath, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminNadiCamp(token, nadiCampId, payload) {
  return apiRequest(`${basePath}/${nadiCampId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminNadiCamp(token, nadiCampId) {
  return apiRequest(`${basePath}/${nadiCampId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
