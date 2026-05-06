import { apiRequest, authHeaders } from "./base";

const basePath = "/api/v1/admin/relaxation-therapies";

export function listAdminRelaxationTherapies(token) {
  return apiRequest(basePath, {
    headers: authHeaders(token),
  });
}

export function createAdminRelaxationTherapy(token, payload) {
  return apiRequest(basePath, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateAdminRelaxationTherapy(token, therapyId, payload) {
  return apiRequest(`${basePath}/${therapyId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminRelaxationTherapy(token, therapyId) {
  return apiRequest(`${basePath}/${therapyId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
