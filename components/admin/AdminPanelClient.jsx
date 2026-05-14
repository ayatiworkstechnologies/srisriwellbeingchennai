"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  API_BASE_URL,
  createAdminTherapist,
  deleteAdminBooking,
  deleteAdminCategory,
  deleteAdminNadiCamp,
  deleteAdminTestimonial,
  createAdminUser,
  deleteAdminTherapist,
  deleteAdminRelaxationTherapy,
  deleteAdminService,
  deleteAdminUser,
  loginAdmin,
  deleteAdminInquiry,
  getAdminEmailSettings,
  getAdminPageMetaSettings,
  requestAdminPasswordReset,
  sendAdminBookingEmail,
  sendAdminInquiryEmail,
  updateAdminTherapist,
  updateAdminInquiry,
  updateAdminBooking,
  updateAdminEmailSettings,
  updateAdminPageMetaSetting,
  updateAdminUser,
} from "@/lib/api";

import { adminSections } from "./admin-config";
import {
  adminCrudModules,
  countActive,
  formatDate,
  formatDateOnly,
  formatTime,
  getUniqueInquirySources,
  loadAdminData,
  parseAdminDate,
  refreshAdminData,
  submitEntity,
  toTitleCase,
} from "./admin-data";
import {
  advancedBookingStatusOptions,
  initialNadiCampForm,
  contentCategoryOptions,
  initialCategoryForm,
  initialAdminUserForm,
  initialCredentials,
  initialRelaxationTherapyForm,
  initialServiceForm,
  initialTestimonialForm,
  initialTeamForm,
  initialTherapistForm,
  nadiCampStatusOptions,
  testimonialCategoryOptions,
} from "./admin-form-defaults";
import {
  EntityPanel,
  Field,
  FieldInline,
  FormModal,
  InfoStrip,
  PanelCard,
  PasswordInput,
  RecordCard,
  StatCard,
  SummaryTile,
  ToastStack,
  ToggleRow,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
  textAreaClass,
} from "./admin-ui";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";

function isLikelyJwt(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  return parts.length === 3 && parts.every(Boolean);
}

function normalizeTextValue(value, fallback = "") {
  if (typeof value === "string") {
    return value.trim();
  }
  return fallback;
}

function normalizeListValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeContentCategory(value, fallback) {
  const normalized = normalizeTextValue(value, fallback).toLowerCase();
  return normalized || fallback;
}

function splitEmailInput(value) {
  return normalizeListValue(value);
}

function joinEmailList(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadInquiriesCsv(inquiries) {
  const headers = [
    "ID",
    "Name",
    "Phone",
    "Email",
    "Topic",
    "Message",
    "Service Interest",
    "Source",
    "Page Path",
    "Status",
    "Created At",
  ];
  const rows = inquiries.map((inquiry) => [
    inquiry.id,
    inquiry.name,
    inquiry.phone,
    inquiry.email,
    inquiry.topic,
    inquiry.message,
    inquiry.service_interest,
    inquiry.source,
    inquiry.page_path,
    inquiry.status,
    inquiry.created_at,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sri-sri-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function AdminPanelClient({ currentSection = "bookings" }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [token, setToken] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nadiCamps, setNadiCamps] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [relaxationTherapies, setRelaxationTherapies] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const [nadiCampForm, setNadiCampForm] = useState(initialNadiCampForm);
  const [testimonialForm, setTestimonialForm] = useState(initialTestimonialForm);
  const [relaxationTherapyForm, setRelaxationTherapyForm] = useState(initialRelaxationTherapyForm);
  const [therapistForm, setTherapistForm] = useState(initialTherapistForm);
  const [adminUserForm, setAdminUserForm] = useState(initialAdminUserForm);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingNadiCampId, setEditingNadiCampId] = useState(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [editingRelaxationTherapyId, setEditingRelaxationTherapyId] = useState(null);
  const [editingTherapistId, setEditingTherapistId] = useState(null);
  const [editingAdminUserId, setEditingAdminUserId] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isNadiCampModalOpen, setIsNadiCampModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isRelaxationTherapyModalOpen, setIsRelaxationTherapyModalOpen] = useState(false);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [inquirySourceFilter, setInquirySourceFilter] = useState("all");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");
  const [testimonialCategoryFilter, setTestimonialCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [toasts, setToasts] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);
  const [lastLoadedAt, setLastLoadedAt] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isInquiryEmailModalOpen, setIsInquiryEmailModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  });
  const [emailSettingsForm, setEmailSettingsForm] = useState({
    booking_to_emails: "",
    booking_cc_emails: "",
    booking_bcc_emails: "",
    inquiry_to_emails: "",
    inquiry_cc_emails: "",
    inquiry_bcc_emails: "",
    inquiry_auto_reply_enabled: true,
    inquiry_auto_reply_subject: "",
    inquiry_auto_reply_message: "",
  });
  const [pageMetaSettings, setPageMetaSettings] = useState([]);
  const [inquiryEmailForm, setInquiryEmailForm] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
  });
  const isLimitedBookingRole = userProfile?.role === "doctor" || userProfile?.role === "therapist";

  const availableSections = useMemo(() => {
    if (isLimitedBookingRole) {
      return adminSections.filter((section) => section.id === "bookings");
    }
    return adminSections;
  }, [isLimitedBookingRole]);

  const normalizedSection =
    currentSection === "therapists" || currentSection === "doctor-logins"
      ? "team"
      : currentSection;

  const resolvedSection =
    availableSections.find((section) => section.id === normalizedSection)?.id ?? availableSections[0]?.id ?? "bookings";

  const currentSectionMeta =
    availableSections.find((section) => section.id === resolvedSection) ?? availableSections[0] ?? adminSections[0];
  const effectiveSectionMeta = useMemo(() => {
    if (!isLimitedBookingRole || currentSectionMeta.id !== "bookings") {
      return currentSectionMeta;
    }

    return {
      ...currentSectionMeta,
      eyebrow: userProfile?.role === "doctor" ? "Doctor Dashboard" : "Therapist Dashboard",
      title: userProfile?.role === "doctor" ? "Doctor booking queue" : "Therapist booking queue",
      description:
        userProfile?.role === "doctor"
          ? "Review and update the bookings assigned to your doctor profile."
          : "Review and update the bookings assigned to your therapist profile.",
    };
  }, [currentSectionMeta, isLimitedBookingRole, userProfile?.role]);

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "pending").length,
    [bookings]
  );
  const confirmedBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "confirmed").length,
    [bookings]
  );
  const newInquiries = useMemo(
    () => inquiries.filter((inquiry) => inquiry.status === "new").length,
    [inquiries]
  );
  const inquirySources = useMemo(() => getUniqueInquirySources(inquiries), [inquiries]);
  const teamLogins = useMemo(
    () => adminUsers.filter((item) => item.role === "doctor" || item.role === "therapist"),
    [adminUsers]
  );
  const filteredServices = useMemo(() => {
    if (serviceCategoryFilter === "all") {
      return services;
    }
    return services.filter((item) => (item.category || "main") === serviceCategoryFilter);
  }, [serviceCategoryFilter, services]);
  const filteredTestimonials = useMemo(() => {
    if (testimonialCategoryFilter === "all") {
      return testimonials;
    }
    return testimonials.filter((item) => (item.category || "home") === testimonialCategoryFilter);
  }, [testimonialCategoryFilter, testimonials]);
  const categoryOptions = useMemo(() => {
    const optionMap = new Map(
      contentCategoryOptions.map((option) => [option.value, option])
    );

    categories.forEach((item) => {
      optionMap.set(item.slug, { value: item.slug, label: item.label });
    });

    [...services, ...relaxationTherapies].forEach((item) => {
      const value = item.category;
      if (value && !optionMap.has(value)) {
        optionMap.set(value, { value, label: toTitleCase(value) });
      }
    });

    return [...optionMap.values()];
  }, [categories, relaxationTherapies, services]);
  const reviewCategoryOptions = useMemo(() => {
    const optionMap = new Map(testimonialCategoryOptions.map((option) => [option.value, option]));

    testimonials.forEach((item) => {
      const value = item.category || "home";
      if (!optionMap.has(value)) {
        optionMap.set(value, { value, label: toTitleCase(value) });
      }
    });

    return [...optionMap.values()];
  }, [testimonials]);

  useEffect(() => {
    if (!errorMessage && !successMessage) return;

    const activeMessage = errorMessage || successMessage;
    const tone = errorMessage ? "error" : "success";
    const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setToasts((current) => [...current.slice(-3), { id: toastId, tone, message: activeMessage }]);
    setErrorMessage("");
    setSuccessMessage("");

    const timeout = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== toastId));
    }, 4500);

    return () => window.clearTimeout(timeout);
  }, [errorMessage, successMessage]);

  const dismissToast = (toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const closeConfirmModal = () => {
    setConfirmAction(null);
  };

  const openConfirmModal = ({ title, subtitle, message, confirmLabel = "Yes", tone = "danger", onConfirm }) => {
    setConfirmAction({ title, subtitle, message, confirmLabel, tone, onConfirm });
  };
  const serviceCategoryCounts = useMemo(() => {
    const counts = {
      all: services.length,
    };
    categoryOptions.forEach((option) => {
      counts[option.value] = services.filter((item) => (item.category || "main") === option.value).length;
    });
    return counts;
  }, [categoryOptions, services]);
  const testimonialCategoryCounts = useMemo(() => {
    const counts = {
      all: testimonials.length,
    };
    reviewCategoryOptions.forEach((option) => {
      counts[option.value] = testimonials.filter((item) => (item.category || "home") === option.value).length;
    });
    return counts;
  }, [reviewCategoryOptions, testimonials]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("ssw-admin-token");
    const savedProfile = window.localStorage.getItem("ssw-admin-profile");
    if (isLikelyJwt(savedToken)) {
      setToken(savedToken);
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch {
          window.localStorage.removeItem("ssw-admin-profile");
        }
      }
    } else if (savedToken) {
      window.localStorage.removeItem("ssw-admin-token");
      window.localStorage.removeItem("ssw-admin-profile");
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (!token) return;

    loadAdminData({
      token,
      role: userProfile?.role,
      statusFilter,
      inquiryStatusFilter,
      inquirySourceFilter,
      setInquiries,
      setServices,
      setCategories,
      setNadiCamps,
      setTestimonials,
      setRelaxationTherapies,
      setTherapists,
      setAdminUsers: userProfile?.role === "super_admin" ? setAdminUsers : null,
      setBookings,
      setLastLoadedAt,
      setIsLoading,
      setErrorMessage,
      setToken,
    });
  }, [token, statusFilter, inquiryStatusFilter, inquirySourceFilter, userProfile?.role]);

  useEffect(() => {
    if (!token || userProfile?.role !== "super_admin") return;

    getAdminEmailSettings(token)
      .then((settings) => {
        setEmailSettingsForm({
          booking_to_emails: joinEmailList(settings.booking_to_emails),
          booking_cc_emails: joinEmailList(settings.booking_cc_emails),
          booking_bcc_emails: joinEmailList(settings.booking_bcc_emails),
          inquiry_to_emails: joinEmailList(settings.inquiry_to_emails),
          inquiry_cc_emails: joinEmailList(settings.inquiry_cc_emails),
          inquiry_bcc_emails: joinEmailList(settings.inquiry_bcc_emails),
          inquiry_auto_reply_enabled: Boolean(settings.inquiry_auto_reply_enabled),
          inquiry_auto_reply_subject: settings.inquiry_auto_reply_subject || "",
          inquiry_auto_reply_message: settings.inquiry_auto_reply_message || "",
        });
      })
      .catch((error) => {
        setErrorMessage(error.message || "Unable to load email settings.");
      });
  }, [token, userProfile?.role]);

  useEffect(() => {
    if (!token || userProfile?.role !== "super_admin") return;

    getAdminPageMetaSettings(token)
      .then((items) => setPageMetaSettings(items || []))
      .catch((error) => {
        setErrorMessage(error.message || "Unable to load page meta settings.");
      });
  }, [token, userProfile?.role]);

  const refresh = () => {
    if (!token) return;
    refreshAdminData({
      token,
      role: userProfile?.role,
      statusFilter,
      inquiryStatusFilter,
      inquirySourceFilter,
      setInquiries,
      setServices,
      setCategories,
      setNadiCamps,
      setTestimonials,
      setRelaxationTherapies,
      setTherapists,
      setAdminUsers: userProfile?.role === "super_admin" ? setAdminUsers : null,
      setBookings,
      setLastLoadedAt,
      setIsLoading,
      setErrorMessage,
      setToken,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await loginAdmin(credentials);
      const nextToken = data.access_token || data.token || "";
      if (!isLikelyJwt(nextToken)) {
        throw new Error("Login succeeded but no access token was returned.");
      }
      setToken(nextToken);
      const nextProfile = {
        role: data.role || "super_admin",
        full_name: data.full_name || credentials.email,
        therapist_id: data.therapist_id || null,
      };
      setUserProfile(nextProfile);
      window.localStorage.setItem("ssw-admin-token", nextToken);
      window.localStorage.setItem("ssw-admin-profile", JSON.stringify(nextProfile));
      setSuccessMessage("Login successful! Welcome to the admin portal.");
    } catch (error) {
      setErrorMessage(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUserProfile(null);
    window.localStorage.removeItem("ssw-admin-token");
    window.localStorage.removeItem("ssw-admin-profile");
    router.push("/admin");
  };

  const handleForgotPassword = async (email) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await requestAdminPasswordReset({ email });
      setSuccessMessage(data.detail || "Password reset link sent.");
      return { ok: true, message: data.detail };
    } catch (error) {
      setErrorMessage(error.message || "Failed to send password reset link.");
      return { ok: false, message: error.message || "Failed to send password reset link." };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingLifecycleChange = async (id, payload) => {
    setIsSubmitting(true);
    try {
      await updateAdminBooking(token, id, payload);
      setSuccessMessage(`Booking updated successfully.`);
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to update booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBookingEmailModal = (booking) => {
    setSelectedBooking(booking);
    setEmailForm({
      subject: `Update for your Sri Sri Wellbeing booking ${booking.reference_code}`,
      message:
        `Your booking for ${booking.therapy_name} is currently marked as ${toTitleCase(booking.status)}.\n\n` +
        `If you have any questions, please reply to this email or contact our team.`,
    });
    setIsEmailModalOpen(true);
  };

  const closeBookingEmailModal = () => {
    setSelectedBooking(null);
    setEmailForm({ subject: "", message: "" });
    setIsEmailModalOpen(false);
  };

  const handleSendBookingEmail = async (event) => {
    event.preventDefault();
    if (!selectedBooking) return;

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await sendAdminBookingEmail(token, selectedBooking.id, emailForm);
      setSuccessMessage(`Email sent to ${selectedBooking.email}.`);
      closeBookingEmailModal();
    } catch (error) {
      setErrorMessage(error.message || "Failed to send booking email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInquiryEmailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setInquiryEmailForm({
      to: inquiry.email || "",
      cc: "",
      bcc: "",
      subject: `Follow up from Sri Sri Wellbeing Chennai`,
      message:
        `Dear ${inquiry.name},\n\n` +
        `Thank you for contacting Sri Sri Wellbeing Chennai about ${inquiry.service_interest || inquiry.topic || "our wellbeing services"}.\n` +
        `Our team will be happy to assist you with the next steps.`,
    });
    setIsInquiryEmailModalOpen(true);
  };

  const closeInquiryEmailModal = () => {
    setSelectedInquiry(null);
    setInquiryEmailForm({ to: "", cc: "", bcc: "", subject: "", message: "" });
    setIsInquiryEmailModalOpen(false);
  };

  const handleSendInquiryEmail = async (event) => {
    event.preventDefault();
    if (!selectedInquiry) return;

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = {
        to: splitEmailInput(inquiryEmailForm.to),
        cc: splitEmailInput(inquiryEmailForm.cc),
        bcc: splitEmailInput(inquiryEmailForm.bcc),
        subject: inquiryEmailForm.subject,
        message: inquiryEmailForm.message,
      };
      await sendAdminInquiryEmail(token, selectedInquiry.id, payload);
      setSuccessMessage(`Enquiry email sent to ${payload.to.join(", ")}.`);
      closeInquiryEmailModal();
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to send enquiry email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestBookingLifecycleChange = (id, payload, message) => {
    openConfirmModal({
      title: "Update booking status",
      subtitle: "Confirm this booking change before continuing.",
      message,
      confirmLabel: "Yes, update",
      tone: "success",
      onConfirm: async () => {
        closeConfirmModal();
        await handleBookingLifecycleChange(id, payload);
      },
    });
  };

  const handleEmailSettingsSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const settings = await updateAdminEmailSettings(token, {
        booking_to_emails: splitEmailInput(emailSettingsForm.booking_to_emails),
        booking_cc_emails: splitEmailInput(emailSettingsForm.booking_cc_emails),
        booking_bcc_emails: splitEmailInput(emailSettingsForm.booking_bcc_emails),
        inquiry_to_emails: splitEmailInput(emailSettingsForm.inquiry_to_emails),
        inquiry_cc_emails: splitEmailInput(emailSettingsForm.inquiry_cc_emails),
        inquiry_bcc_emails: splitEmailInput(emailSettingsForm.inquiry_bcc_emails),
        inquiry_auto_reply_enabled: Boolean(emailSettingsForm.inquiry_auto_reply_enabled),
        inquiry_auto_reply_subject: emailSettingsForm.inquiry_auto_reply_subject,
        inquiry_auto_reply_message: emailSettingsForm.inquiry_auto_reply_message,
      });
      setEmailSettingsForm({
        booking_to_emails: joinEmailList(settings.booking_to_emails),
        booking_cc_emails: joinEmailList(settings.booking_cc_emails),
        booking_bcc_emails: joinEmailList(settings.booking_bcc_emails),
        inquiry_to_emails: joinEmailList(settings.inquiry_to_emails),
        inquiry_cc_emails: joinEmailList(settings.inquiry_cc_emails),
        inquiry_bcc_emails: joinEmailList(settings.inquiry_bcc_emails),
        inquiry_auto_reply_enabled: Boolean(settings.inquiry_auto_reply_enabled),
        inquiry_auto_reply_subject: settings.inquiry_auto_reply_subject || "",
        inquiry_auto_reply_message: settings.inquiry_auto_reply_message || "",
      });
      setSuccessMessage("Email notification settings updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update email settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInquiryStatusChange = async (id, status) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await updateAdminInquiry(token, id, { status });
      setSuccessMessage("Enquiry status updated successfully.");
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to update enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageMetaSettingChange = (id, field, value) => {
    setPageMetaSettings((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handlePageMetaSettingSave = async (item) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const updated = await updateAdminPageMetaSetting(token, item.id, {
        page_key: item.page_key,
        page_path: item.page_path,
        title: item.title,
        description: item.description,
        is_active: Boolean(item.is_active),
      });
      setPageMetaSettings((current) => current.map((entry) => (entry.id === item.id ? updated : entry)));
      setSuccessMessage(`Meta updated for ${item.page_path}.`);
    } catch (error) {
      setErrorMessage(error.message || "Unable to update page meta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestInquiryStatusChange = (id, status) => {
    openConfirmModal({
      title: "Update enquiry status",
      subtitle: "Confirm this enquiry status change before continuing.",
      message: `Change enquiry status to ${toTitleCase(status)}?`,
      confirmLabel: "Yes, update",
      tone: "success",
      onConfirm: async () => {
        closeConfirmModal();
        await handleInquiryStatusChange(id, status);
      },
    });
  };

  const makeSubmitHandler = ({
    editingId,
    type,
    form,
    transformPayload,
    setForm,
    initialForm,
    setEditingId,
    label,
  }) => {
    return async (event) => {
      event.preventDefault();
      return submitEntity({
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
        ...adminCrudModules[type],
      });
    };
  };

  const handleServiceSubmit = handleServiceSubmitInternal();
  function handleServiceSubmitInternal() {
    return makeSubmitHandler({
      editingId: editingServiceId,
      type: "services",
      form: serviceForm,
      transformPayload: (payload) => ({
        ...payload,
        title: normalizeTextValue(payload.title),
        short_description: normalizeTextValue(payload.short_description),
        shortDescription: normalizeTextValue(payload.short_description),
        description: normalizeTextValue(payload.description) || normalizeTextValue(payload.short_description),
        image: normalizeTextValue(payload.image),
        duration: normalizeTextValue(payload.duration),
        rating: payload.rating === "" || payload.rating == null ? null : Number(payload.rating),
        benefits: normalizeListValue(payload.benefits),
      }),
      setForm: setServiceForm,
      initialForm: initialServiceForm,
      setEditingId: setEditingServiceId,
      label: "Service",
    });
  }

  const handleCategorySubmit = handleCategorySubmitInternal();
  function handleCategorySubmitInternal() {
    return makeSubmitHandler({
      editingId: editingCategoryId,
      type: "categories",
      form: categoryForm,
      transformPayload: (payload) => ({
        ...payload,
        slug: normalizeTextValue(payload.slug).toLowerCase(),
        label: normalizeTextValue(payload.label),
        description: normalizeTextValue(payload.description),
      }),
      setForm: setCategoryForm,
      initialForm: initialCategoryForm,
      setEditingId: setEditingCategoryId,
      label: "Category",
    });
  }

  const handleNadiCampSubmit = handleNadiCampSubmitInternal();
  function handleNadiCampSubmitInternal() {
    return makeSubmitHandler({
      editingId: editingNadiCampId,
      type: "nadi-camps",
      form: nadiCampForm,
      transformPayload: (payload) => ({
        ...payload,
        doctor: normalizeTextValue(payload.doctor),
        camp_date: normalizeTextValue(payload.camp_date),
        location: normalizeTextValue(payload.location),
        contact: normalizeTextValue(payload.contact),
        address: normalizeTextValue(payload.address),
        status: normalizeTextValue(payload.status, "active"),
      }),
      setForm: setNadiCampForm,
      initialForm: initialNadiCampForm,
      setEditingId: setEditingNadiCampId,
      label: "Nadi camp",
    });
  }

  const handleTestimonialSubmit = handleTestimonialSubmitInternal();
  function handleTestimonialSubmitInternal() {
    return makeSubmitHandler({
      editingId: editingTestimonialId,
      type: "testimonials",
      form: testimonialForm,
      transformPayload: (payload) => ({
        ...payload,
        name: normalizeTextValue(payload.name),
        category: normalizeTextValue(payload.category, initialTestimonialForm.category).toLowerCase(),
        review: normalizeTextValue(payload.review),
      }),
      setForm: setTestimonialForm,
      initialForm: initialTestimonialForm,
      setEditingId: setEditingTestimonialId,
      label: "Testimonial",
    });
  }

  const handleRelaxationTherapySubmit = handleRelaxationTherapySubmitInternal();
  function handleRelaxationTherapySubmitInternal() {
    return makeSubmitHandler({
      editingId: editingRelaxationTherapyId,
      type: "relaxation-therapies",
      form: relaxationTherapyForm,
      transformPayload: (payload) => ({
        ...payload,
        title: normalizeTextValue(payload.title),
        duration: normalizeTextValue(payload.duration),
        short_description: normalizeTextValue(payload.short_description),
        shortDescription: normalizeTextValue(payload.short_description),
        details: normalizeTextValue(payload.details) || normalizeTextValue(payload.short_description),
        image: normalizeTextValue(payload.image),
        benefits: normalizeListValue(payload.benefits),
      }),
      setForm: setRelaxationTherapyForm,
      initialForm: initialRelaxationTherapyForm,
      setEditingId: setEditingRelaxationTherapyId,
      label: "Relaxation therapy",
    });
  }

  const handleTherapistSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = {
        ...therapistForm,
        experience_years: Number(therapistForm.experience_years || 0),
        languages: therapistForm.languages
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        specialties: therapistForm.specialties
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      if (editingTherapistId) {
        await updateAdminTherapist(token, editingTherapistId, payload);
      } else {
        await createAdminTherapist(token, payload);
      }
      setSuccessMessage(editingTherapistId ? "Therapist updated." : "Therapist created.");
      closeTherapistModal();
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save therapist.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminUserSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = {
        ...adminUserForm,
        therapist_id: adminUserForm.therapist_id ? Number(adminUserForm.therapist_id) : null,
      };
      if (editingAdminUserId) {
        await updateAdminUser(token, editingAdminUserId, payload);
      } else {
        await createAdminUser(token, payload);
      }
      setSuccessMessage(editingAdminUserId ? "Team login updated." : "Team login created.");
      closeAdminUserModal();
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save team login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTeamSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const therapistPayload = {
        full_name: teamForm.full_name,
        role_label: teamForm.role_label,
        qualification: teamForm.qualification,
        experience_years: Number(teamForm.experience_years || 0),
        languages: teamForm.languages
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        image: teamForm.image,
        email: teamForm.email,
        phone: teamForm.phone,
        specialties: teamForm.specialties
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        bio: teamForm.bio,
        is_active: teamForm.is_active,
      };

      let therapistId = editingTherapistId;
      if (editingTherapistId) {
        await updateAdminTherapist(token, editingTherapistId, therapistPayload);
      } else {
        const createdTherapist = await createAdminTherapist(token, therapistPayload);
        therapistId = createdTherapist.id;
      }

      if (teamForm.create_login && therapistId) {
        const loginPayload = {
          email: teamForm.login_email,
          full_name: teamForm.full_name,
          password: teamForm.login_password,
          role: teamForm.login_role,
          therapist_id: therapistId,
          is_active: teamForm.login_is_active,
          send_welcome_email: teamForm.send_welcome_email,
        };

        if (teamForm.linked_user_id) {
          if (!loginPayload.password) {
            delete loginPayload.password;
          }
          await updateAdminUser(token, teamForm.linked_user_id, loginPayload);
        } else {
          await createAdminUser(token, loginPayload);
        }
      } else if (teamForm.linked_user_id) {
        await deleteAdminUser(token, teamForm.linked_user_id);
      }

      setSuccessMessage(editingTherapistId ? "Team member updated." : "Team member created.");
      closeTeamModal();
      refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save team member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (deleteFn, id, label) => {
    openConfirmModal({
      title: `Delete ${label}`,
      subtitle: "This action removes the selected item from the admin system.",
      message: `Are you sure you want to delete this ${label.toLowerCase()}? This action cannot be undone.`,
      confirmLabel: "Yes, delete",
      tone: "danger",
      onConfirm: async () => {
        closeConfirmModal();
        try {
          await deleteFn(token, id);
          setSuccessMessage(`${label} deleted successfully.`);
          refresh();
        } catch (error) {
          setErrorMessage(error.message || `Failed to delete ${label}.`);
        }
      },
    });
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategoryId(null);
    setCategoryForm(initialCategoryForm);
  };

  const closeNadiCampModal = () => {
    setIsNadiCampModalOpen(false);
    setEditingNadiCampId(null);
    setNadiCampForm(initialNadiCampForm);
  };

  const closeTestimonialModal = () => {
    setIsTestimonialModalOpen(false);
    setEditingTestimonialId(null);
    setTestimonialForm(initialTestimonialForm);
  };

  const openServiceCreateModal = () => {
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
    setIsServiceModalOpen(true);
  };

  const openCategoryCreateModal = () => {
    setEditingCategoryId(null);
    setCategoryForm(initialCategoryForm);
    setIsCategoryModalOpen(true);
  };

  const openNadiCampCreateModal = () => {
    setEditingNadiCampId(null);
    setNadiCampForm(initialNadiCampForm);
    setIsNadiCampModalOpen(true);
  };

  const openTestimonialCreateModal = () => {
    setEditingTestimonialId(null);
    setTestimonialForm(initialTestimonialForm);
    setIsTestimonialModalOpen(true);
  };

  const openServiceEditModal = (item) => {
    setEditingServiceId(item.id);
    setServiceForm({
      title: normalizeTextValue(item.title),
      category: normalizeContentCategory(item.category, initialServiceForm.category),
      short_description: normalizeTextValue(item.short_description ?? item.shortDescription),
      description: normalizeTextValue(item.description),
      benefits: normalizeListValue(item.benefits).length ? [...normalizeListValue(item.benefits)] : [""],
      image: normalizeTextValue(item.image),
      duration: normalizeTextValue(item.duration),
      rating: item.rating ?? "",
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    });
    setIsServiceModalOpen(true);
  };

  const openCategoryEditModal = (item) => {
    setEditingCategoryId(item.id);
    setCategoryForm({
      slug: normalizeTextValue(item.slug),
      label: normalizeTextValue(item.label),
      description: normalizeTextValue(item.description),
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    });
    setIsCategoryModalOpen(true);
  };

  const openNadiCampEditModal = (item) => {
    setEditingNadiCampId(item.id);
    setNadiCampForm({
      doctor: normalizeTextValue(item.doctor),
      camp_date: normalizeTextValue(item.camp_date),
      location: normalizeTextValue(item.location),
      contact: normalizeTextValue(item.contact),
      address: normalizeTextValue(item.address),
      status: normalizeTextValue(item.status, initialNadiCampForm.status),
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    });
    setIsNadiCampModalOpen(true);
  };

  const openTestimonialEditModal = (item) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      name: normalizeTextValue(item.name),
      category: normalizeTextValue(item.category, initialTestimonialForm.category).toLowerCase(),
      review: normalizeTextValue(item.review),
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    });
    setIsTestimonialModalOpen(true);
  };

  const updateServiceBenefit = (index, value) => {
    setServiceForm((current) => ({
      ...current,
      benefits: current.benefits.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  };

  const addServiceBenefit = () => {
    setServiceForm((current) => ({
      ...current,
      benefits: [...current.benefits, ""],
    }));
  };

  const removeServiceBenefit = (index) => {
    setServiceForm((current) => {
      const nextBenefits = current.benefits.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        benefits: nextBenefits.length ? nextBenefits : [""],
      };
    });
  };

  const closeRelaxationTherapyModal = () => {
    setIsRelaxationTherapyModalOpen(false);
    setEditingRelaxationTherapyId(null);
    setRelaxationTherapyForm(initialRelaxationTherapyForm);
  };

  const closeTherapistModal = () => {
    setIsTherapistModalOpen(false);
    setEditingTherapistId(null);
    setTherapistForm(initialTherapistForm);
  };

  const openTherapistCreateModal = () => {
    setEditingTherapistId(null);
    setTherapistForm(initialTherapistForm);
    setIsTherapistModalOpen(true);
  };

  const openTherapistEditModal = (item) => {
    setEditingTherapistId(item.id);
    setTherapistForm({
      full_name: item.full_name,
      role_label: item.role_label || "Therapist",
      qualification: item.qualification || "",
      experience_years: item.experience_years || 0,
      languages: (item.languages || []).join("\n"),
      image: item.image || "/images/doctor-placeholder.png",
      email: item.email,
      phone: item.phone,
      specialties: (item.specialties || []).join("\n"),
      bio: item.bio,
      is_active: item.is_active,
    });
    setIsTherapistModalOpen(true);
  };

  const closeAdminUserModal = () => {
    setIsAdminUserModalOpen(false);
    setEditingAdminUserId(null);
    setAdminUserForm(initialAdminUserForm);
  };

  const closeTeamModal = () => {
    setIsTeamModalOpen(false);
    setEditingTherapistId(null);
    setEditingAdminUserId(null);
    setTeamForm(initialTeamForm);
  };

  const openTeamCreateModal = () => {
    setEditingTherapistId(null);
    setEditingAdminUserId(null);
    setTeamForm(initialTeamForm);
    setIsTeamModalOpen(true);
  };

  const openTeamEditModal = (therapist) => {
    const linkedUser = teamLogins.find((item) => item.therapist_id === therapist.id) || null;
    setEditingTherapistId(therapist.id);
    setEditingAdminUserId(linkedUser?.id || null);
    setTeamForm({
      full_name: therapist.full_name,
      role_label: therapist.role_label || "Therapist",
      qualification: therapist.qualification || "",
      experience_years: therapist.experience_years || 0,
      languages: (therapist.languages || []).join("\n"),
      image: therapist.image || "/images/doctor-placeholder.png",
      email: therapist.email,
      phone: therapist.phone,
      specialties: (therapist.specialties || []).join("\n"),
      bio: therapist.bio || "",
      is_active: therapist.is_active,
      create_login: Boolean(linkedUser),
      login_email: linkedUser?.email || therapist.email,
      login_password: "",
      login_role: linkedUser?.role || "therapist",
      login_is_active: linkedUser?.is_active ?? true,
      send_welcome_email: false,
      linked_user_id: linkedUser?.id || null,
    });
    setIsTeamModalOpen(true);
  };

  const openAdminUserCreateModal = () => {
    setEditingAdminUserId(null);
    setAdminUserForm(initialAdminUserForm);
    setIsAdminUserModalOpen(true);
  };

  const openAdminUserEditModal = (item) => {
    setEditingAdminUserId(item.id);
    setAdminUserForm({
      email: item.email,
      full_name: item.full_name,
      password: "",
      role: item.role,
      therapist_id: item.therapist_id ? String(item.therapist_id) : "",
      is_active: item.is_active,
      send_welcome_email: false,
    });
    setIsAdminUserModalOpen(true);
  };

  const openRelaxationTherapyCreateModal = () => {
    setEditingRelaxationTherapyId(null);
    setRelaxationTherapyForm(initialRelaxationTherapyForm);
    setIsRelaxationTherapyModalOpen(true);
  };

  const openRelaxationTherapyEditModal = (item) => {
    setEditingRelaxationTherapyId(item.id);
    setRelaxationTherapyForm({
      title: normalizeTextValue(item.title),
      category: normalizeContentCategory(item.category, initialRelaxationTherapyForm.category),
      duration: normalizeTextValue(item.duration),
      short_description: normalizeTextValue(item.short_description ?? item.shortDescription),
      details: normalizeTextValue(item.details),
      benefits: normalizeListValue(item.benefits).length ? [...normalizeListValue(item.benefits)] : [""],
      image: normalizeTextValue(item.image),
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    });
    setIsRelaxationTherapyModalOpen(true);
  };

  const updateRelaxationBenefit = (index, value) => {
    setRelaxationTherapyForm((current) => ({
      ...current,
      benefits: current.benefits.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  };

  const addRelaxationBenefit = () => {
    setRelaxationTherapyForm((current) => ({
      ...current,
      benefits: [...current.benefits, ""],
    }));
  };

  const removeRelaxationBenefit = (index) => {
    setRelaxationTherapyForm((current) => {
      const nextBenefits = current.benefits.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        benefits: nextBenefits.length ? nextBenefits : [""],
      };
    });
  };

  const tabCounts = {
    inquiries: inquiries.length,
    bookings: bookings.length,
    services: services.length,
    testimonials: testimonials.length,
    categories: categories.length,
    "nadi-camps": nadiCamps.length,
    team: therapists.length + adminUsers.length,
    "relaxation-therapies": relaxationTherapies.length,
  };

  return (
    <AdminLayout
      adminSections={availableSections}
      currentSection={resolvedSection}
      handleLogout={handleLogout}
      tabCounts={tabCounts}
      isInitializing={isInitializing}
      token={token}
      userProfile={userProfile}
      apiBaseUrl={API_BASE_URL}
      isLoading={isLoading}
      lastLoadedAt={lastLoadedAt}
      onRefresh={refresh}
    >
      {!token ? (
        <AdminLogin
          handleLogin={handleLogin}
          handleForgotPassword={handleForgotPassword}
          credentials={credentials}
          setCredentials={setCredentials}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : (
        <div ref={contentRef} className="animate-in fade-in duration-700">
          <ToastStack toasts={toasts} onDismiss={dismissToast} />
          <FormModal
            open={Boolean(confirmAction)}
            title={confirmAction?.title || "Confirm action"}
            subtitle={confirmAction?.subtitle || "Please confirm this action before continuing."}
            onClose={closeConfirmModal}
          >
            <div className="grid gap-6">
              <div
                className={`rounded-[1.4rem] px-5 py-4 text-sm leading-6 ${
                  confirmAction?.tone === "success"
                    ? "border border-[#cfe1d8] bg-[#f4faf6] text-[#19564f]"
                    : "border border-[#f0d6d1] bg-[#fff7f5] text-[#8c4a3d]"
                }`}
              >
                {confirmAction?.message || "Are you sure you want to continue?"}
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                <button type="button" onClick={closeConfirmModal} className={secondaryButtonClass}>
                  No
                </button>
                <button
                  type="button"
                  onClick={() => confirmAction?.onConfirm?.()}
                  className={`inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white ${
                    confirmAction?.tone === "success"
                      ? "bg-[#1f6b5c] hover:bg-[#175245]"
                      : "border border-[#efb8ac] bg-[#b35342] hover:bg-[#9f3e2f]"
                  }`}
                >
                  {confirmAction?.confirmLabel || "Yes"}
                </button>
              </div>
            </div>
          </FormModal>
          <div className="flex flex-col gap-5">
            {/* Page Header Banner */}
            <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">
                    {effectiveSectionMeta.eyebrow}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                    {effectiveSectionMeta.group || "Admin"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#0f172a]">{effectiveSectionMeta.title}</h1>
                <p className="mt-1 max-w-2xl text-sm text-[#64748b]">{effectiveSectionMeta.description}</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <div className="flex flex-col items-center rounded-xl border border-[#f0faf5] bg-[#f8fdfb] px-5 py-3 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Action Needed</span>
                  <span className="mt-1 text-2xl font-bold text-[#1a6b4a]">{newInquiries + pendingBookings}</span>
                </div>
                <div className="flex flex-col items-center rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-5 py-3 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Last Sync</span>
                  <span className="mt-1 text-2xl font-bold text-[#1e293b]">{lastLoadedAt ? formatTime(lastLoadedAt) : "--"}</span>
                </div>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex flex-col justify-between rounded-xl border border-[#1a6b4a] bg-[#1a6b4a] p-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">New Enquiries</p>
                <p className="mt-3 text-4xl font-bold">{newInquiries}</p>
                <p className="mt-2 text-xs text-white/60">Awaiting follow-up</p>
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Total Bookings</p>
                <p className="mt-3 text-4xl font-bold text-[#0f172a]">{bookings.length}</p>
                <p className="mt-2 text-xs text-[#94a3b8]">All time</p>
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-[#fef3c7] bg-[#fffbeb] p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#92400e]">Pending Approval</p>
                <p className="mt-3 text-4xl font-bold text-[#92400e]">{pendingBookings}</p>
                <p className="mt-2 text-xs text-[#92400e]/70">Needs review</p>
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-[#dcfce7] bg-[#f0fdf4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#166534]">Confirmed Sessions</p>
                <p className="mt-3 text-4xl font-bold text-[#166534]">{confirmedBookings}</p>
                <p className="mt-2 text-xs text-[#166534]/70">Ready to go</p>
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Total Content</p>
                <p className="mt-3 text-4xl font-bold text-[#0f172a]">{countActive(services) + countActive(relaxationTherapies) + countActive(testimonials)}</p>
                <p className="mt-2 text-xs text-[#94a3b8]">Published items</p>
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0faf5] text-base">&#128233;</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">CRM Queue</p>
                  <p className="text-xl font-bold text-[#0f172a]">{inquiries.length} <span className="text-xs font-normal text-[#64748b]">lead enquiries</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0faf5] text-base">&#10024;</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Service API</p>
                  <p className="text-xl font-bold text-[#0f172a]">{services.length} <span className="text-xs font-normal text-[#64748b]">active services</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0faf5] text-base">&#11088;</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Testimonials</p>
                  <p className="text-xl font-bold text-[#0f172a]">{testimonials.length} <span className="text-xs font-normal text-[#64748b]">reviews</span></p>
                </div>
              </div>
            </div>


            {/* Main Content Area */}
            <div>
              {resolvedSection === "inquiries" ? (
                <InquiriesPanel
                  inquiries={inquiries}
                  inquiryStatusFilter={inquiryStatusFilter}
                  setInquiryStatusFilter={setInquiryStatusFilter}
                  inquirySourceFilter={inquirySourceFilter}
                  setInquirySourceFilter={setInquirySourceFilter}
                  inquirySources={inquirySources}
                  handleInquiryStatusChange={handleInquiryStatusChange}
                  handleDelete={handleDelete}
                  openInquiryEmailModal={openInquiryEmailModal}
                  downloadInquiriesCsv={downloadInquiriesCsv}
                />
              ) : null}

              {resolvedSection === "dashboard" ? (
                <DashboardPanel
                  bookings={bookings}
                  therapists={therapists}
                  role={userProfile?.role}
                />
              ) : null}

                {resolvedSection === "bookings" ? (
                  <BookingsPanel
                  bookings={bookings}
                    isLoading={isLoading}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    therapists={therapists}
                    canAssignTherapist={!isLimitedBookingRole}
                    role={userProfile?.role}
                    handleBookingLifecycleChange={handleBookingLifecycleChange}
                    requestBookingLifecycleChange={requestBookingLifecycleChange}
                    openBookingEmailModal={openBookingEmailModal}
                    handleDelete={handleDelete}
                  />
              ) : null}

              {resolvedSection === "services" ? (
                <>
                <EntityPanel
                  eyebrow="Content API"
                  title={editingServiceId ? "Refine Service" : "New Service"}
                  subtitle="Manage service records for the main precision therapies section."
                  hideForm
                  actionLabel="Add Service"
                  onAction={openServiceCreateModal}
                  saveLabel="Service"
                  listingTitle="Service Catalog"
                  listingSubtitle={`Showing ${filteredServices.length} of ${services.length} services.`}
                  items={filteredServices}
                  headerContent={(
                    <div className="grid gap-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-[#dbe7e1] bg-[linear-gradient(180deg,#fbfdfc,#f4faf6)] p-4">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d948c]">Category management</p>
                          <p className="mt-2 text-sm text-[#5f726c]">
                            Create category tabs here, then use them in services and therapy records.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={openCategoryCreateModal}
                            className={secondaryButtonClass}
                          >
                            Add Category
                          </button>
                          <button
                            type="button"
                            onClick={() => router.push("/admin/categories")}
                            className={primaryButtonClass}
                          >
                            Open Category CRUD
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {categoryOptions.map((option) => {
                          const categoryItem = categories.find((item) => item.slug === option.value);
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setServiceCategoryFilter(option.value);
                                if (categoryItem) {
                                  openCategoryEditModal(categoryItem);
                                }
                              }}
                              className="rounded-[1.3rem] border border-[#dbe7e1] bg-white px-4 py-4 text-left transition hover:bg-[#f8fbf9]"
                            >
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d948c]">
                                {option.label}
                              </p>
                              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#18332e]">
                                {serviceCategoryCounts[option.value] || 0}
                              </p>
                              <p className="mt-2 text-xs leading-5 text-[#60746e]">
                                {categoryItem?.description || `Filter services in ${option.label}.`}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setServiceCategoryFilter("all")}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            serviceCategoryFilter === "all"
                              ? "border-[#1f6b5c] bg-[#eef8f4] text-[#19564f]"
                              : "border-[#dbe7e1] bg-white text-[#4e635d] hover:bg-[#f8fbf9]"
                          }`}
                        >
                          All ({serviceCategoryCounts.all || 0})
                        </button>
                        {categoryOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setServiceCategoryFilter(option.value)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              serviceCategoryFilter === option.value
                                ? "border-[#1f6b5c] bg-[#eef8f4] text-[#19564f]"
                                : "border-[#dbe7e1] bg-white text-[#4e635d] hover:bg-[#f8fbf9]"
                            }`}
                          >
                            {option.label} ({serviceCategoryCounts[option.value] || 0})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  renderItem={(item) => (
                    <RecordCard
                      key={item.id}
                      title={item.title}
                      meta={`${toTitleCase(item.category || "main")} | ${item.duration || "No duration"} | ${item.rating ? `${Number(item.rating).toFixed(1)} rating` : "No rating"} | Order ${item.sort_order} | ${item.is_active ? "Published" : "Draft"}`}
                      body={`${item.short_description || item.shortDescription || ""}\n\n${item.description || ""}\n\nBenefits:\n${normalizeListValue(item.benefits).map((benefit) => `- ${benefit}`).join("\n") || "- Not added"}`}
                      extra={item.image}
                      onEdit={() => openServiceEditModal(item)}
                      onDelete={() => handleDelete(deleteAdminService, item.id, "Service")}
                    />
                  )}
                />
                <FormModal
                  open={isServiceModalOpen}
                  title={editingServiceId ? "Edit service" : "Add service"}
                  subtitle="Create or update a service record for the homepage and backend-driven content flow."
                  onClose={closeServiceModal}
                >
                  <form onSubmit={async (event) => {
                    const success = await handleServiceSubmit(event);
                    if (success) closeServiceModal();
                  }} className="grid gap-5">
                    <Field label="Service Title">
                      <input
                        value={serviceForm.title}
                        onChange={(event) =>
                          setServiceForm((current) => ({ ...current, title: event.target.value }))
                        }
                        className={inputClass}
                        required
                      />
                    </Field>
                    <Field label="Category">
                      <select
                        value={serviceForm.category}
                        onChange={(event) =>
                          setServiceForm((current) => ({ ...current, category: event.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Image Asset">
                      <input
                        value={serviceForm.image}
                        onChange={(event) =>
                          setServiceForm((current) => ({ ...current, image: event.target.value }))
                        }
                        className={inputClass}
                        required
                      />
                    </Field>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Therapy Minutes">
                        <input
                          value={serviceForm.duration}
                          onChange={(event) =>
                            setServiceForm((current) => ({ ...current, duration: event.target.value }))
                          }
                          className={inputClass}
                          placeholder="45 mins"
                        />
                      </Field>
                      <Field label="Rating">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={serviceForm.rating}
                          onChange={(event) =>
                            setServiceForm((current) => ({ ...current, rating: event.target.value }))
                          }
                          className={inputClass}
                          placeholder="4.8"
                        />
                      </Field>
                    </div>
                    <Field label="Display Priority">
                      <input
                        type="number"
                        min="0"
                        value={serviceForm.sort_order}
                        onChange={(event) =>
                          setServiceForm((current) => ({
                            ...current,
                            sort_order: event.target.value,
                          }))
                        }
                        className={inputClass}
                        required
                      />
                    </Field>
                    <Field label="Short Description">
                      <textarea
                        value={serviceForm.short_description}
                        onChange={(event) =>
                          setServiceForm((current) => ({
                            ...current,
                            short_description: event.target.value,
                          }))
                        }
                        className={textAreaClass}
                        rows="3"
                        placeholder="Add a short summary, or leave this blank and fill Public Description below."
                      />
                    </Field>
                    <Field label="Public Description">
                      <textarea
                        value={serviceForm.description}
                        onChange={(event) =>
                          setServiceForm((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                        className={textAreaClass}
                        rows="6"
                        placeholder="Add the full description, or leave this blank and use Short Description above."
                      />
                    </Field>
                    <Field label="Benefits">
                      <div className="grid gap-3">
                        {serviceForm.benefits.map((benefit, index) => (
                          <div key={`service-benefit-${index}`} className="flex gap-3">
                            <input
                              value={benefit}
                              onChange={(event) => updateServiceBenefit(index, event.target.value)}
                              className={inputClass}
                              placeholder={`Benefit ${index + 1}`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeServiceBenefit(index)}
                              className={secondaryButtonClass}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={addServiceBenefit} className={secondaryButtonClass}>
                          Add Benefit
                        </button>
                      </div>
                    </Field>
                    <ToggleRow
                      checked={serviceForm.is_active}
                      onChange={(value) =>
                        setServiceForm((current) => ({ ...current, is_active: value }))
                      }
                      label="Publish to public website"
                    />
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                        {isSubmitting ? "Saving..." : editingServiceId ? "Update Service" : "Create Service"}
                      </button>
                      <button type="button" onClick={closeServiceModal} className={secondaryButtonClass}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </FormModal>
                </>
              ) : null}

              {resolvedSection === "testimonials" ? (
                <>
                  <EntityPanel
                    eyebrow="Content API"
                    title={editingTestimonialId ? "Edit Testimonial" : "New Testimonial"}
                    subtitle="Manage page-specific testimonials shown on the public website."
                    hideForm
                    actionLabel="Add Testimonial"
                    onAction={openTestimonialCreateModal}
                    saveLabel="Testimonial"
                    listingTitle="Testimonial Library"
                    listingSubtitle={`Showing ${filteredTestimonials.length} of ${testimonials.length} testimonials.`}
                    items={filteredTestimonials}
                    headerContent={(
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setTestimonialCategoryFilter("all")}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            testimonialCategoryFilter === "all"
                              ? "border-[#1f6b5c] bg-[#eef8f4] text-[#19564f]"
                              : "border-[#dbe7e1] bg-white text-[#4e635d] hover:bg-[#f8fbf9]"
                          }`}
                        >
                          All ({testimonialCategoryCounts.all || 0})
                        </button>
                        {reviewCategoryOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setTestimonialCategoryFilter(option.value)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              testimonialCategoryFilter === option.value
                                ? "border-[#1f6b5c] bg-[#eef8f4] text-[#19564f]"
                                : "border-[#dbe7e1] bg-white text-[#4e635d] hover:bg-[#f8fbf9]"
                            }`}
                          >
                            {option.label} ({testimonialCategoryCounts[option.value] || 0})
                          </button>
                        ))}
                      </div>
                    )}
                    renderItem={(item) => (
                      <RecordCard
                        key={item.id}
                        title={item.name}
                        meta={`${toTitleCase(item.category || "home")} | Order ${item.sort_order} | ${item.is_active ? "Published" : "Draft"}`}
                        body={item.review || "No review added"}
                        extra={`Category: ${item.category || "home"}`}
                        onEdit={() => openTestimonialEditModal(item)}
                        onDelete={() => handleDelete(deleteAdminTestimonial, item.id, "Testimonial")}
                      />
                    )}
                  />
                  <FormModal
                    open={isTestimonialModalOpen}
                    title={editingTestimonialId ? "Edit testimonial" : "Add testimonial"}
                    subtitle="Create or update a testimonial for category-based page sections."
                    onClose={closeTestimonialModal}
                  >
                    <form
                      onSubmit={async (event) => {
                        const success = await handleTestimonialSubmit(event);
                        if (success) closeTestimonialModal();
                      }}
                      className="grid gap-5"
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Person Name">
                          <input
                            value={testimonialForm.name}
                            onChange={(event) =>
                              setTestimonialForm((current) => ({ ...current, name: event.target.value }))
                            }
                            className={inputClass}
                            required
                          />
                        </Field>
                        <Field label="Page Category">
                          <select
                            value={testimonialForm.category}
                            onChange={(event) =>
                              setTestimonialForm((current) => ({ ...current, category: event.target.value }))
                            }
                            className={selectClass}
                            required
                          >
                            {reviewCategoryOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <Field label="Review">
                        <textarea
                          value={testimonialForm.review}
                          onChange={(event) =>
                            setTestimonialForm((current) => ({ ...current, review: event.target.value }))
                          }
                          className={textAreaClass}
                          rows="6"
                          required
                        />
                      </Field>
                      <Field label="Sort Order">
                        <input
                          type="number"
                          min="0"
                          value={testimonialForm.sort_order}
                          onChange={(event) =>
                            setTestimonialForm((current) => ({ ...current, sort_order: event.target.value }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                      <ToggleRow
                        checked={testimonialForm.is_active}
                        onChange={(value) =>
                          setTestimonialForm((current) => ({ ...current, is_active: value }))
                        }
                        label="Publish to public website"
                      />
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                          {isSubmitting ? "Saving..." : editingTestimonialId ? "Update Testimonial" : "Create Testimonial"}
                        </button>
                        <button type="button" onClick={closeTestimonialModal} className={secondaryButtonClass}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </FormModal>
                </>
              ) : null}

              {resolvedSection === "categories" ? (
                <>
                  <EntityPanel
                    eyebrow="Content API"
                    title={editingCategoryId ? "Edit Category" : "New Category"}
                    subtitle="Create and maintain frontend content categories used in service and therapy modules."
                    hideForm
                    actionLabel="Add Category"
                    onAction={openCategoryCreateModal}
                    saveLabel="Category"
                    listingTitle="Category Catalog"
                    listingSubtitle={`Total of ${categories.length} categories managed.`}
                    items={categories}
                    renderItem={(item) => (
                      <RecordCard
                        key={item.id}
                        title={item.label}
                        meta={`${item.slug} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Inactive"}`}
                        body={item.description || "No description added"}
                        extra={`Slug: ${item.slug}`}
                        onEdit={() => openCategoryEditModal(item)}
                        onDelete={() => handleDelete(deleteAdminCategory, item.id, "Category")}
                      />
                    )}
                  />
                  <FormModal
                    open={isCategoryModalOpen}
                    title={editingCategoryId ? "Edit category" : "Add category"}
                    subtitle="Create or update a content category shown in admin filters and dropdowns."
                    onClose={closeCategoryModal}
                  >
                    <form
                      onSubmit={async (event) => {
                        const success = await handleCategorySubmit(event);
                        if (success) closeCategoryModal();
                      }}
                      className="grid gap-5"
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Category Label">
                          <input
                            value={categoryForm.label}
                            onChange={(event) =>
                              setCategoryForm((current) => ({ ...current, label: event.target.value }))
                            }
                            className={inputClass}
                            required
                          />
                        </Field>
                        <Field label="Slug">
                          <input
                            value={categoryForm.slug}
                            onChange={(event) =>
                              setCategoryForm((current) => ({ ...current, slug: event.target.value }))
                            }
                            className={inputClass}
                            placeholder="main"
                            required
                          />
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea
                          value={categoryForm.description}
                          onChange={(event) =>
                            setCategoryForm((current) => ({ ...current, description: event.target.value }))
                          }
                          className={textAreaClass}
                          rows="4"
                        />
                      </Field>
                      <Field label="Sort Order">
                        <input
                          type="number"
                          min="0"
                          value={categoryForm.sort_order}
                          onChange={(event) =>
                            setCategoryForm((current) => ({ ...current, sort_order: event.target.value }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                      <ToggleRow
                        checked={categoryForm.is_active}
                        onChange={(value) => setCategoryForm((current) => ({ ...current, is_active: value }))}
                        label="Active category"
                      />
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                          {isSubmitting ? "Saving..." : editingCategoryId ? "Update Category" : "Create Category"}
                        </button>
                        <button type="button" onClick={closeCategoryModal} className={secondaryButtonClass}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </FormModal>
                </>
              ) : null}

              {resolvedSection === "nadi-camps" ? (
                <>
                  <EntityPanel
                    eyebrow="Content API"
                    title={editingNadiCampId ? "Edit Nadi Camp" : "New Nadi Camp"}
                    subtitle="Manage doctor visits, camp dates, locations, contacts, and lifecycle status for upcoming Nadi camps."
                    hideForm
                    actionLabel="Add Nadi Camp"
                    onAction={openNadiCampCreateModal}
                    saveLabel="Nadi Camp"
                    listingTitle="Upcoming Nadi Camps"
                    listingSubtitle={`Total of ${nadiCamps.length} camp records managed.`}
                    items={nadiCamps}
                    renderItem={(item) => (
                      <RecordCard
                        key={item.id}
                        title={item.doctor}
                        meta={`${toTitleCase(item.status || "active")} | ${item.location} | Order ${item.sort_order} | ${item.is_active ? "Visible" : "Hidden"}`}
                        body={`Date: ${item.camp_date}\nContact: ${item.contact}\n\nAddress:\n${item.address}`}
                        extra={item.location}
                        onEdit={() => openNadiCampEditModal(item)}
                        onDelete={() => handleDelete(deleteAdminNadiCamp, item.id, "Nadi camp")}
                      />
                    )}
                  />
                  <FormModal
                    open={isNadiCampModalOpen}
                    title={editingNadiCampId ? "Edit Nadi camp" : "Add Nadi camp"}
                    subtitle="Create or update a public Nadi camp listing."
                    onClose={closeNadiCampModal}
                  >
                    <form onSubmit={async (event) => {
                      const success = await handleNadiCampSubmit(event);
                      if (success) closeNadiCampModal();
                    }} className="grid gap-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Doctor">
                          <input value={nadiCampForm.doctor} onChange={(event) => setNadiCampForm((current) => ({ ...current, doctor: event.target.value }))} className={inputClass} required />
                        </Field>
                        <Field label="Camp Date">
                          <input value={nadiCampForm.camp_date} onChange={(event) => setNadiCampForm((current) => ({ ...current, camp_date: event.target.value }))} className={inputClass} placeholder="20/05/2026" required />
                        </Field>
                      </div>
                      <Field label="Location">
                        <input value={nadiCampForm.location} onChange={(event) => setNadiCampForm((current) => ({ ...current, location: event.target.value }))} className={inputClass} required />
                      </Field>
                      <Field label="Contact">
                        <input value={nadiCampForm.contact} onChange={(event) => setNadiCampForm((current) => ({ ...current, contact: event.target.value }))} className={inputClass} required />
                      </Field>
                      <Field label="Address">
                        <textarea value={nadiCampForm.address} onChange={(event) => setNadiCampForm((current) => ({ ...current, address: event.target.value }))} className={textAreaClass} rows="4" required />
                      </Field>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Camp Status">
                          <select value={nadiCampForm.status} onChange={(event) => setNadiCampForm((current) => ({ ...current, status: event.target.value }))} className={selectClass} required>
                            {nadiCampStatusOptions.map((option) => (
                              <option key={option} value={option}>
                                {toTitleCase(option)}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Sort Order">
                          <input type="number" min="0" value={nadiCampForm.sort_order} onChange={(event) => setNadiCampForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} required />
                        </Field>
                      </div>
                      <ToggleRow
                        checked={nadiCampForm.is_active}
                        onChange={(value) => setNadiCampForm((current) => ({ ...current, is_active: value }))}
                        label="Publish to public website"
                      />
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                          {isSubmitting ? "Saving..." : editingNadiCampId ? "Update Nadi Camp" : "Create Nadi Camp"}
                        </button>
                        <button type="button" onClick={closeNadiCampModal} className={secondaryButtonClass}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </FormModal>
                </>
              ) : null}

              {resolvedSection === "team" ? (
                <>
                  <EntityPanel
                    eyebrow="Team"
                    title={editingTherapistId ? "Edit Team Member" : "Add Team Member"}
                    subtitle="Manage profile details, bio, and login access together in one single form."
                    hideForm
                    actionLabel="Add Team Member"
                    onAction={openTeamCreateModal}
                    saveLabel="Team Member"
                    listingTitle="Team Directory"
                    listingSubtitle={`${therapists.length} team profiles with ${teamLogins.length} linked logins.`}
                    items={therapists}
                    renderItem={(item) => {
                      const linkedUser = teamLogins.find((login) => login.therapist_id === item.id);
                      return (
                        <RecordCard
                          key={item.id}
                          title={item.full_name}
                          meta={`${item.role_label || "Therapist"} | ${linkedUser ? linkedUser.role : "No login"} | ${item.is_active ? "Active" : "Inactive"}`}
                          body={`${item.qualification || "Qualification not added"}\n${item.experience_years || 0} years experience\nLanguages: ${(item.languages || []).join(", ") || "Not added"}\nPhone: ${item.phone}\nEmail: ${item.email}\n\nSpecialties: ${(item.specialties || []).join(", ") || "Not added"}\n\nBio: ${item.bio || "No bio added"}`}
                          extra={item.image}
                          onEdit={() => openTeamEditModal(item)}
                          onDelete={() => handleDelete(deleteAdminTherapist, item.id, "Team member")}
                        />
                      );
                    }}
                  />
                  <FormModal
                    open={isTeamModalOpen}
                    title={editingTherapistId ? "Edit team member" : "Add team member"}
                    subtitle="One form for profile, bio, and login access."
                    onClose={closeTeamModal}
                  >
                    <form onSubmit={handleTeamSubmit} className="grid gap-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Full Name"><input value={teamForm.full_name} onChange={(event) => setTeamForm((current) => ({ ...current, full_name: event.target.value }))} className={inputClass} required /></Field>
                        <Field label="Role Label"><input value={teamForm.role_label} onChange={(event) => setTeamForm((current) => ({ ...current, role_label: event.target.value }))} className={inputClass} required /></Field>
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Qualification"><input value={teamForm.qualification} onChange={(event) => setTeamForm((current) => ({ ...current, qualification: event.target.value }))} className={inputClass} required /></Field>
                        <Field label="Experience Years"><input type="number" min="0" value={teamForm.experience_years} onChange={(event) => setTeamForm((current) => ({ ...current, experience_years: event.target.value }))} className={inputClass} required /></Field>
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Email"><input type="email" value={teamForm.email} onChange={(event) => setTeamForm((current) => ({ ...current, email: event.target.value, login_email: current.login_email || event.target.value }))} className={inputClass} required /></Field>
                        <Field label="Phone"><input value={teamForm.phone} onChange={(event) => setTeamForm((current) => ({ ...current, phone: event.target.value }))} className={inputClass} required /></Field>
                      </div>
                      <Field label="Profile Image"><input value={teamForm.image} onChange={(event) => setTeamForm((current) => ({ ...current, image: event.target.value }))} className={inputClass} required /></Field>
                      <Field label="Languages"><textarea value={teamForm.languages} onChange={(event) => setTeamForm((current) => ({ ...current, languages: event.target.value }))} className={textAreaClass} rows="3" /></Field>
                      <Field label="Specialties"><textarea value={teamForm.specialties} onChange={(event) => setTeamForm((current) => ({ ...current, specialties: event.target.value }))} className={textAreaClass} rows="3" /></Field>
                      <Field label="Bio"><textarea value={teamForm.bio} onChange={(event) => setTeamForm((current) => ({ ...current, bio: event.target.value }))} className={textAreaClass} rows="5" /></Field>
                      <ToggleRow checked={teamForm.is_active} onChange={(value) => setTeamForm((current) => ({ ...current, is_active: value }))} label="Active profile" />
                      <ToggleRow checked={teamForm.create_login} onChange={(value) => setTeamForm((current) => ({ ...current, create_login: value }))} label="Create login access" />
                      {teamForm.create_login ? (
                        <div className="grid gap-5 rounded-lg border border-[#dbe7e1] bg-[#f8fbf9] p-4">
                          <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Login Email"><input type="email" value={teamForm.login_email} onChange={(event) => setTeamForm((current) => ({ ...current, login_email: event.target.value }))} className={inputClass} required /></Field>
                            <Field label="Login Role">
                              <select value={teamForm.login_role} onChange={(event) => setTeamForm((current) => ({ ...current, login_role: event.target.value }))} className={selectClass}>
                                <option value="therapist">Therapist</option>
                                <option value="doctor">Doctor</option>
                              </select>
                            </Field>
                          </div>
                          <Field label={teamForm.linked_user_id ? "Password (leave blank to keep current)" : "Password"}>
                            <PasswordInput value={teamForm.login_password} onChange={(event) => setTeamForm((current) => ({ ...current, login_password: event.target.value }))} required={!teamForm.linked_user_id} autoComplete="new-password" placeholder="Enter login password" />
                          </Field>
                          <ToggleRow checked={teamForm.login_is_active} onChange={(value) => setTeamForm((current) => ({ ...current, login_is_active: value }))} label="Active login" />
                          <ToggleRow
                            checked={teamForm.send_welcome_email}
                            onChange={(value) => setTeamForm((current) => ({ ...current, send_welcome_email: value }))}
                            label={teamForm.linked_user_id ? "Email login details when password changes" : "Email login details to team member"}
                          />
                          <p className="rounded-xl border border-[#dbe7e1] bg-white px-4 py-3 text-xs leading-5 text-[#60746e]">
                            The email includes name, login email, temporary password, admin login link, and update-details guidance.
                          </p>
                        </div>
                      ) : null}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                          {isSubmitting ? "Saving..." : editingTherapistId ? "Update Team Member" : "Create Team Member"}
                        </button>
                        <button type="button" onClick={closeTeamModal} className={secondaryButtonClass}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </FormModal>
                </>
              ) : null}

              {resolvedSection === "relaxation-therapies" ? (
                <>
                <EntityPanel
                  eyebrow="Booking Flow"
                  title={editingRelaxationTherapyId ? "Edit Therapy" : "New Therapy"}
                  subtitle="Manage detailed therapy records for the interactive booking flow."
                  hideForm
                  actionLabel="Add Therapy"
                  onAction={openRelaxationTherapyCreateModal}
                  saveLabel="Therapy"
                  listingTitle="Therapy Catalog"
                  listingSubtitle={`Total of ${relaxationTherapies.length} relaxation therapies.`}
                  items={relaxationTherapies}
                  renderItem={(item) => (
                    <RecordCard
                      key={item.id}
                      title={item.title}
                      meta={`${toTitleCase(item.category || "relax")} | ${item.duration} | Order ${item.sort_order} | ${item.is_active ? "Published" : "Draft"}`}
                      body={`${item.short_description || item.shortDescription || ""}\n\n${item.details || ""}\n\nBenefits:\n${normalizeListValue(item.benefits).map((benefit) => `- ${benefit}`).join("\n") || "- Not added"}`}
                      extra={item.image}
                      onEdit={() => openRelaxationTherapyEditModal(item)}
                      onDelete={() =>
                        handleDelete(
                          deleteAdminRelaxationTherapy,
                          item.id,
                          "Relaxation therapy"
                        )
                      }
                    />
                  )}
                />
                <FormModal
                  open={isRelaxationTherapyModalOpen}
                  title={editingRelaxationTherapyId ? "Edit therapy" : "Add therapy"}
                  subtitle="Create or update a relaxation therapy used in the booking flow and therapy pages."
                  onClose={closeRelaxationTherapyModal}
                >
                  <form onSubmit={async (event) => {
                    const success = await handleRelaxationTherapySubmit(event);
                    if (success) closeRelaxationTherapyModal();
                  }} className="grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Therapy Name">
                        <input
                          value={relaxationTherapyForm.title}
                          onChange={(event) =>
                            setRelaxationTherapyForm((current) => ({
                              ...current,
                              title: event.target.value,
                            }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                      <Field label="Category">
                        <select
                          value={relaxationTherapyForm.category}
                          onChange={(event) =>
                            setRelaxationTherapyForm((current) => ({
                              ...current,
                              category: event.target.value,
                            }))
                          }
                          className={selectClass}
                          required
                        >
                          {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Duration">
                        <input
                          value={relaxationTherapyForm.duration}
                          onChange={(event) =>
                            setRelaxationTherapyForm((current) => ({
                              ...current,
                              duration: event.target.value,
                            }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                      <Field label="Cover Image">
                        <input
                          value={relaxationTherapyForm.image}
                          onChange={(event) =>
                            setRelaxationTherapyForm((current) => ({
                              ...current,
                              image: event.target.value,
                            }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                      <Field label="Sort Order">
                        <input
                          type="number"
                          min="0"
                          value={relaxationTherapyForm.sort_order}
                          onChange={(event) =>
                            setRelaxationTherapyForm((current) => ({
                              ...current,
                              sort_order: event.target.value,
                            }))
                          }
                          className={inputClass}
                          required
                        />
                      </Field>
                    </div>
                    <Field label="Short Description">
                      <textarea
                        value={relaxationTherapyForm.short_description}
                        onChange={(event) =>
                          setRelaxationTherapyForm((current) => ({
                            ...current,
                            short_description: event.target.value,
                          }))
                        }
                        className={textAreaClass}
                        rows="3"
                        placeholder="Add a short summary, or leave this blank and fill Deep Details below."
                      />
                    </Field>
                    <Field label="Deep Details">
                      <textarea
                        value={relaxationTherapyForm.details}
                        onChange={(event) =>
                          setRelaxationTherapyForm((current) => ({
                            ...current,
                            details: event.target.value,
                          }))
                        }
                        className={textAreaClass}
                        rows="5"
                        placeholder="Add full details, or leave this blank and use Short Description above."
                      />
                    </Field>
                    <Field label="Benefits">
                      <div className="grid gap-3">
                        {relaxationTherapyForm.benefits.map((benefit, index) => (
                          <div key={`benefit-${index}`} className="flex gap-3">
                            <input
                              value={benefit}
                              onChange={(event) => updateRelaxationBenefit(index, event.target.value)}
                              className={inputClass}
                              placeholder={`Benefit ${index + 1}`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeRelaxationBenefit(index)}
                              className={secondaryButtonClass}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={addRelaxationBenefit} className={secondaryButtonClass}>
                          Add Benefit
                        </button>
                      </div>
                    </Field>
                    <ToggleRow
                      checked={relaxationTherapyForm.is_active}
                      onChange={(value) =>
                        setRelaxationTherapyForm((current) => ({ ...current, is_active: value }))
                      }
                      label="Publish to public website"
                    />
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                        {isSubmitting ? "Saving..." : editingRelaxationTherapyId ? "Update Therapy" : "Create Therapy"}
                      </button>
                      <button type="button" onClick={closeRelaxationTherapyModal} className={secondaryButtonClass}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </FormModal>
                </>
              ) : null}

              {resolvedSection === "settings" ? (
                <EmailSettingsPanel
                  emailSettingsForm={emailSettingsForm}
                  setEmailSettingsForm={setEmailSettingsForm}
                  pageMetaSettings={pageMetaSettings}
                  onPageMetaChange={handlePageMetaSettingChange}
                  onPageMetaSave={handlePageMetaSettingSave}
                  onSubmit={handleEmailSettingsSubmit}
                  isSubmitting={isSubmitting}
                />
              ) : null}
            </div>
          </div>
          <FormModal
            open={isEmailModalOpen}
            title="Send booking email"
            subtitle={selectedBooking ? `Client: ${selectedBooking.customer_name} (${selectedBooking.email})` : ""}
            onClose={closeBookingEmailModal}
          >
            <form onSubmit={handleSendBookingEmail} className="grid gap-4">
              <Field label="Subject">
                <input
                  value={emailForm.subject}
                  onChange={(event) =>
                    setEmailForm((current) => ({ ...current, subject: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Message">
                <textarea
                  value={emailForm.message}
                  onChange={(event) =>
                    setEmailForm((current) => ({ ...current, message: event.target.value }))
                  }
                  className={textAreaClass}
                  rows="8"
                  required
                />
              </Field>
              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                  {isSubmitting ? "Sending..." : "Send Email"}
                </button>
                <button type="button" onClick={closeBookingEmailModal} className={secondaryButtonClass}>
                  Cancel
                </button>
              </div>
            </form>
          </FormModal>
          <FormModal
            open={isInquiryEmailModalOpen}
            title="Send enquiry email"
            subtitle={selectedInquiry ? `Enquiry: ${selectedInquiry.name} (${selectedInquiry.email})` : ""}
            onClose={closeInquiryEmailModal}
          >
            <form onSubmit={handleSendInquiryEmail} className="grid gap-4">
              <Field label="To">
                <input
                  value={inquiryEmailForm.to}
                  onChange={(event) =>
                    setInquiryEmailForm((current) => ({ ...current, to: event.target.value }))
                  }
                  className={inputClass}
                  placeholder="customer@example.com, team@example.com"
                  required
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="CC">
                  <input
                    value={inquiryEmailForm.cc}
                    onChange={(event) =>
                      setInquiryEmailForm((current) => ({ ...current, cc: event.target.value }))
                    }
                    className={inputClass}
                    placeholder="optional@example.com"
                  />
                </Field>
                <Field label="BCC">
                  <input
                    value={inquiryEmailForm.bcc}
                    onChange={(event) =>
                      setInquiryEmailForm((current) => ({ ...current, bcc: event.target.value }))
                    }
                    className={inputClass}
                    placeholder="hidden@example.com"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  value={inquiryEmailForm.subject}
                  onChange={(event) =>
                    setInquiryEmailForm((current) => ({ ...current, subject: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Message">
                <textarea
                  value={inquiryEmailForm.message}
                  onChange={(event) =>
                    setInquiryEmailForm((current) => ({ ...current, message: event.target.value }))
                  }
                  className={textAreaClass}
                  rows="8"
                  required
                />
              </Field>
              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                  {isSubmitting ? "Sending..." : "Send Email"}
                </button>
                <button type="button" onClick={closeInquiryEmailModal} className={secondaryButtonClass}>
                  Cancel
                </button>
              </div>
            </form>
          </FormModal>
        </div>
      )}
    </AdminLayout>
  );
}

function BookingsPanel({
  bookings,
  isLoading,
  statusFilter,
  setStatusFilter,
  therapists,
  canAssignTherapist,
  role,
  handleBookingLifecycleChange,
  requestBookingLifecycleChange,
  openBookingEmailModal,
  handleDelete,
}) {
  const isDoctorRole = role === "doctor";
  const isTherapistRole = role === "therapist";
  const confirmBookingLifecycleChange = requestBookingLifecycleChange || handleBookingLifecycleChange;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">
              Booking Engine
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
              Appointment Management
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0f172a]">Active Bookings</h2>
          <p className="text-sm text-[#64748b]">Review requests, assign experts, and manage appointment lifecycles.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-lg bg-[#f0faf5] px-4 py-2.5 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">Volume</span>
            <p className="text-xl font-bold text-[#1a6b4a]">{bookings.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4">
        <div className="w-full sm:w-[200px]">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Status Filter</p>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            {advancedBookingStatusOptions.map((option) => (
              <option key={option} value={option}>
                {toTitleCase(option)}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`h-10 rounded-lg px-4 text-xs font-bold uppercase tracking-widest transition ${
            statusFilter === "pending"
              ? "bg-[#1a6b4a] text-white"
              : "bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Pending Only
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#1a6b4a] border-t-transparent"></div>
          <p className="mt-4 text-sm font-medium text-[#64748b]">Syncing bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#e2e8f0] bg-[#fafafa] px-5 py-12 text-center text-sm text-[#94a3b8]">
          No bookings found for the current filter.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="hidden lg:grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm transition duration-200 hover:border-[#cbd5e1] hover:shadow-md"
              >
                <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_1fr] gap-4 p-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">#{booking.id}</span>
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{booking.reference_code}</span>
                      <BookingStatusPill status={booking.status} />
                    </div>
                    <p className="text-lg font-bold text-[#0f172a]">{booking.customer_name}</p>
                    <p className="mt-0.5 text-sm font-medium text-[#1a6b4a]">{booking.therapy_name}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#64748b]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1a6b4a]"></span>
                      Created {formatDate(booking.created_at)}
                    </div>
                  </div>

                  <div className="min-w-0 text-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5">Schedule</p>
                    <p className="font-bold text-[#0f172a]">{formatDateOnly(booking.booking_date)}</p>
                    <p className="mt-1 text-[#64748b] font-medium">{formatTime(booking.start_time)} - {formatTime(booking.end_time)}</p>
                  </div>

                  <div className="min-w-0 text-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5">Expert Assignment</p>
                    {canAssignTherapist ? (
                      <select
                        value={booking.therapist_id || ""}
                        onChange={(event) =>
                          handleBookingLifecycleChange(booking.id, {
                            therapist_id: event.target.value ? Number(event.target.value) : null,
                          })
                        }
                        className="h-9 w-full rounded-lg border border-[#e2e8f0] bg-white px-2 text-xs font-semibold text-[#0f172a] focus:ring-1 focus:ring-[#1a6b4a]"
                      >
                        <option value="">Unassigned</option>
                        {therapists.map((therapist) => (
                          <option key={therapist.id} value={therapist.id}>
                            {therapist.full_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-2 font-semibold text-[#0f172a]">
                        <span className={`h-1.5 w-1.5 rounded-full ${booking.therapist_id ? "bg-[#1a6b4a]" : "bg-[#f59e0b]"}`}></span>
                        {booking.therapist_name || "Pending Admin"}
                      </div>
                    )}
                    {!booking.therapist_id && (
                      <p className="mt-1.5 text-[10px] font-bold text-[#b45309] uppercase">Assignment Required</p>
                    )}
                  </div>

                  <div className="min-w-0 text-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5">Lifecycle Control</p>
                    <select
                      value={booking.status}
                      onChange={(event) =>
                        confirmBookingLifecycleChange(
                          booking.id,
                          {
                            status: event.target.value,
                          },
                          `Change booking ${booking.reference_code} status to ${toTitleCase(event.target.value)}?`
                        )
                      }
                      className="h-9 w-full rounded-lg border border-[#e2e8f0] bg-white px-2 text-xs font-semibold text-[#0f172a] focus:ring-1 focus:ring-[#1a6b4a]"
                    >
                      {advancedBookingStatusOptions.map((option) => (
                        <option key={option} value={option}>
                          {toTitleCase(option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openBookingEmailModal(booking)}
                        className="flex-1 h-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[10px] font-bold uppercase tracking-widest text-[#64748b] transition hover:bg-[#f8fafc]"
                      >
                        Mail
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          confirmBookingLifecycleChange(
                            booking.id,
                            {
                              status: booking.status === "confirmed" ? "completed" : "confirmed",
                            },
                            booking.status === "confirmed"
                              ? `Mark as Completed?`
                              : `Approve and mark as Confirmed?`
                          )
                        }
                        className="flex-1 h-9 items-center justify-center rounded-lg bg-[#1a6b4a] text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-black"
                      >
                        {booking.status === "confirmed" ? "Complete" : "Approve"}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          confirmBookingLifecycleChange(
                            booking.id,
                            { status: "cancelled" },
                            `Cancel booking ${booking.reference_code}?`
                          )
                        }
                        className="flex-1 h-9 items-center justify-center rounded-lg border border-[#fee2e2] bg-white text-[10px] font-bold uppercase tracking-widest text-[#dc2626] transition hover:bg-[#fef2f2]"
                      >
                        Cancel
                      </button>
                      {role === "super_admin" && (
                        <button
                          type="button"
                          onClick={() => handleDelete(deleteAdminBooking, booking.id, "Booking")}
                          className="flex-1 h-9 items-center justify-center rounded-lg bg-[#dc2626] text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-black"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {booking.notes && (
                  <div className="border-t border-[#f1f5f9] bg-[#fafafa] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1">Notes from customer</p>
                    <p className="text-xs text-[#64748b] leading-relaxed">{booking.notes}</p>
                  </div>
                )}
                <div className="border-t border-[#f1f5f9] px-5 py-3 flex items-center justify-between bg-white">
                  <div className="flex gap-4">
                    <div className="text-xs">
                      <span className="text-[#94a3b8] font-medium">Email:</span> <span className="text-[#0f172a] font-semibold">{booking.email}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-[#94a3b8] font-medium">Phone:</span> <span className="text-[#0f172a] font-semibold">{booking.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:hidden">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-[#f1f5f9] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">{booking.reference_code}</span>
                      <BookingStatusPill status={booking.status} />
                    </div>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase">#{booking.id}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]">{booking.customer_name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-[#1a6b4a]">{booking.therapy_name}</p>
                  </div>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="grid gap-3">
                    <div className="rounded-lg border border-[#f1f5f9] bg-[#fafafa] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Schedule</p>
                      <p className="mt-1 text-sm font-bold text-[#0f172a]">{formatDateOnly(booking.booking_date)}</p>
                      <p className="text-xs text-[#64748b]">{formatTime(booking.start_time)} - {formatTime(booking.end_time)}</p>
                    </div>
                    <div className="rounded-lg border border-[#f1f5f9] bg-[#fafafa] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Expert</p>
                      <p className="mt-1 text-sm font-bold text-[#0f172a]">{booking.therapist_name || "Unassigned"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openBookingEmailModal(booking)}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-xs font-bold uppercase tracking-widest text-[#64748b]"
                    >
                      Send Mail
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        confirmBookingLifecycleChange(
                          booking.id,
                          { status: booking.status === "confirmed" ? "completed" : "confirmed" },
                          booking.status === "confirmed" ? "Mark as Completed?" : "Approve Booking?"
                        )
                      }
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1a6b4a] text-xs font-bold uppercase tracking-widest text-white"
                    >
                      {booking.status === "confirmed" ? "Complete" : "Approve"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function DashboardPanel({ bookings, therapists, role }) {
  const [monthFilter, setMonthFilter] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [therapistFilter, setTherapistFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const dateKey = getBookingDateKey(booking.booking_date);
      if (!dateKey.startsWith(monthFilter)) return false;
      if (statusFilter !== "all" && booking.status !== statusFilter) return false;
      if (therapistFilter !== "all" && String(booking.therapist_id || "") !== therapistFilter) return false;
      return true;
    });
  }, [bookings, monthFilter, statusFilter, therapistFilter]);

  const dailyBookings = useMemo(() => {
    return filteredBookings.reduce((accumulator, booking) => {
      const dateKey = getBookingDateKey(booking.booking_date);
      if (!accumulator[dateKey]) {
        accumulator[dateKey] = [];
      }
      accumulator[dateKey].push(booking);
      return accumulator;
    }, {});
  }, [filteredBookings]);

  const monthStatusCounts = advancedBookingStatusOptions.reduce((counts, status) => {
    counts[status] = filteredBookings.filter((booking) => booking.status === status).length;
    return counts;
  }, {});

  const [year, month] = monthFilter.split("-").map(Number);
  const firstDay = new Date(year, (month || 1) - 1, 1);
  const daysInMonth = new Date(year, month || 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells = Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) return null;
    const dayNumber = index - startOffset + 1;
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
    return {
      dayNumber,
      dateKey,
      bookings: dailyBookings[dateKey] || [],
    };
  });

  const selectedBookings = selectedDate ? dailyBookings[selectedDate] || [] : [];
  const visibleList = selectedDate ? selectedBookings : filteredBookings.slice(0, 12);
  const dashboardTitle = role === "doctor" ? "Doctor calendar dashboard" : role === "therapist" ? "Therapist calendar dashboard" : "Booking calendar dashboard";

  return (
    <section className="grid gap-5">
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#f1f5f9] bg-[#fafafa] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">Booking Dashboard</span>
            <h2 className="mt-2 text-xl font-bold text-[#0f172a]">{dashboardTitle}</h2>
            <p className="mt-0.5 text-sm text-[#64748b]">Track bookings by day, hover dates to preview, and filter by status or therapist.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <FieldInline label="Month">
              <input
                type="month"
                value={monthFilter}
                onChange={(event) => {
                  setMonthFilter(event.target.value);
                  setSelectedDate("");
                }}
                className={inputClass}
              />
            </FieldInline>
            <FieldInline label="Status">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={selectClass}>
                <option value="all">All statuses</option>
                {advancedBookingStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {toTitleCase(option)}
                  </option>
                ))}
              </select>
            </FieldInline>
            <FieldInline label="Therapist">
              <select value={therapistFilter} onChange={(event) => setTherapistFilter(event.target.value)} className={selectClass}>
                <option value="all">All therapists</option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={String(therapist.id)}>
                    {therapist.full_name}
                  </option>
                ))}
              </select>
            </FieldInline>
          </div>
        </div>

        <div className="grid gap-2 border-b border-[#f1f5f9] px-4 py-3 sm:grid-cols-2 xl:grid-cols-5">
          <BookingDashboardMetric label="Total" value={filteredBookings.length} />
          <BookingDashboardMetric label="Pending" value={monthStatusCounts.pending || 0} tone="warning" />
          <BookingDashboardMetric label="Confirmed" value={monthStatusCounts.confirmed || 0} tone="success" />
          <BookingDashboardMetric label="Completed" value={monthStatusCounts.completed || 0} tone="neutral" />
          <BookingDashboardMetric label="Cancelled" value={monthStatusCounts.cancelled || 0} tone="danger" />
        </div>

        <div className="grid grid-cols-7 gap-px bg-[#e5e7eb]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="bg-[#f8fafc] px-2 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
              {day}
            </div>
          ))}
          {cells.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} className="min-h-[126px] bg-white" />;
            }

            const isSelected = selectedDate === cell.dateKey;
            const pendingCount = cell.bookings.filter((booking) => booking.status === "pending").length;
            const confirmedCount = cell.bookings.filter((booking) => booking.status === "confirmed").length;
            const completedCount = cell.bookings.filter((booking) => booking.status === "completed").length;
            
            return (
              <button
                key={cell.dateKey}
                type="button"
                onClick={() => setSelectedDate((current) => (current === cell.dateKey ? "" : cell.dateKey))}
                className={`group relative min-h-[126px] bg-white p-3 text-left transition duration-200 hover:bg-[#f8fafc] ${
                  isSelected ? "ring-2 ring-inset ring-[#1a6b4a] z-10" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-sm font-bold ${cell.bookings.length ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
                    {cell.dayNumber}
                  </span>
                  {cell.bookings.length ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f0faf5] text-[10px] font-bold text-[#1a6b4a]">
                      {cell.bookings.length}
                    </span>
                  ) : null}
                </div>
                
                {cell.bookings.length ? (
                  <div className="mt-3 grid gap-1">
                    {pendingCount ? <CalendarCountPill label="Pending" value={pendingCount} tone="warning" /> : null}
                    {confirmedCount ? <CalendarCountPill label="Confirmed" value={confirmedCount} tone="success" /> : null}
                    {completedCount ? <CalendarCountPill label="Done" value={completedCount} tone="neutral" /> : null}
                  </div>
                ) : null}

                {/* Hover Popover */}
                {cell.bookings.length ? (
                  <div className="pointer-events-none absolute left-3 top-full z-20 hidden w-72 rounded-xl border border-[#e2e8f0] bg-white p-4 text-left shadow-2xl group-hover:block animate-in fade-in zoom-in duration-200">
                    <div className="mb-3 border-b border-[#f1f5f9] pb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                        {formatDateOnly(cell.dateKey)}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-[#1a6b4a]">{cell.bookings.length} bookings scheduled</p>
                    </div>
                    <div className="grid gap-2">
                      {cell.bookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="rounded-lg border border-[#f1f5f9] bg-[#fafafa] px-3 py-2">
                          <p className="text-xs font-bold text-[#0f172a] truncate">
                            {booking.customer_name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#64748b]">
                            {booking.reference_code} | {booking.therapy_name}
                          </p>
                        </div>
                      ))}
                      {cell.bookings.length > 5 ? (
                        <p className="mt-1 text-[10px] font-medium text-center text-[#94a3b8]">
                          + {cell.bookings.length - 5} more bookings
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] bg-[#fafafa] px-5 py-3.5">
          <div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {selectedDate ? `Bookings for ${formatDateOnly(selectedDate)}` : "Monthly booking list"}
            </h3>
            <p className="text-xs text-[#64748b]">
              {selectedDate
                ? "Selected date bookings are shown below."
                : "Showing the first bookings from the selected month and filters."}
            </p>
          </div>
        </div>

        {visibleList.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-[#94a3b8]">
            No bookings match the selected dashboard filters.
          </div>
        ) : (
          <div className="grid gap-2 p-4">
            {visibleList.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-[#e5e7eb] bg-white p-4 transition duration-200 hover:border-[#cbd5e1] hover:shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0faf5] text-xs font-bold text-[#1a6b4a]">
                      {booking.customer_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                          #{booking.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                          {booking.reference_code}
                        </span>
                        <BookingStatusPill status={booking.status} />
                      </div>
                      <p className="mt-1 text-base font-bold text-[#0f172a]">{booking.customer_name}</p>
                      <p className="mt-0.5 text-sm text-[#64748b]">
                        {booking.therapy_name} • {formatDateOnly(booking.booking_date)} • {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-right text-xs text-[#64748b]">
                    <p className="font-semibold text-[#0f172a]">{booking.email}</p>
                    <p className="mt-1">{booking.phone}</p>
                    <p className="mt-1 flex items-center justify-end gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1a6b4a]"></span>
                      {booking.therapist_name || "Unassigned"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BookingInfoBlock({ label, value, note, attention = false }) {
  return (
    <div
      className={`min-w-0 rounded-xl border p-4 ${
        attention
          ? "border-[#efd8a1] bg-[#fff9ea]"
          : "border-[#e3ece7] bg-[#fbfdfc]"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7d948c]">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold leading-6 text-[#18332e]">{value}</p>
      {note ? <p className="mt-1 break-words text-xs leading-5 text-[#60746e]">{note}</p> : null}
    </div>
  );
}

function getBookingDateKey(value) {
  const parsed = parseAdminDate(value);
  if (!parsed) return "";
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
}

function BookingDashboardMetric({ label, value, active = false, tone = "default", onClick }) {
  const tones = {
    default: "border-[#e5e7eb] bg-white text-[#0f172a]",
    warning: "border-[#fef3c7] bg-[#fffbeb] text-[#92400e]",
    success: "border-[#dcfce7] bg-[#f0fdf4] text-[#166534]",
    neutral: "border-[#e5e7eb] bg-[#f8fafc] text-[#374151]",
    danger: "border-[#fee2e2] bg-[#fef2f2] text-[#dc2626]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-3 text-left transition hover:shadow-sm ${tones[tone] || tones.default}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight">{value}</p>
    </button>
  );
}

function CalendarCountPill({ label, value, tone = "default" }) {
  const toneClass = {
    default: "bg-[#eef5f1] text-[#19564f]",
    warning: "bg-[#fff4da] text-[#9a6c12]",
    success: "bg-[#e8f6ee] text-[#1f7a44]",
    neutral: "bg-[#f1efec] text-[#5b554e]",
  };

  return (
    <div className={`inline-flex items-center justify-between rounded-lg px-2.5 py-1 text-xs font-semibold ${toneClass[tone] || toneClass.default}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function InquiriesPanel({
  inquiries,
  inquiryStatusFilter,
  setInquiryStatusFilter,
  inquirySourceFilter,
  setInquirySourceFilter,
  inquirySources,
  handleInquiryStatusChange,
  handleDelete,
  openInquiryEmailModal,
  downloadInquiriesCsv,
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">
              Admin CRM
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
              Lead Management
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0f172a]">Recent Enquiries</h2>
          <p className="text-sm text-[#64748b]">Real-time therapy requests from the website with quick actions.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => downloadInquiriesCsv(inquiries)}
            disabled={inquiries.length === 0}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-xs font-bold uppercase tracking-widest text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-50"
          >
            Download CSV
          </button>
          <div className="rounded-lg bg-[#f0faf5] px-4 py-2.5 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a6b4a]">Count</span>
            <p className="text-xl font-bold text-[#1a6b4a]">{inquiries.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4">
        <div className="w-full sm:w-[200px]">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Status Filter</p>
          <select
            value={inquiryStatusFilter}
            onChange={(event) => setInquiryStatusFilter(event.target.value)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="w-full sm:w-[200px]">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Source Filter</p>
          <select
            value={inquirySourceFilter}
            onChange={(event) => setInquirySourceFilter(event.target.value)}
            className={selectClass}
          >
            <option value="all">All sources</option>
            {inquirySources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#e2e8f0] bg-[#fafafa] px-5 py-12 text-center text-sm text-[#94a3b8]">
          No enquiries found matching the selected filters.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.7fr_1.2fr] gap-4 border-b border-[#f1f5f9] bg-[#fafafa] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
              <span>Guest Details</span>
              <span>Contact Info</span>
              <span>Interest</span>
              <span>Source</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.7fr_1.2fr] gap-4 border-b border-[#f1f5f9] px-6 py-5 transition hover:bg-[#fafafa] last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[#0f172a]">{inquiry.name}</p>
                  <p className="mt-0.5 text-xs text-[#64748b] truncate">
                    {inquiry.topic || "General enquiry"}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#64748b] line-clamp-2">
                    {inquiry.message}
                  </p>
                  <p className="mt-2 text-[10px] font-bold text-[#94a3b8]">
                    {formatDate(inquiry.created_at)}
                  </p>
                </div>

                <div className="min-w-0 text-xs">
                  <p className="font-bold text-[#0f172a]">{inquiry.phone || "--"}</p>
                  <p className="mt-1 break-words text-[#64748b]">
                    {inquiry.email || "--"}
                  </p>
                </div>

                <div className="min-w-0 text-xs">
                  <p className="font-bold text-[#1a6b4a]">
                    {inquiry.service_interest || "General"}
                  </p>
                  <p className="mt-1 break-words text-[#94a3b8] italic">
                    {inquiry.page_path || "/"}
                  </p>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                  {inquiry.source || "Website"}
                </div>

                <div className="pt-0.5">
                  <BookingStatusPill status={inquiry.status} />
                </div>

                <div className="flex flex-col gap-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openInquiryEmailModal(inquiry)}
                      className="inline-flex h-8 items-center justify-center rounded-lg bg-[#0f172a] px-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-black"
                    >
                      Mail
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(deleteAdminInquiry, inquiry.id, "Enquiry")}
                      className="inline-flex h-8 items-center justify-center rounded-lg border border-[#fee2e2] bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-[#dc2626] transition hover:bg-[#fef2f2]"
                    >
                      Delete
                    </button>
                  </div>
                  <select
                    value={inquiry.status}
                    onChange={(event) =>
                      requestInquiryStatusChange(inquiry.id, event.target.value)
                    }
                    className="h-8 rounded-lg border border-[#e2e8f0] bg-white px-2 text-[10px] font-bold text-[#0f172a] focus:ring-1 focus:ring-[#1a6b4a]"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="closed">Mark Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 p-4 lg:hidden">
            {inquiries.map((inquiry) => (
              <article
                key={inquiry.id}
                className="rounded-[1.6rem] border border-[#dbe7e1] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(242,248,244,0.94))] p-5 shadow-[0_12px_36px_rgba(21,53,46,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#19564f]">
                      {inquiry.source || "Website"}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[#18332e]">
                      {inquiry.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#60746e]">
                      {inquiry.topic || "General enquiry"} | {formatDate(inquiry.created_at)}
                    </p>
                  </div>
                  <BookingStatusPill status={inquiry.status} />
                </div>

                <div className="mt-4 grid gap-3">
                  <SummaryTile
                    label="Contact"
                    value={`${inquiry.phone || "No phone"} / ${inquiry.email || "No email"}`}
                  />
                  <SummaryTile
                    label="Service interest"
                    value={inquiry.service_interest || "General enquiry"}
                    note={inquiry.page_path || "No page path captured"}
                  />
                  <SummaryTile label="Message" value={inquiry.message} />
                </div>

                <div className="mt-4 grid gap-3 rounded-[1.4rem] border border-[#dbe7e1] bg-[linear-gradient(180deg,#f9fcfa,#f1f7f3)] p-4">
                  <FieldInline label="Status">
                    <select
                      value={inquiry.status}
                      onChange={(event) =>
                        requestInquiryStatusChange(inquiry.id, event.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </FieldInline>
                  <button
                    type="button"
                    onClick={() => openInquiryEmailModal(inquiry)}
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#18332e] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#22544b]"
                  >
                    Send Mail
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(deleteAdminInquiry, inquiry.id, "Enquiry")}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#f0cdc5] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b35342] transition-all duration-300 hover:bg-[#fff4f2]"
                  >
                    Delete Enquiry
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmailSettingsPanel({
  emailSettingsForm,
  setEmailSettingsForm,
  pageMetaSettings,
  onPageMetaChange,
  onPageMetaSave,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="grid gap-6">
      <PanelCard
        eyebrow="Admin Settings"
        title="Email Notifications"
        subtitle="Control where booking and enquiry emails go, and what customers receive automatically after they contact the website."
      >
        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid gap-5">
            <h3 className="text-lg font-semibold text-[#18332e]">Booking Notifications</h3>
            <Field label="Booking notification To">
              <textarea
                value={emailSettingsForm.booking_to_emails}
                onChange={(event) =>
                  setEmailSettingsForm((current) => ({
                    ...current,
                    booking_to_emails: event.target.value,
                  }))
                }
                className={textAreaClass}
                rows="4"
                placeholder="admin@srisriwellbeingchennai.com"
              />
            </Field>
            <div className="grid gap-5 lg:grid-cols-2">
              <Field label="Booking notification CC">
                <textarea
                  value={emailSettingsForm.booking_cc_emails}
                  onChange={(event) =>
                    setEmailSettingsForm((current) => ({
                      ...current,
                      booking_cc_emails: event.target.value,
                    }))
                  }
                  className={textAreaClass}
                  rows="4"
                  placeholder="manager@example.com"
                />
              </Field>
              <Field label="Booking notification BCC">
                <textarea
                  value={emailSettingsForm.booking_bcc_emails}
                  onChange={(event) =>
                    setEmailSettingsForm((current) => ({
                      ...current,
                      booking_bcc_emails: event.target.value,
                    }))
                  }
                  className={textAreaClass}
                  rows="4"
                  placeholder="audit@example.com"
                />
              </Field>
            </div>
          </div>

          <div className="grid gap-5 rounded-[1.4rem] border border-[#dbe7e1] bg-[#f8fbf9] p-5">
            <h3 className="text-lg font-semibold text-[#18332e]">Enquiry Notifications</h3>
            <Field label="Enquiry notification To">
              <textarea
                value={emailSettingsForm.inquiry_to_emails}
                onChange={(event) =>
                  setEmailSettingsForm((current) => ({
                    ...current,
                    inquiry_to_emails: event.target.value,
                  }))
                }
                className={textAreaClass}
                rows="4"
                placeholder="sales@example.com"
              />
            </Field>
            <div className="grid gap-5 lg:grid-cols-2">
              <Field label="Enquiry notification CC">
                <textarea
                  value={emailSettingsForm.inquiry_cc_emails}
                  onChange={(event) =>
                    setEmailSettingsForm((current) => ({
                      ...current,
                      inquiry_cc_emails: event.target.value,
                    }))
                  }
                  className={textAreaClass}
                  rows="4"
                  placeholder="manager@example.com"
                />
              </Field>
              <Field label="Enquiry notification BCC">
                <textarea
                  value={emailSettingsForm.inquiry_bcc_emails}
                  onChange={(event) =>
                    setEmailSettingsForm((current) => ({
                      ...current,
                      inquiry_bcc_emails: event.target.value,
                    }))
                  }
                  className={textAreaClass}
                  rows="4"
                  placeholder="audit@example.com"
                />
              </Field>
            </div>
            <ToggleRow
              checked={emailSettingsForm.inquiry_auto_reply_enabled}
              onChange={(value) =>
                setEmailSettingsForm((current) => ({
                  ...current,
                  inquiry_auto_reply_enabled: value,
                }))
              }
              label="Send automatic thank-you email to enquiry customer"
            />
            <Field label="Auto reply subject">
              <input
                value={emailSettingsForm.inquiry_auto_reply_subject}
                onChange={(event) =>
                  setEmailSettingsForm((current) => ({
                    ...current,
                    inquiry_auto_reply_subject: event.target.value,
                  }))
                }
                className={inputClass}
                required
              />
            </Field>
            <Field label="Auto reply message">
              <textarea
                value={emailSettingsForm.inquiry_auto_reply_message}
                onChange={(event) =>
                  setEmailSettingsForm((current) => ({
                    ...current,
                    inquiry_auto_reply_message: event.target.value,
                  }))
                }
                className={textAreaClass}
                rows="5"
                required
              />
            </Field>
          </div>

          <p className="rounded-xl border border-[#dbe7e1] bg-[#f7fbf8] px-4 py-3 text-sm leading-6 text-[#60746e]">
            Add one email per line or separate emails with commas. Enquiry customers can receive an automatic thank-you email such as “We received your enquiry and will contact you within 48 hours.”
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
              {isSubmitting ? "Saving..." : "Save Email Settings"}
            </button>
          </div>
        </form>
      </PanelCard>

      <PanelCard
        eyebrow="Admin Settings"
        title="Page Meta Tags"
        subtitle="Edit SEO titles and descriptions for the main public pages."
      >
        <div className="grid gap-4">
          {pageMetaSettings.map((item) => (
            <div key={item.id} className="rounded-[1.4rem] border border-[#dbe7e1] bg-[#fbfdfc] p-5">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,180px)_1fr] lg:items-start">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d948c]">{item.page_key}</p>
                  <p className="mt-2 text-sm font-semibold text-[#18332e]">{item.page_path}</p>
                </div>
                <div className="grid gap-4">
                  <Field label="Meta Title">
                    <input
                      value={item.title}
                      onChange={(event) => onPageMetaChange(item.id, "title", event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Meta Description">
                    <textarea
                      value={item.description}
                      onChange={(event) => onPageMetaChange(item.id, "description", event.target.value)}
                      className={textAreaClass}
                      rows="4"
                    />
                  </Field>
                  <ToggleRow
                    checked={Boolean(item.is_active)}
                    onChange={(value) => onPageMetaChange(item.id, "is_active", value)}
                    label="Use this meta on the site"
                  />
                  <div className="flex flex-wrap gap-3">
                    <button type="button" disabled={isSubmitting} onClick={() => onPageMetaSave(item)} className={primaryButtonClass}>
                      {isSubmitting ? "Saving..." : "Save Meta"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white tracking-tight">{value}</p>
    </div>
  );
}

function BookingStatusPill({ status }) {
  const configs = {
    pending: {
      bg: "bg-[#fff4da]",
      text: "text-[#9a6c12]",
      border: "border-[#efd8a1]",
      dot: "bg-[#9a6c12]"
    },
    confirmed: {
      bg: "bg-[#e8f6ee]",
      text: "text-[#1f7a44]",
      border: "border-[#bfe0cb]",
      dot: "bg-[#1f7a44]"
    },
    rescheduled: {
      bg: "bg-[#eaf1ff]",
      text: "text-[#355da8]",
      border: "border-[#c8d6f6]",
      dot: "bg-[#355da8]"
    },
    completed: {
      bg: "bg-[#f8f6f4]",
      text: "text-[#5b554e]",
      border: "border-[#e0dad2]",
      dot: "bg-[#5b554e]"
    },
    cancelled: {
      bg: "bg-[#fff0ee]",
      text: "text-[#b24b43]",
      border: "border-[#f0c6bf]",
      dot: "bg-[#b24b43]"
    },
    no_show: {
      bg: "bg-[#fdf0e9]",
      text: "text-[#91543e]",
      border: "border-[#ecd4c6]",
      dot: "bg-[#91543e]"
    },
    new: {
      bg: "bg-[#fff4da]",
      text: "text-[#9a6c12]",
      border: "border-[#efd8a1]",
      dot: "bg-[#9a6c12]"
    },
    contacted: {
      bg: "bg-[#eaf1ff]",
      text: "text-[#355da8]",
      border: "border-[#c8d6f6]",
      dot: "bg-[#355da8]"
    },
    closed: {
      bg: "bg-[#f8f6f4]",
      text: "text-[#5b554e]",
      border: "border-[#e0dad2]",
      dot: "bg-[#5b554e]"
    }
  };

  const config = configs[status] || {
    bg: "bg-[#f5efe6]",
    text: "text-[#1f1a17]",
    border: "border-[#e6dac9]",
    dot: "bg-[#1f1a17]"
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium uppercase ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {toTitleCase(status)}
    </span>
  );
}
