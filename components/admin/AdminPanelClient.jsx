"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  API_BASE_URL,
  deleteAdminRelaxationTherapy,
  deleteAdminService,
  loginAdmin,
  deleteAdminInquiry,
  updateAdminInquiry,
  updateAdminBooking,
} from "@/lib/api";

import { adminSectionGroups, adminSections } from "./admin-config";
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
  initialCredentials,
  initialRelaxationTherapyForm,
  initialServiceForm,
} from "./admin-form-defaults";
import {
  EntityPanel,
  Field,
  FieldInline,
  FlashMessage,
  FormModal,
  InfoStrip,
  PanelCard,
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
  const [bookings, setBookings] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [relaxationTherapyForm, setRelaxationTherapyForm] = useState(initialRelaxationTherapyForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingRelaxationTherapyId, setEditingRelaxationTherapyId] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isRelaxationTherapyModalOpen, setIsRelaxationTherapyModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [inquirySourceFilter, setInquirySourceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const currentSectionMeta =
    adminSections.find((section) => section.id === currentSection) ?? adminSections[0];

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

  const connectedLabel = lastLoadedAt ? "Active" : "Connecting...";

  useEffect(() => {
    const savedToken = window.localStorage.getItem("ssw-admin-token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (!token) return;

    loadAdminData({
      token,
      statusFilter,
      inquiryStatusFilter,
      inquirySourceFilter,
      setInquiries,
      setServices,
      setRelaxationTherapies,
      setTherapists,
      setBookings,
      setLastLoadedAt,
      setIsLoading,
      setErrorMessage,
      setToken,
    });
  }, [token, statusFilter, inquiryStatusFilter, inquirySourceFilter]);

  const refresh = () => {
    if (!token) return;
    refreshAdminData({
      token,
      statusFilter,
      inquiryStatusFilter,
      inquirySourceFilter,
      setInquiries,
      setServices,
      setRelaxationTherapies,
      setTherapists,
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
      setToken(data.token);
      window.localStorage.setItem("ssw-admin-token", data.token);
      setSuccessMessage("Login successful! Welcome to the admin portal.");
    } catch (error) {
      setErrorMessage(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("ssw-admin-token");
    router.push("/admin");
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
        benefits: payload.benefits
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
      setForm: setRelaxationTherapyForm,
      initialForm: initialRelaxationTherapyForm,
      setEditingId: setEditingRelaxationTherapyId,
      label: "Relaxation therapy",
    });
  }

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
      description: item.description,
      image: item.image,
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setIsServiceModalOpen(true);
  };

  const closeRelaxationTherapyModal = () => {
    setIsRelaxationTherapyModalOpen(false);
    setEditingRelaxationTherapyId(null);
    setRelaxationTherapyForm(initialRelaxationTherapyForm);
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
      benefits: item.benefits.join("\n"),
      image: item.image,
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setIsRelaxationTherapyModalOpen(true);
  };

  const tabCounts = {
    inquiries: inquiries.length,
    bookings: bookings.length,
    services: services.length,
    "relaxation-therapies": relaxationTherapies.length,
  };

  return (
    <AdminLayout
      adminSections={adminSections}
      currentSection={currentSection}
      handleLogout={handleLogout}
      tabCounts={tabCounts}
      isInitializing={isInitializing}
      token={token}
    >
      {!token ? (
        <AdminLogin
          handleLogin={handleLogin}
          credentials={credentials}
          setCredentials={setCredentials}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : (
        <div ref={contentRef} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col gap-10">
            {/* Header Section */}
            <div className="overflow-hidden rounded-[2.8rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,248,236,0.68))] p-6 shadow-[0_24px_80px_rgba(32,18,10,0.06)] backdrop-blur-xl md:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c29a2f]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c29a2f]">{currentSectionMeta.eyebrow}</p>
                </div>
                <h1 className="font-serif text-4xl font-semibold text-[#1f1a17] tracking-tighter md:text-5xl">{currentSectionMeta.title}</h1>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#7a726c] font-medium">
                  {currentSectionMeta.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#e6dac9] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f8376]">
                    API Driven
                  </span>
                  <span className="rounded-full border border-[#e6dac9] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f8376]">
                    Backend Synced
                  </span>
                </div>
              </div>
              <div className="grid shrink-0 gap-4 sm:grid-cols-2">
                <SummaryTile
                  label="Backend Status"
                  value={connectedLabel}
                  note={lastLoadedAt ? `Synced ${formatDate(lastLoadedAt)}` : "Initializing..."}
                  emphasis
                />
                <SummaryTile
                  label="Data Refresh"
                  value={isLoading ? "Refreshing..." : "Manual Sync"}
                  note="Update local data"
                  onClick={refresh}
                />
              </div>
            </div>
            </div>

            {/* Stats Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="New Enquiries" value={newInquiries} tone="dark" />
              <StatCard label="Total Bookings" value={bookings.length} />
              <StatCard label="Pending Approval" value={pendingBookings} />
              <StatCard label="Confirmed Sessions" value={confirmedBookings} />
              <StatCard label="Total Content" value={countActive(services) + countActive(relaxationTherapies)} />
            </div>

            {/* Quick Metrics */}
            <div className="grid gap-6 md:grid-cols-3">
              <InfoStrip title="CRM Queue" value={inquiries.length} detail="Contact and lead enquiries captured from the website." />
              <InfoStrip title="Service API" value={services.length} detail="Active service cards distributed to the public frontend." />
              <InfoStrip title="Expert Network" value={therapists.length} detail="Qualified experts available for therapy assignments." />
            </div>

            {/* Alerts */}
            {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
            {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

            {/* Main Content Area */}
            <div className="pt-4">
              {currentSection === "inquiries" ? (
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

              {currentSection === "bookings" ? (
                <BookingsPanel
                  bookings={bookings}
                  isLoading={isLoading}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  therapists={therapists}
                  handleBookingLifecycleChange={handleBookingLifecycleChange}
                />
              ) : null}

              {currentSection === "services" ? (
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
                      body={item.description}
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

              {currentSection === "relaxation-therapies" ? (
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
                      body={`${item.short_description}\n\n${item.details}\n\nBenefits: ${item.benefits.join(", ")}`}
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
                      <textarea
                        value={relaxationTherapyForm.benefits}
                        onChange={(event) =>
                          setRelaxationTherapyForm((current) => ({
                            ...current,
                            benefits: event.target.value,
                          }))
                        }
                        className={textAreaClass}
                        rows="5"
                        required
                      />
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
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-2">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[#1f1a17] tracking-tight">Recent Enquiries</h2>
          <p className="mt-1 text-sm text-[#7a726c] font-medium">Real-time therapy requests from the website.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-[1.4rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/5">
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
        <div className="rounded-[3rem] border border-dashed border-black/10 bg-white/40 px-5 py-24 text-center backdrop-blur-sm">
          <p className="text-sm text-[#7a726c]">No bookings found for the current filter.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-[0_20px_60px_rgba(32,18,10,0.04)] transition-all duration-500 hover:shadow-[0_32px_100px_rgba(32,18,10,0.08)]"
            >
              <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center rounded-full bg-[#c29a2f]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c29a2f]">
                          {booking.reference_code}
                        </span>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#a0948c]">
                          Created {formatDate(booking.created_at)}
                        </p>
                      </div>
                      <h3 className="font-serif text-3xl font-semibold text-[#1f1a17] tracking-tight">
                        {booking.customer_name}
                      </h3>
                      <p className="mt-3 text-[16px] text-[#5c544f] font-medium leading-relaxed">
                        Interested in <span className="text-[#1f1a17] font-bold underline decoration-[#c29a2f]/30 underline-offset-4">{booking.therapy_name}</span>
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

                <div className="relative rounded-[2rem] bg-[#f8f6f1] p-8 border border-black/5 self-start">
                  <div className="space-y-6">
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
                            therapist_id: Number(event.target.value),
                          })
                        }
                        className={`${selectClass} w-full`}
                      >
                        <option value="" disabled>
                          Choose Expert
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
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-[#eadfcf] bg-[linear-gradient(180deg,#fdf8f1,#f7f0e6)] p-5">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-[#1f1a17]">
              Recent Enquiries
            </h3>
            <p className="mt-1 text-sm font-medium text-[#7a726c]">
              Real-time therapy requests from the website.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-[#3a3028] shadow-[0_10px_24px_rgba(55,38,19,0.05)]">
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
        <div className="mt-6 rounded-[1.6rem] border border-dashed border-[#d8cab6] bg-[linear-gradient(180deg,#fcfaf6,#f4ede4)] px-5 py-14 text-center text-sm text-[#7a726c]">
          No enquiries found for the current filter.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#eadfcf] bg-white shadow-[0_18px_48px_rgba(55,38,19,0.06)]">
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1.1fr_1fr_0.9fr_0.8fr_0.9fr_1fr] gap-4 border-b border-[#efe2d2] bg-[linear-gradient(180deg,#fcf7f0,#f7efe5)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a7766]">
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
                className="grid grid-cols-[1.1fr_1fr_0.9fr_0.8fr_0.9fr_1fr] gap-4 border-b border-[#f3e8db] px-6 py-5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[#1f1a17]">{inquiry.name}</p>
                  <p className="mt-1 text-sm text-[#7a726c]">
                    {inquiry.topic || "General enquiry"}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f554d]">
                    {inquiry.message}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#9a876e]">
                    {formatDate(inquiry.created_at)}
                  </p>
                </div>

                <div className="min-w-0 text-sm text-[#4e4339]">
                  <p className="font-medium">{inquiry.phone || "No phone"}</p>
                  <p className="mt-1 break-words text-[#7a726c]">
                    {inquiry.email || "No email"}
                  </p>
                </div>

                <div className="min-w-0 text-sm text-[#4e4339]">
                  <p className="font-medium">
                    {inquiry.service_interest || "General enquiry"}
                  </p>
                  <p className="mt-1 break-words text-[#7a726c]">
                    {inquiry.page_path || "No page path"}
                  </p>
                </div>

                <div className="text-sm text-[#4e4339]">
                  <p className="font-semibold uppercase tracking-[0.16em] text-[#a88528]">
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
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-red-100 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-red-600 transition-all duration-300 hover:bg-red-50"
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
                className="rounded-[1.6rem] border border-[#efe2d2] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,241,233,0.92))] p-5 shadow-[0_12px_36px_rgba(55,38,19,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#a88528]">
                      {inquiry.source || "Website"}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1f1a17]">
                      {inquiry.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#7a726c]">
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

                <div className="mt-4 grid gap-3 rounded-[1.4rem] border border-[#eadfcf] bg-[linear-gradient(180deg,#fcf7f0,#f5ede3)] p-4">
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
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-red-100 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-red-600 transition-all duration-300 hover:bg-red-50"
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
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} animate-pulse`} />
      {toTitleCase(status)}
    </span>
  );
}
