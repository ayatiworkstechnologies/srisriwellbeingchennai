import { apiRequest } from "./base";

export function createPublicLead(payload) {
  return apiRequest("/contact/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
