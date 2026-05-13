import { apiRequest, authHeaders } from "./base";

const emailSettingsPath = "/admin/settings/email-notifications";
const pageMetaSettingsPath = "/admin/settings/page-meta";

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

export function getAdminPageMetaSettings(token) {
  return apiRequest(pageMetaSettingsPath, {
    headers: authHeaders(token),
  });
}

export function updateAdminPageMetaSetting(token, pageMetaId, payload) {
  return apiRequest(`${pageMetaSettingsPath}/${pageMetaId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}
