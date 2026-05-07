import { apiRequest } from "./base";

export function loginAdmin(credentials) {
  return apiRequest("/api/v1/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function requestAdminPasswordReset(payload) {
  return apiRequest("/api/v1/admin/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resetAdminPassword(payload) {
  return apiRequest("/api/v1/admin/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
