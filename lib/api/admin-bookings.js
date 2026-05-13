import { apiRequest, authHeaders } from "./base";

export function listAdminBookings(token, status) {
  const path =
    status && status !== "all"
      ? `/admin/bookings?status=${encodeURIComponent(status)}`
      : "/admin/bookings";

  return apiRequest(path, {
    headers: authHeaders(token),
  });
}

export function updateAdminBooking(token, bookingId, updates) {
  return apiRequest(`/admin/bookings/${bookingId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
}

export function sendAdminBookingEmail(token, bookingId, payload) {
  return apiRequest(`/admin/bookings/${bookingId}/send-email`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminBooking(token, bookingId) {
  return apiRequest(`/admin/bookings/${bookingId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
