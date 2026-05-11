import { apiRequest, authHeaders } from "./base";

export function listAdminBookings(token, status) {
  const path =
    status && status !== "all"
      ? `/api/v1/admin/bookings?status=${encodeURIComponent(status)}`
      : "/api/v1/admin/bookings";

  return apiRequest(path, {
    headers: authHeaders(token),
  });
}

export function updateAdminBooking(token, bookingId, updates) {
  return apiRequest(`/api/v1/admin/bookings/${bookingId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
}

export function sendAdminBookingEmail(token, bookingId, payload) {
  return apiRequest(`/api/v1/admin/bookings/${bookingId}/send-email`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminBooking(token, bookingId) {
  return apiRequest(`/api/v1/admin/bookings/${bookingId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
