import {
  createAdminCategory,
  createAdminNadiCamp,
  getAdminBootstrap,
  listAdminCategories,
  listAdminNadiCamps,
  listAdminUsers,
  createAdminRelaxationTherapy,
  createAdminService,
  listAdminInquiries,
  updateAdminCategory,
  updateAdminNadiCamp,
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
  role,
  statusFilter,
  inquiryStatusFilter,
  inquirySourceFilter,
  setInquiries,
  setServices,
  setCategories,
  setNadiCamps,
  setRelaxationTherapies,
  setTherapists,
  setAdminUsers,
  setBookings,
  setErrorMessage,
  setIsLoading,
  setToken,
  setLastLoadedAt,
}) {
  setIsLoading(true);

  try {
    if (role === "doctor" || role === "therapist") {
      const bootstrap = await getAdminBootstrap(token, statusFilter);
      setInquiries([]);
      setServices([]);
      if (setCategories) {
        setCategories([]);
      }
      if (setNadiCamps) {
        setNadiCamps([]);
      }
      setRelaxationTherapies([]);
      setTherapists([]);
      if (setAdminUsers) {
        setAdminUsers([]);
      }
      setBookings(bootstrap.bookings || []);
      setLastLoadedAt(new Date());
      return;
    }

    const [inquiryData, bootstrapData, adminUserData, nadiCampData, categoryData] = await Promise.all([
      listAdminInquiries(token, { status: inquiryStatusFilter, source: inquirySourceFilter }),
      getAdminBootstrap(token, statusFilter),
      setAdminUsers ? listAdminUsers(token) : Promise.resolve(null),
      setNadiCamps ? listAdminNadiCamps(token) : Promise.resolve([]),
      setCategories ? listAdminCategories(token).catch(() => []) : Promise.resolve([]),
    ]);

    setInquiries(inquiryData || []);
    setServices(bootstrapData?.services || []);
    if (setCategories) {
      setCategories(categoryData || []);
    }
    if (setNadiCamps) {
      setNadiCamps(nadiCampData || bootstrapData?.nadi_camps || []);
    }
    setRelaxationTherapies(bootstrapData?.relaxation_therapies || []);
    setTherapists(bootstrapData?.therapists || []);
    if (setAdminUsers) {
      setAdminUsers(adminUserData);
    }
    setBookings(bootstrapData?.bookings || []);
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
  categories: {
    createEntity: createAdminCategory,
    updateEntity: updateAdminCategory,
  },
  "nadi-camps": {
    createEntity: createAdminNadiCamp,
    updateEntity: updateAdminNadiCamp,
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

export function parseAdminDate(value) {
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
