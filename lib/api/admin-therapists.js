import { apiRequest, authHeaders } from "./base";

export function listAdminTherapists(token) {
  return apiRequest("/api/v1/admin/therapists", {
    headers: authHeaders(token),
  });
}
