import { apiRequest } from "./base";

export function loginAdmin(credentials) {
  return apiRequest("/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function requestAdminPasswordReset(payload) {
  return apiRequest("/admin/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resetAdminPassword(payload) {
  return apiRequest("/admin/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
