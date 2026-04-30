import { apiRequest } from "@/lib/api";

export async function submitEntity({
  token,
  editingId,
  type,
  form,
  transformPayload,
  setForm,
  initialForm,
  setEditingId,
  refresh,
  setErrorMessage,
  setSuccessMessage,
  setIsSubmitting,
  label,
}) {
  setIsSubmitting(true);
  setErrorMessage("");
  setSuccessMessage("");
  try {
    const path = editingId ? `/api/v1/admin/${type}/${editingId}` : `/api/v1/admin/${type}`;
    const method = editingId ? "PUT" : "POST";
    let payload = { ...form };
    if ("sort_order" in payload) payload.sort_order = Number(payload.sort_order);
    if (transformPayload) payload = transformPayload(payload);
    await apiRequest(path, { method, headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    setForm(initialForm);
    setEditingId(null);
    await refresh();
    setSuccessMessage(editingId ? `${label} updated.` : `${label} created.`);
  } catch (error) {
    setErrorMessage(error.message || `Unable to save ${label.toLowerCase()}`);
  } finally {
    setIsSubmitting(false);
  }
}

export async function refreshAdminData(
  token,
  statusFilter,
  setDashboard,
  setInquiries,
  setServices,
  setTestimonials,
  setNadiCamps,
  setRelaxationTherapies,
  setBookingSlots,
  setTherapists,
  setTherapistSchedules,
  setTherapistBlackouts,
  setBookings,
  setAlternativeTreatments,
  setPanchakarmaCoreTherapies,
  setPanchakarmaOtherTreatments,
  setErrorMessage,
  setIsLoading,
  setToken
) {
  return loadAdminData({
    token,
    statusFilter,
    setDashboard,
    setInquiries,
    setServices,
    setTestimonials,
    setNadiCamps,
    setRelaxationTherapies,
    setBookingSlots,
    setTherapists,
    setTherapistSchedules,
    setTherapistBlackouts,
    setBookings,
    setAlternativeTreatments,
    setPanchakarmaCoreTherapies,
    setPanchakarmaOtherTreatments,
    setErrorMessage,
    setIsLoading,
    setToken,
  });
}

export async function loadAdminData({
  token,
  statusFilter,
  setDashboard,
  setInquiries,
  setServices,
  setTestimonials,
  setNadiCamps,
  setRelaxationTherapies,
  setBookingSlots,
  setTherapists,
  setTherapistSchedules,
  setTherapistBlackouts,
  setBookings,
  setAlternativeTreatments,
  setPanchakarmaCoreTherapies,
  setPanchakarmaOtherTreatments,
  setErrorMessage,
  setIsLoading,
  setToken,
}) {
  setIsLoading(true);
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const inquiriesPath = statusFilter === "all" ? "/api/v1/admin/inquiries" : `/api/v1/admin/inquiries?status=${statusFilter}`;
    const [dashboardData, inquiryData, serviceData, testimonialData, nadiCampData, relaxationTherapyData, bookingSlotData, therapistData, therapistScheduleData, therapistBlackoutData, bookingData, alternativeTreatmentData, panchakarmaCoreData, panchakarmaOtherData] = await Promise.all([
      apiRequest("/api/v1/admin/dashboard", { headers }),
      apiRequest(inquiriesPath, { headers }),
      apiRequest("/api/v1/admin/services", { headers }),
      apiRequest("/api/v1/admin/testimonials", { headers }),
      apiRequest("/api/v1/admin/nadi-camps", { headers }),
      apiRequest("/api/v1/admin/relaxation-therapies", { headers }),
      apiRequest("/api/v1/admin/booking-slots", { headers }),
      apiRequest("/api/v1/admin/therapists", { headers }),
      apiRequest("/api/v1/admin/therapist-availabilities", { headers }),
      apiRequest("/api/v1/admin/therapist-blackouts", { headers }),
      apiRequest("/api/v1/admin/bookings", { headers }),
      apiRequest("/api/v1/admin/alternative-treatments", { headers }),
      apiRequest("/api/v1/admin/panchakarma-core-therapies", { headers }),
      apiRequest("/api/v1/admin/panchakarma-other-treatments", { headers }),
    ]);
    setDashboard(dashboardData);
    setInquiries(inquiryData);
    setServices(serviceData);
    setTestimonials(testimonialData);
    setNadiCamps(nadiCampData);
    setRelaxationTherapies(relaxationTherapyData);
    setBookingSlots(bookingSlotData);
    setTherapists(therapistData);
    setTherapistSchedules(therapistScheduleData);
    setTherapistBlackouts(therapistBlackoutData);
    setBookings(bookingData);
    setAlternativeTreatments(alternativeTreatmentData);
    setPanchakarmaCoreTherapies(panchakarmaCoreData);
    setPanchakarmaOtherTreatments(panchakarmaOtherData);
  } catch (error) {
    if (error.message === "Invalid or expired token") {
      window.localStorage.removeItem("ssw-admin-token");
      setToken("");
    }
    setErrorMessage(error.message || "Unable to load admin data");
  } finally {
    setIsLoading(false);
  }
}

export function formatDate(value) {
  const parsed = parseAdminDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

export function formatDateOnly(value) {
  const parsed = parseAdminDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(parsed);
}

export function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function countActive(items) {
  return items.filter((item) => item.is_active).length;
}

function parseAdminDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  if (typeof value === "string") {
    const slashMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (slashMatch) {
      const [, day, month, year] = slashMatch;
      const parsedSlashDate = new Date(Number(year), Number(month) - 1, Number(day));
      if (!Number.isNaN(parsedSlashDate.getTime())) {
        return parsedSlashDate;
      }
    }
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }
  return parsedDate;
}
