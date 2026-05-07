"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  API_BASE_URL,
  createAdminTherapist,
  createAdminUser,
  deleteAdminTherapist,
  deleteAdminRelaxationTherapy,
  deleteAdminService,
  deleteAdminUser,
  loginAdmin,
  deleteAdminInquiry,
  requestAdminPasswordReset,
  sendAdminBookingEmail,
  updateAdminTherapist,
  updateAdminInquiry,
  updateAdminBooking,
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
  refreshAdminData,
  submitEntity,
  toTitleCase,
} from "./admin-data";
import {
  advancedBookingStatusOptions,
  initialAdminUserForm,
  initialCredentials,
  initialRelaxationTherapyForm,
  initialServiceForm,
  initialTeamForm,
  initialTherapistForm,
} from "./admin-form-defaults";
import {
  EntityPanel,
  Field,
  FieldInline,
  FlashMessage,
  FormModal,
  InfoStrip,
  PanelCard,
  PasswordInput,
  RecordCard,
  StatCard,
  SummaryTile,
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

export default function AdminPanelClient({ currentSection = "bookings" }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [token, setToken] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [relaxationTherapies, setRelaxationTherapies] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [relaxationTherapyForm, setRelaxationTherapyForm] = useState(initialRelaxationTherapyForm);
  const [therapistForm, setTherapistForm] = useState(initialTherapistForm);
  const [adminUserForm, setAdminUserForm] = useState(initialAdminUserForm);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingRelaxationTherapyId, setEditingRelaxationTherapyId] = useState(null);
  const [editingTherapistId, setEditingTherapistId] = useState(null);
  const [editingAdminUserId, setEditingAdminUserId] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isRelaxationTherapyModalOpen, setIsRelaxationTherapyModalOpen] = useState(false);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [inquirySourceFilter, setInquirySourceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastLoadedAt, setLastLoadedAt] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  });

  const availableSections = useMemo(() => {
    if (userProfile?.role === "doctor") {
      return adminSections.filter((section) => section.id === "bookings");
    }
    return adminSections;
  }, [userProfile]);

  const normalizedSection =
    currentSection === "therapists" || currentSection === "doctor-logins"
      ? "team"
      : currentSection;

  const resolvedSection =
    availableSections.find((section) => section.id === normalizedSection)?.id ?? availableSections[0]?.id ?? "bookings";

  const currentSectionMeta =
    availableSections.find((section) => section.id === resolvedSection) ?? availableSections[0] ?? adminSections[0];

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
        benefits: (payload.benefits || []).map((item) => item.trim()).filter(Boolean),
      }),
      setForm: setServiceForm,
      initialForm: initialServiceForm,
      setEditingId: setEditingServiceId,
      label: "Service",
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
        benefits: (payload.benefits || []).map((item) => item.trim()).filter(Boolean),
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

  const handleDelete = async (deleteFn, id, label) => {
    if (!window.confirm(`Are you sure you want to delete this ${label}?`)) return;
    try {
      await deleteFn(token, id);
      setSuccessMessage(`${label} deleted successfully.`);
      refresh();
    } catch (error) {
      setErrorMessage(error.message || `Failed to delete ${label}.`);
    }
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
  };

  const openServiceCreateModal = () => {
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
    setIsServiceModalOpen(true);
  };

  const openServiceEditModal = (item) => {
    setEditingServiceId(item.id);
    setServiceForm({
      title: item.title,
      short_description: item.short_description,
      description: item.description,
      benefits: item.benefits?.length ? [...item.benefits] : [""],
      image: item.image,
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setIsServiceModalOpen(true);
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
      title: item.title,
      duration: item.duration,
      short_description: item.short_description,
      details: item.details,
      benefits: item.benefits?.length ? [...item.benefits] : [""],
      image: item.image,
      sort_order: item.sort_order,
      is_active: item.is_active,
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
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="rounded-2xl border border-[#dbe7e1] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-md bg-[#eef4f1] px-2.5 py-1 text-xs font-medium text-[#1f6b5c]">
                      {currentSectionMeta.eyebrow}
                    </span>
                  </div>
                  <h1 className="text-3xl font-semibold text-[#1d2a26] md:text-4xl">{currentSectionMeta.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f726c]">
                    {currentSectionMeta.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard label="New Enquiries" value={newInquiries} tone="dark" />
              <StatCard label="Total Bookings" value={bookings.length} />
              <StatCard label="Pending Approval" value={pendingBookings} />
              <StatCard label="Confirmed Sessions" value={confirmedBookings} />
              <StatCard label="Total Content" value={countActive(services) + countActive(relaxationTherapies)} />
            </div>

            {/* Quick Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <InfoStrip title="CRM Queue" value={inquiries.length} detail="Contact and lead enquiries captured from the website." />
              <InfoStrip title="Service API" value={services.length} detail="Active service cards distributed to the public frontend." />
              <InfoStrip title="Expert Network" value={therapists.length} detail="Qualified experts available for therapy assignments." />
            </div>

            {/* Alerts */}
            {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
            {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

            {/* Main Content Area */}
            <div className="pt-4">
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
                />
              ) : null}

              {resolvedSection === "bookings" ? (
                <BookingsPanel
                  bookings={bookings}
                  isLoading={isLoading}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  therapists={therapists}
                  handleBookingLifecycleChange={handleBookingLifecycleChange}
                  openBookingEmailModal={openBookingEmailModal}
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
                  listingSubtitle={`Total of ${services.length} services managed.`}
                  items={services}
                  renderItem={(item) => (
                    <RecordCard
                      key={item.id}
                      title={item.title}
                      meta={`Order ${item.sort_order} | ${item.is_active ? "Published" : "Draft"}`}
                      body={`${item.short_description}\n\n${item.description}\n\nBenefits:\n${item.benefits.map((benefit) => `- ${benefit}`).join("\n")}`}
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
                        required
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
                        required
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
                      meta={`${item.duration} | Order ${item.sort_order} | ${item.is_active ? "Published" : "Draft"}`}
                      body={`${item.short_description}\n\n${item.details}\n\nBenefits:\n${item.benefits.map((benefit) => `- ${benefit}`).join("\n")}`}
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
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
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
                        required
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
                        required
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
  handleBookingLifecycleChange,
  openBookingEmailModal,
}) {
  return (
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#18332e]">Bookings</h2>
          <p className="mt-1 text-sm text-[#5f726c]">Review requests and approve quickly.</p>
        </div>
        
        <div className="flex items-center gap-3 rounded-lg border border-[#dbe7e1] bg-white p-2">
          <FieldInline label="Filter Status">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={selectClass}
            >
              <option value="all">View All</option>
              {advancedBookingStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {toTitleCase(option)}
                </option>
              ))}
            </select>
          </FieldInline>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#cfddd6] bg-white px-5 py-20 text-center">
          <p className="text-sm text-[#60746e]">No bookings found for the current filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-xl border border-[#dbe7e1] bg-white p-5"
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-md bg-[#eef5f1] px-2.5 py-1 text-xs font-medium text-[#19564f]">
                          {booking.reference_code}
                        </span>
                        <p className="text-xs text-[#8ba098]">
                          Created {formatDate(booking.created_at)}
                        </p>
                      </div>
                      <h3 className="text-xl font-semibold text-[#18332e]">
                        {booking.customer_name}
                      </h3>
                      <p className="mt-2 text-sm text-[#4e635d]">
                        Therapy: <span className="font-medium text-[#18332e]">{booking.therapy_name}</span>
                      </p>
                    </div>
                    <BookingStatusPill status={booking.status} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SummaryTile
                      label="Client Contact"
                      value={booking.phone}
                      note={booking.email}
                    />
                    <SummaryTile
                      label="Scheduled Slot"
                      value={formatDateOnly(booking.booking_date)}
                      note={`${formatTime(booking.start_time)} - ${formatTime(booking.end_time)}`}
                    />
                    <SummaryTile
                      label="Assigned Expert"
                      value={booking.therapist_name || "Unassigned"}
                      note={booking.therapist_id ? `Internal ID: ${booking.therapist_id}` : "Expert needs to be assigned"}
                      emphasis={!booking.therapist_id}
                    />
                    <SummaryTile
                      label="Notes"
                      value={booking.notes || "No notes"}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#dbe7e1] bg-[#f8fbf9] p-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <p className="text-sm font-medium text-[#33423d]">Quick Actions</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleBookingLifecycleChange(booking.id, {
                              status: "confirmed",
                              send_email: true,
                            })
                          }
                          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1f6b5c] px-4 text-sm font-medium text-white hover:bg-[#175245]"
                        >
                          Approve & Mail
                        </button>
                        <button
                          type="button"
                          onClick={() => openBookingEmailModal(booking)}
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d6e2dc] bg-white px-4 text-sm font-medium text-[#18332e] hover:bg-[#f2f6f4]"
                        >
                          Send Email
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleBookingLifecycleChange(booking.id, {
                              status: "completed",
                            })
                          }
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d6e2dc] bg-white px-4 text-sm font-medium text-[#18332e] hover:bg-[#f2f6f4]"
                        >
                          Complete
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleBookingLifecycleChange(booking.id, {
                              status: "cancelled",
                            })
                          }
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#f0cdc5] bg-white px-4 text-sm font-medium text-[#b35342] hover:bg-[#fff4f2]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <FieldInline label="Lifecycle Status">
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          handleBookingLifecycleChange(booking.id, {
                            status: event.target.value,
                          })
                        }
                        className={`${selectClass} w-full`}
                      >
                        {advancedBookingStatusOptions.map((option) => (
                          <option key={option} value={option}>
                            {toTitleCase(option)}
                          </option>
                        ))}
                      </select>
                    </FieldInline>

                    <FieldInline label="Assign Therapist">
                      <select
                        value={booking.therapist_id || ""}
                        onChange={(event) =>
                          handleBookingLifecycleChange(booking.id, {
                            therapist_id: event.target.value ? Number(event.target.value) : null,
                          })
                        }
                        className={`${selectClass} w-full`}
                      >
                        <option value="">
                          Unassigned
                        </option>
                        {therapists.map((therapist) => (
                          <option key={therapist.id} value={therapist.id}>
                            {therapist.full_name}
                          </option>
                        ))}
                      </select>
                    </FieldInline>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
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
}) {
  return (
    <PanelCard
      eyebrow="Admin CRM"
      title="Recent Enquiries"
      subtitle="Real-time therapy requests from the website with quick filtering and status actions."
    >
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-[#dbe7e1] bg-[linear-gradient(180deg,#f9fcfa,#f2f8f4)] p-5">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-[#18332e]">
              Recent Enquiries
            </h3>
            <p className="mt-1 text-sm font-medium text-[#5f726c]">
              Real-time therapy requests from the website.
            </p>
          </div>
          <div className="rounded-2xl border border-[#dbe7e1] bg-white/90 px-4 py-3 text-sm font-semibold text-[#23403b] shadow-[0_10px_24px_rgba(21,53,46,0.05)]">
            {inquiries.length} enquiries loaded
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,220px)_minmax(0,220px)_1fr] md:items-end">
          <FieldInline label="Filter status">
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
          </FieldInline>
          <FieldInline label="Filter source">
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
          </FieldInline>
          <div className="hidden md:block" />
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="mt-6 rounded-[1.6rem] border border-dashed border-[#cfddd6] bg-[linear-gradient(180deg,#f9fcfa,#f1f7f3)] px-5 py-14 text-center text-sm text-[#60746e]">
          No enquiries found for the current filter.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#dbe7e1] bg-white shadow-[0_18px_48px_rgba(21,53,46,0.06)]">
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1.1fr_1fr_0.9fr_0.8fr_0.9fr_1fr] gap-4 border-b border-[#e3ece7] bg-[linear-gradient(180deg,#f9fcfa,#f2f8f4)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d948c]">
              <span>Guest</span>
              <span>Contact</span>
              <span>Service</span>
              <span>Source</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="grid grid-cols-[1.1fr_1fr_0.9fr_0.8fr_0.9fr_1fr] gap-4 border-b border-[#edf3ef] px-6 py-5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[#18332e]">{inquiry.name}</p>
                  <p className="mt-1 text-sm text-[#60746e]">
                    {inquiry.topic || "General enquiry"}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#4e635d]">
                    {inquiry.message}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#8ba098]">
                    {formatDate(inquiry.created_at)}
                  </p>
                </div>

                <div className="min-w-0 text-sm text-[#4e635d]">
                  <p className="font-medium">{inquiry.phone || "No phone"}</p>
                  <p className="mt-1 break-words text-[#60746e]">
                    {inquiry.email || "No email"}
                  </p>
                </div>

                <div className="min-w-0 text-sm text-[#4e635d]">
                  <p className="font-medium">
                    {inquiry.service_interest || "General enquiry"}
                  </p>
                  <p className="mt-1 break-words text-[#60746e]">
                    {inquiry.page_path || "No page path"}
                  </p>
                </div>

                <div className="text-sm text-[#4e635d]">
                  <p className="font-semibold uppercase tracking-[0.16em] text-[#19564f]">
                    {inquiry.source || "Website"}
                  </p>
                </div>

                <div className="pt-1">
                  <BookingStatusPill status={inquiry.status} />
                </div>

                <div className="grid gap-3">
                  <select
                    value={inquiry.status}
                    onChange={(event) =>
                      handleInquiryStatusChange(inquiry.id, event.target.value)
                    }
                    className={selectClass}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDelete(deleteAdminInquiry, inquiry.id, "Enquiry")}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#f0cdc5] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b35342] transition-all duration-300 hover:bg-[#fff4f2]"
                  >
                    Delete
                  </button>
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
                        handleInquiryStatusChange(inquiry.id, event.target.value)
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
    </PanelCard>
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
