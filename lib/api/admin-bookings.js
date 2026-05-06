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
