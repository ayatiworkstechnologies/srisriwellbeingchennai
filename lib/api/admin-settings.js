import { apiRequest, authHeaders } from "./base";

const emailSettingsPath = "/api/v1/admin/settings/email-notifications";

export function getAdminEmailSettings(token) {
  return apiRequest(emailSettingsPath, {
    headers: authHeaders(token),
  });
}

export function updateAdminEmailSettings(token, payload) {
  return apiRequest(emailSettingsPath, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}
