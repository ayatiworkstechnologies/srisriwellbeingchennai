import { apiRequest } from "./base";

export function loginAdmin(credentials) {
  return apiRequest("/api/v1/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
