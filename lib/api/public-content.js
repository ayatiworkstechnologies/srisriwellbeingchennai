import { apiRequest } from "./base";

export function listPublicServices() {
  return apiRequest("/content/services");
}

export function listPublicTestimonials(category) {
  if (!category) {
    return apiRequest("/content/testimonials");
  }

  const params = new URLSearchParams({ category });
  return apiRequest(`/content/testimonials?${params.toString()}`);
}

export function listPublicAlternativeTreatments(category) {
  if (!category) {
    return apiRequest("/content/alternative-treatments");
  }

  const params = new URLSearchParams({ category });
  return apiRequest(`/content/alternative-treatments?${params.toString()}`);
}

export function listPublicRelaxationTherapies(category) {
  const normalizedCategory = typeof category === "string" ? category.trim().toLowerCase() : "";

  if (!normalizedCategory) {
    return apiRequest("/content/relaxation-therapies");
  }

  const params = new URLSearchParams({ category: normalizedCategory });
  return apiRequest(`/content/relaxation-therapies?${params.toString()}`);
}

export function listPublicNadiCamps() {
  return apiRequest("/content/nadi-camps");
}
