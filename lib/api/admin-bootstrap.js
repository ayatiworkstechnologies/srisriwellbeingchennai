import { apiRequest, authHeaders } from "./base";

export function getAdminBootstrap(token, bookingStatus) {
  const params = new URLSearchParams();

  if (bookingStatus && bookingStatus !== "all") {
    params.set("booking_status", bookingStatus);
  }

  const query = params.toString();
  const path = query ? `/api/v1/admin/bootstrap?${query}` : "/api/v1/admin/bootstrap";

  return apiRequest(path, {
    headers: authHeaders(token),
  });
}
