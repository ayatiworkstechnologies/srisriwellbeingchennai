import { apiRequest } from "./base";

export function getBookingAvailability({ therapyName, bookingDate }) {
  const params = new URLSearchParams({
    therapy_name: therapyName,
    booking_date: bookingDate,
  });

  return apiRequest(`/api/v1/booking/availability?${params.toString()}`);
}

export function createBookingAppointment(payload) {
  return apiRequest("/api/v1/booking/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function cancelPublicBooking(payload) {
  return apiRequest("/api/v1/public/bookings/cancel", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
