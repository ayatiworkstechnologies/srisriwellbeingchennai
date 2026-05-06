import {
  createAdminRelaxationTherapy,
  createAdminService,
  listAdminBookings,
  listAdminInquiries,
  listAdminRelaxationTherapies,
  listAdminServices,
  listAdminTherapists,
  updateAdminRelaxationTherapy,
  updateAdminService,
} from "@/lib/api";

async function runInBatches(tasks, batchSize = 2) {
  const results = [];

  for (let index = 0; index < tasks.length; index += batchSize) {
    const batch = tasks.slice(index, index + batchSize);
    const batchResults = await Promise.all(batch.map((task) => task()));
    results.push(...batchResults);
  }

  return results;
}

export async function submitEntity({
  token,
  editingId,
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
  createEntity,
  updateEntity,
}) {
  setIsSubmitting(true);
  setErrorMessage("");
  setSuccessMessage("");

  try {
    let payload = { ...form };

    if ("sort_order" in payload) {
      payload.sort_order = Number(payload.sort_order);
    }

    if (transformPayload) {
      payload = transformPayload(payload);
    }

    if (editingId) {
      await updateEntity(token, editingId, payload);
    } else {
      await createEntity(token, payload);
    }

    setForm(initialForm);
    setEditingId(null);
    await refresh();
    setSuccessMessage(editingId ? `${label} updated.` : `${label} created.`);
    return true;
  } catch (error) {
    setErrorMessage(error.message || `Unable to save ${label.toLowerCase()}`);
    return false;
  } finally {
    setIsSubmitting(false);
  }
}

export async function refreshAdminData(options) {
  return loadAdminData(options);
}

export async function loadAdminData({
  token,
  statusFilter,
  inquiryStatusFilter,
  inquirySourceFilter,
  setInquiries,
  setServices,
  setRelaxationTherapies,
  setTherapists,
  setBookings,
  setErrorMessage,
  setIsLoading,
  setToken,
  setLastLoadedAt,
}) {
  setIsLoading(true);

  try {
    const requests = [
      () => listAdminInquiries(token, { status: inquiryStatusFilter, source: inquirySourceFilter }),
      () => listAdminServices(token),
      () => listAdminRelaxationTherapies(token),
      () => listAdminTherapists(token),
      () => listAdminBookings(token, statusFilter),
    ];

    const [inquiryData, serviceData, relaxationTherapyData, therapistData, bookingData] =
      await runInBatches(requests, 2);

    setInquiries(inquiryData);
    setServices(serviceData);
    setRelaxationTherapies(relaxationTherapyData);
    setTherapists(therapistData);
    setBookings(bookingData);
    setLastLoadedAt(new Date());
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

export const adminCrudModules = {
  services: {
    createEntity: createAdminService,
    updateEntity: updateAdminService,
  },
  "relaxation-therapies": {
    createEntity: createAdminRelaxationTherapy,
    updateEntity: updateAdminRelaxationTherapy,
  },
};

export function formatDate(value) {
  const parsed = parseAdminDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function formatDateOnly(value) {
  const parsed = parseAdminDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(parsed);
}

export function formatTime(value) {
  if (!value) return "";
  
  // Handle Date objects directly
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }).format(value);
  }

  // Handle "HH:mm" strings
  const stringValue = String(value);
  if (stringValue.includes(":")) {
    const [hours = "00", minutes = "00"] = stringValue.split(":");
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(2000, 0, 1, Number(hours), Number(minutes)));
  }

  // Fallback for other formats
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed);
  }

  return stringValue;
}

export function toTitleCase(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function countActive(items) {
  return items.filter((item) => item.is_active).length;
}

export function getUniqueInquirySources(items) {
  return [...new Set(items.map((item) => item.source).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
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
