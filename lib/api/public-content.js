import { apiRequest } from "./base";

export function listPublicServices() {
  return apiRequest("/content/services");
}

export function listPublicRelaxationTherapies() {
  return apiRequest("/content/relaxation-therapies");
}

export function listPublicNadiCamps() {
  return apiRequest("/content/nadi-camps");
}
