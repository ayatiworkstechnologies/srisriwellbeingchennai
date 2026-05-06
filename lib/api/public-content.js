import { apiRequest } from "./base";

export function listPublicServices() {
  return apiRequest("/api/v1/content/services");
}

export function listPublicRelaxationTherapies() {
  return apiRequest("/api/v1/content/relaxation-therapies");
}
