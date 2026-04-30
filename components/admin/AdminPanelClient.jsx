"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { apiRequest, API_BASE_URL } from "@/lib/api";

import { adminSections } from "./admin-config";
import { countActive, formatDate, formatDateOnly, loadAdminData, refreshAdminData, submitEntity, toTitleCase } from "./admin-data";
import {
  initialAlternativeTreatmentForm,
  initialBookingSlotForm,
  initialCredentials,
  initialNadiCampForm,
  initialPanchakarmaCoreForm,
  initialPanchakarmaOtherForm,
  initialRelaxationTherapyForm,
  initialServiceForm,
  initialTherapistBlackoutForm,
  initialTherapistForm,
  initialTherapistScheduleForm,
  initialTestimonialForm,
  advancedBookingStatusOptions,
  bookingStatusOptions,
  statusOptions,
  weekdayOptions,
} from "./admin-form-defaults";
import {
  EntityPanel,
  Field,
  FieldInline,
  FlashMessage,
  InfoStrip,
  PanelCard,
  RecordCard,
  ShowcaseCard,
  StatCard,
  SummaryTile,
  ToggleRow,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
  textAreaClass,
} from "./admin-ui";

export default function AdminPanelClient({ currentSection = "dashboard" }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [token, setToken] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [nadiCamps, setNadiCamps] = useState([]);
  const [relaxationTherapies, setRelaxationTherapies] = useState([]);
  const [bookingSlots, setBookingSlots] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [therapistSchedules, setTherapistSchedules] = useState([]);
  const [therapistBlackouts, setTherapistBlackouts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [alternativeTreatments, setAlternativeTreatments] = useState([]);
  const [panchakarmaCoreTherapies, setPanchakarmaCoreTherapies] = useState([]);
  const [panchakarmaOtherTreatments, setPanchakarmaOtherTreatments] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [testimonialForm, setTestimonialForm] = useState(initialTestimonialForm);
  const [nadiCampForm, setNadiCampForm] = useState(initialNadiCampForm);
  const [relaxationTherapyForm, setRelaxationTherapyForm] = useState(initialRelaxationTherapyForm);
  const [bookingSlotForm, setBookingSlotForm] = useState(initialBookingSlotForm);
  const [therapistForm, setTherapistForm] = useState(initialTherapistForm);
  const [therapistScheduleForm, setTherapistScheduleForm] = useState(initialTherapistScheduleForm);
  const [therapistBlackoutForm, setTherapistBlackoutForm] = useState(initialTherapistBlackoutForm);
  const [alternativeTreatmentForm, setAlternativeTreatmentForm] = useState(initialAlternativeTreatmentForm);
  const [panchakarmaCoreForm, setPanchakarmaCoreForm] = useState(initialPanchakarmaCoreForm);
  const [panchakarmaOtherForm, setPanchakarmaOtherForm] = useState(initialPanchakarmaOtherForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [editingNadiCampId, setEditingNadiCampId] = useState(null);
  const [editingRelaxationTherapyId, setEditingRelaxationTherapyId] = useState(null);
  const [editingBookingSlotId, setEditingBookingSlotId] = useState(null);
  const [editingTherapistId, setEditingTherapistId] = useState(null);
  const [editingTherapistScheduleId, setEditingTherapistScheduleId] = useState(null);
  const [editingTherapistBlackoutId, setEditingTherapistBlackoutId] = useState(null);
  const [editingAlternativeTreatmentId, setEditingAlternativeTreatmentId] = useState(null);
  const [editingPanchakarmaCoreId, setEditingPanchakarmaCoreId] = useState(null);
  const [editingPanchakarmaOtherId, setEditingPanchakarmaOtherId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedToken = window.localStorage.getItem("ssw-admin-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadAdminData({
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
  }, [token, statusFilter]);

  useEffect(() => {
    if (!token || !contentRef.current) return;
    contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentSection, token]);

  const refresh = async () =>
    refreshAdminData(
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
    );

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await apiRequest("/api/v1/admin/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      window.localStorage.setItem("ssw-admin-token", result.access_token);
      setToken(result.access_token);
      setCredentials(initialCredentials);
      setSuccessMessage("Admin login successful.");
      router.replace(currentSection === "dashboard" ? "/admin" : `/admin/${currentSection}`);
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("ssw-admin-token");
    setToken("");
    setDashboard(null);
    setInquiries([]);
    setServices([]);
    setTestimonials([]);
    setNadiCamps([]);
    setRelaxationTherapies([]);
    setBookingSlots([]);
    setTherapists([]);
    setTherapistSchedules([]);
    setTherapistBlackouts([]);
    setBookings([]);
    setAlternativeTreatments([]);
    setPanchakarmaCoreTherapies([]);
    setPanchakarmaOtherTreatments([]);
    setStatusFilter("all");
    setSuccessMessage("");
    setErrorMessage("");
    router.replace("/admin");
  };

  const handleInquiryStatusChange = async (inquiryId, nextStatus) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await apiRequest(`/api/v1/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: nextStatus }),
      });
      await refresh();
      setSuccessMessage("Enquiry status updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update enquiry");
    }
  };

  const handleDelete = async (type, id, label) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await apiRequest(`/api/v1/admin/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await refresh();
      setSuccessMessage(`${label} deleted.`);
    } catch (error) {
      setErrorMessage(error.message || `Unable to delete ${label}`);
    }
  };

  const handleBookingStatusChange = async (bookingId, nextStatus) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await apiRequest(`/api/v1/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: nextStatus }),
      });
      await refresh();
      setSuccessMessage("Booking status updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update booking");
    }
  };

  const handleBookingLifecycleChange = async (bookingId, payload) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await apiRequest(`/api/v1/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      await refresh();
      setSuccessMessage("Booking updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update booking");
    }
  };

  const makeSubmitHandler = (config) => async (event) => {
    event.preventDefault();
    await submitEntity({
      token,
      editingId: config.editingId,
      type: config.type,
      form: config.form,
      transformPayload: config.transformPayload,
      setForm: config.setForm,
      initialForm: config.initialForm,
      setEditingId: config.setEditingId,
      refresh,
      setErrorMessage,
      setSuccessMessage,
      setIsSubmitting,
      label: config.label,
    });
  };

  const handleServiceSubmit = makeSubmitHandler({
    editingId: editingServiceId,
    type: "services",
    form: serviceForm,
    setForm: setServiceForm,
    initialForm: initialServiceForm,
    setEditingId: setEditingServiceId,
    label: "Service",
  });

  const handleTestimonialSubmit = makeSubmitHandler({
    editingId: editingTestimonialId,
    type: "testimonials",
    form: testimonialForm,
    setForm: setTestimonialForm,
    initialForm: initialTestimonialForm,
    setEditingId: setEditingTestimonialId,
    label: "Testimonial",
  });

  const handleNadiCampSubmit = makeSubmitHandler({
    editingId: editingNadiCampId,
    type: "nadi-camps",
    form: nadiCampForm,
    setForm: setNadiCampForm,
    initialForm: initialNadiCampForm,
    setEditingId: setEditingNadiCampId,
    label: "Nadi camp",
  });

  const handleRelaxationTherapySubmit = makeSubmitHandler({
    editingId: editingRelaxationTherapyId,
    type: "relaxation-therapies",
    form: relaxationTherapyForm,
    setForm: setRelaxationTherapyForm,
    initialForm: initialRelaxationTherapyForm,
    setEditingId: setEditingRelaxationTherapyId,
    label: "Relaxation therapy",
    transformPayload: (form) => ({
      ...form,
      benefits: form.benefits.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    }),
  });

  const handleAlternativeTreatmentSubmit = makeSubmitHandler({
    editingId: editingAlternativeTreatmentId,
    type: "alternative-treatments",
    form: alternativeTreatmentForm,
    setForm: setAlternativeTreatmentForm,
    initialForm: initialAlternativeTreatmentForm,
    setEditingId: setEditingAlternativeTreatmentId,
    label: "Alternative treatment",
  });

  const handleBookingSlotSubmit = makeSubmitHandler({
    editingId: editingBookingSlotId,
    type: "booking-slots",
    form: bookingSlotForm,
    setForm: setBookingSlotForm,
    initialForm: initialBookingSlotForm,
    setEditingId: setEditingBookingSlotId,
    label: "Booking slot",
  });

  const handleTherapistSubmit = makeSubmitHandler({
    editingId: editingTherapistId,
    type: "therapists",
    form: therapistForm,
    setForm: setTherapistForm,
    initialForm: initialTherapistForm,
    setEditingId: setEditingTherapistId,
    label: "Therapist",
    transformPayload: (form) => ({
      ...form,
      specialties: form.specialties.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    }),
  });

  const handleTherapistScheduleSubmit = makeSubmitHandler({
    editingId: editingTherapistScheduleId,
    type: "therapist-availabilities",
    form: therapistScheduleForm,
    setForm: setTherapistScheduleForm,
    initialForm: initialTherapistScheduleForm,
    setEditingId: setEditingTherapistScheduleId,
    label: "Therapist schedule",
    transformPayload: (form) => ({
      ...form,
      therapist_id: Number(form.therapist_id),
      day_of_week: Number(form.day_of_week),
      slot_interval_minutes: Number(form.slot_interval_minutes),
      max_bookings_per_slot: Number(form.max_bookings_per_slot),
    }),
  });

  const handleTherapistBlackoutSubmit = makeSubmitHandler({
    editingId: editingTherapistBlackoutId,
    type: "therapist-blackouts",
    form: therapistBlackoutForm,
    setForm: setTherapistBlackoutForm,
    initialForm: initialTherapistBlackoutForm,
    setEditingId: setEditingTherapistBlackoutId,
    label: "Therapist blackout",
    transformPayload: (form) => ({
      ...form,
      therapist_id: Number(form.therapist_id),
      start_time: form.start_time || null,
      end_time: form.end_time || null,
    }),
  });

  const handlePanchakarmaCoreSubmit = makeSubmitHandler({
    editingId: editingPanchakarmaCoreId,
    type: "panchakarma-core-therapies",
    form: panchakarmaCoreForm,
    setForm: setPanchakarmaCoreForm,
    initialForm: initialPanchakarmaCoreForm,
    setEditingId: setEditingPanchakarmaCoreId,
    label: "Panchakarma core therapy",
    transformPayload: (form) => ({
      ...form,
      benefits: form.benefits.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    }),
  });

  const handlePanchakarmaOtherSubmit = makeSubmitHandler({
    editingId: editingPanchakarmaOtherId,
    type: "panchakarma-other-treatments",
    form: panchakarmaOtherForm,
    setForm: setPanchakarmaOtherForm,
    initialForm: initialPanchakarmaOtherForm,
    setEditingId: setEditingPanchakarmaOtherId,
    label: "Panchakarma other treatment",
  });

  const activeMeta = adminSections.find((section) => section.id === currentSection) || adminSections[0];
  const tabCounts = {
    dashboard: inquiries.length,
    services: services.length,
    testimonials: testimonials.length,
    "nadi-camps": nadiCamps.length,
    "relaxation-therapies": relaxationTherapies.length,
    "booking-slots": bookingSlots.length,
    therapists: therapists.length,
    "therapist-schedules": therapistSchedules.length,
    "therapist-blackouts": therapistBlackouts.length,
    bookings: bookings.length,
    "alternative-treatments": alternativeTreatments.length,
    "panchakarma-core": panchakarmaCoreTherapies.length,
    "panchakarma-other": panchakarmaOtherTreatments.length,
  };
  const totalContentItems =
    services.length +
    testimonials.length +
    nadiCamps.length +
    relaxationTherapies.length +
    bookingSlots.length +
    therapists.length +
    therapistSchedules.length +
    therapistBlackouts.length +
    bookings.length +
    alternativeTreatments.length +
    panchakarmaCoreTherapies.length +
    panchakarmaOtherTreatments.length;
  const totalActiveItems =
    countActive(services) +
    countActive(testimonials) +
    countActive(nadiCamps) +
    countActive(relaxationTherapies) +
    countActive(bookingSlots) +
    countActive(therapists) +
    countActive(therapistSchedules) +
    countActive(therapistBlackouts) +
    countActive(alternativeTreatments) +
    countActive(panchakarmaCoreTherapies) +
    countActive(panchakarmaOtherTreatments);

  if (!token) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7ead3,transparent_30%),linear-gradient(180deg,#f7f0e6_0%,#efe4d4_100%)] px-4 py-8 text-[#23160f] md:px-6 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-[40px] bg-[#2e190f] p-8 text-white shadow-[0_28px_90px_rgba(46,25,15,0.24)] md:p-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#e1bf6f]">Sri Sri Wellbeing Chennai</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">A fresh admin workspace for backend content and enquiries.</h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/74">
              This layout is rebuilt for easier section routing, clearer content control, and smoother day-to-day admin work.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ShowcaseCard label="Backend API" value={API_BASE_URL} />
              <ShowcaseCard label="Admin Routes" value="/admin and /admin/[section]" />
              <ShowcaseCard label="Collections" value="Services, camps, therapies, testimonials, enquiries" />
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {adminSections.map((section) => (
                <div key={section.id} className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#dcb85f]">{section.eyebrow}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{section.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[40px] border border-[#ead9c2] bg-white/96 p-8 shadow-[0_24px_60px_rgba(32,18,10,0.08)] md:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#b88f28]">Admin Login</p>
            <h2 className="mt-4 text-3xl font-bold text-[#17110d]">Open the content desk</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#6a6058]">Use the admin email and password configured in `backend/.env`.</p>

            <form onSubmit={handleLogin} className="mt-8 grid gap-5">
              {errorMessage && <FlashMessage tone="error" message={errorMessage} />}
              {successMessage && <FlashMessage tone="success" message={successMessage} />}
              <Field label="Email">
                <input type="email" value={credentials.email} onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))} className={inputClass} placeholder="admin@srisriwellbeingchennai.com" required />
              </Field>
              <Field label="Password">
                <input type="password" value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} className={inputClass} placeholder="Enter your password" required />
              </Field>
              <button type="submit" disabled={isSubmitting} className="inline-flex h-14 items-center justify-center rounded-[18px] bg-[#b88722] px-8 text-[15px] font-bold text-white transition hover:bg-[#9f751d] disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "Signing in..." : "Enter Admin"}
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7ead3,transparent_28%),linear-gradient(180deg,#f7f1e7_0%,#efe4d6_100%)] px-4 py-4 text-[#23160f] md:px-6 md:py-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-[32px] bg-[#2f190f] p-4 text-white shadow-[0_28px_90px_rgba(47,25,15,0.22)] xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-hidden">
          <div className="flex h-full min-h-0 flex-col">
            <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f5e5bf] p-2">
                  <Image src="/images/Image-01.png" alt="Sri Sri Wellbeing Chennai" width={40} height={40} className="h-10 w-10 object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d9bc66]">Admin Workspace</p>
                  <h1 className="mt-1 text-lg font-bold leading-tight text-white">Sri Sri Wellbeing</h1>
                  <p className="mt-1 text-xs text-white/65">Content control desk</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/72">Manage content collections and enquiry handling from one routed admin workspace.</p>
            </div>

            <nav className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 pb-4">
              {adminSections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`block rounded-[18px] px-4 py-3 transition ${
                    currentSection === section.id
                      ? "bg-[#f5e5bf] text-[#2f190f] shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
                      : "border border-white/10 bg-white/6 text-white/78 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${currentSection === section.id ? "text-[#8d6a10]" : "text-white/45"}`}>{section.eyebrow}</p>
                      <p className="mt-1 text-[14px] font-semibold leading-6">{section.label}</p>
                    </div>
                    <span className={`inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 text-[11px] font-bold ${currentSection === section.id ? "bg-[#2f190f] text-[#f6e8c8]" : "bg-white/10 text-white"}`}>
                      {tabCounts[section.id]}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>

            <button type="button" onClick={handleLogout} className="mt-4 inline-flex h-12 shrink-0 items-center justify-center rounded-[18px] border border-white/12 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10">
              Logout
            </button>
          </div>
        </aside>

        <section ref={contentRef} className="min-w-0">
          <header className="rounded-[32px] border border-[#e7d9c7] bg-white/92 p-6 shadow-[0_20px_60px_rgba(32,18,10,0.06)] backdrop-blur">
            <div className="flex flex-col gap-6 2xl:grid 2xl:grid-cols-[minmax(0,1fr)_560px] 2xl:items-start">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#b58b27]">{activeMeta.eyebrow}</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-[0.95] text-[#17110d] md:text-[3.25rem]">{activeMeta.title}</h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#6a6058]">{activeMeta.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryTile label="Enquiries" value={dashboard?.total_inquiries ?? 0} note="Total enquiry records" emphasis />
                <SummaryTile label="Content Rows" value={totalContentItems} note="All managed content rows" />
                <SummaryTile label="Active Rows" value={totalActiveItems} note="Visible content records" />
                <SummaryTile label="Status" value={isLoading ? "Syncing" : "Ready"} note={isLoading ? "Refreshing records" : "Admin data available"} />
                <SummaryTile label="Route" value={currentSection === "dashboard" ? "/admin" : `/admin/${currentSection}`} note="Current section slug" />
                <SummaryTile label="Backend" value="Connected" note={API_BASE_URL} />
              </div>
            </div>

            <div className="mt-5 overflow-x-auto pb-1 xl:hidden">
              <div className="flex gap-3">
                {adminSections.map((section) => (
                  <Link
                    key={`mobile-${section.id}`}
                    href={section.href}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      currentSection === section.id ? "bg-[#2f190f] text-white" : "border border-[#e3d5c3] bg-[#fcfaf6] text-[#2f190f]"
                    }`}
                  >
                    <span>{section.label}</span>
                    <span className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-[11px] ${currentSection === section.id ? "bg-white/15 text-white" : "bg-[#efe2cd] text-[#7d5d14]"}`}>
                      {tabCounts[section.id]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <div className="mt-5 space-y-5">
            {errorMessage && <FlashMessage tone="error" message={errorMessage} />}
            {successMessage && <FlashMessage tone="success" message={successMessage} />}
          </div>

          {currentSection === "dashboard" && (
            <>
              <section className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
                <StatCard label="Total Enquiries" value={dashboard?.total_inquiries ?? 0} tone="dark" />
                <StatCard label="New" value={dashboard?.new_inquiries ?? 0} />
                <StatCard label="Contacted" value={dashboard?.contacted_inquiries ?? 0} />
                <StatCard label="Closed" value={dashboard?.closed_inquiries ?? 0} />
              </section>

              <section className="mt-6 grid gap-4 lg:grid-cols-3">
                <InfoStrip title="Content Inventory" value={totalContentItems} detail="Rows across all admin-managed collections" />
                <InfoStrip title="Visible Content" value={totalActiveItems} detail="Active records marked for future public sync" />
                <InfoStrip title="Write Target" value="MySQL" detail="All admin actions write directly to the backend database" />
              </section>

              <section className="mt-6 rounded-[32px] border border-[#eadfce] bg-white p-5 shadow-[0_20px_50px_rgba(32,18,10,0.06)] md:p-6">
                <div className="flex flex-col gap-4 border-b border-[#f0e6d9] pb-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ba8f2a]">Enquiry Desk</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#17110d]">Review and update enquiry status</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b625a]">{isLoading ? "Refreshing records..." : `${inquiries.length} enquiries loaded for the selected filter.`}</p>
                  </div>
                  <FieldInline label="Filter status">
                    <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={selectClass}>
                      <option value="all">All enquiries</option>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {toTitleCase(option)}
                        </option>
                      ))}
                    </select>
                  </FieldInline>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-[#efe4d4] text-left text-[12px] uppercase tracking-[0.18em] text-[#7b726c]">
                        <th className="px-4 py-4">Contact</th>
                        <th className="px-4 py-4">Topic</th>
                        <th className="px-4 py-4">Message</th>
                        <th className="px-4 py-4">Received</th>
                        <th className="px-4 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-14 text-center text-sm text-[#6b625a]">No enquiries found for the selected filter.</td>
                        </tr>
                      ) : (
                        inquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="border-b border-[#f5ecdf] align-top last:border-b-0">
                            <td className="px-4 py-5">
                              <p className="font-semibold text-[#17110d]">{inquiry.name}</p>
                              <a href={`mailto:${inquiry.email}`} className="mt-2 block text-sm text-[#7a5d1d] hover:underline">{inquiry.email}</a>
                              <a href={`tel:${inquiry.phone}`} className="mt-1 block text-sm text-[#645b54]">{inquiry.phone}</a>
                            </td>
                            <td className="px-4 py-5 text-sm font-medium text-[#17110d]">{inquiry.topic}</td>
                            <td className="px-4 py-5 text-sm leading-7 text-[#645b54]">{inquiry.message}</td>
                            <td className="px-4 py-5 text-sm text-[#645b54]">{formatDate(inquiry.created_at)}</td>
                            <td className="px-4 py-5">
                              <select value={inquiry.status} onChange={(event) => handleInquiryStatusChange(inquiry.id, event.target.value)} className={selectClass}>
                                {statusOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {toTitleCase(option)}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {currentSection === "services" && (
            <EntityPanel
              eyebrow="Content Editor"
              title={editingServiceId ? "Edit service card" : "Create service card"}
              subtitle="These records stay in the backend admin now and are ready for future public sync."
              renderFields={
                <>
                  <Field label="Title"><input value={serviceForm.title} onChange={(event) => setServiceForm((current) => ({ ...current, title: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Image Path"><input value={serviceForm.image} onChange={(event) => setServiceForm((current) => ({ ...current, image: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={serviceForm.sort_order} onChange={(event) => setServiceForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Description"><textarea value={serviceForm.description} onChange={(event) => setServiceForm((current) => ({ ...current, description: event.target.value }))} className={textAreaClass} rows="6" required /></Field>
                </>
              }
              checked={serviceForm.is_active}
              onToggleChange={(value) => setServiceForm((current) => ({ ...current, is_active: value }))}
              editingId={editingServiceId}
              setEditingId={setEditingServiceId}
              setForm={setServiceForm}
              initialForm={initialServiceForm}
              onSubmit={handleServiceSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Service"
              listingTitle="Current services"
              listingSubtitle={`${services.length} records in MySQL`}
              items={services}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.title} meta={`Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={item.description} extra={item.image} onEdit={() => { setEditingServiceId(item.id); setServiceForm({ title: item.title, description: item.description, image: item.image, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("services", item.id, "Service")} />
              )}
            />
          )}

          {currentSection === "testimonials" && (
            <EntityPanel
              eyebrow="Content Editor"
              title={editingTestimonialId ? "Edit testimonial" : "Create testimonial"}
              subtitle="Maintain testimonial ordering and visibility from the admin panel."
              renderFields={
                <>
                  <Field label="Name"><input value={testimonialForm.name} onChange={(event) => setTestimonialForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={testimonialForm.sort_order} onChange={(event) => setTestimonialForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Review"><textarea value={testimonialForm.review} onChange={(event) => setTestimonialForm((current) => ({ ...current, review: event.target.value }))} className={textAreaClass} rows="8" required /></Field>
                </>
              }
              checked={testimonialForm.is_active}
              onToggleChange={(value) => setTestimonialForm((current) => ({ ...current, is_active: value }))}
              editingId={editingTestimonialId}
              setEditingId={setEditingTestimonialId}
              setForm={setTestimonialForm}
              initialForm={initialTestimonialForm}
              onSubmit={handleTestimonialSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Testimonial"
              listingTitle="Current testimonials"
              listingSubtitle={`${testimonials.length} records in MySQL`}
              items={testimonials}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.name} meta={`Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={item.review} onEdit={() => { setEditingTestimonialId(item.id); setTestimonialForm({ name: item.name, review: item.review, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("testimonials", item.id, "Testimonial")} />
              )}
            />
          )}

          {currentSection === "nadi-camps" && (
            <EntityPanel
              eyebrow="Camp Planner"
              title={editingNadiCampId ? "Edit Nadi Camp" : "Create Nadi Camp"}
              subtitle="Store upcoming camp entries in the backend admin collection."
              renderFields={
                <>
                  <Field label="Doctor"><input value={nadiCampForm.doctor} onChange={(event) => setNadiCampForm((current) => ({ ...current, doctor: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Camp Date"><input type="date" value={nadiCampForm.camp_date} onChange={(event) => setNadiCampForm((current) => ({ ...current, camp_date: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Location"><input value={nadiCampForm.location} onChange={(event) => setNadiCampForm((current) => ({ ...current, location: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Contact"><input value={nadiCampForm.contact} onChange={(event) => setNadiCampForm((current) => ({ ...current, contact: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={nadiCampForm.sort_order} onChange={(event) => setNadiCampForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Address"><textarea value={nadiCampForm.address} onChange={(event) => setNadiCampForm((current) => ({ ...current, address: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                </>
              }
              checked={nadiCampForm.is_active}
              onToggleChange={(value) => setNadiCampForm((current) => ({ ...current, is_active: value }))}
              editingId={editingNadiCampId}
              setEditingId={setEditingNadiCampId}
              setForm={setNadiCampForm}
              initialForm={initialNadiCampForm}
              onSubmit={handleNadiCampSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Nadi Camp"
              listingTitle="Current Nadi Camps"
              listingSubtitle={`${nadiCamps.length} records in MySQL`}
              items={nadiCamps}
              renderItem={(item) => (
                <RecordCard key={item.id} title={`${item.doctor} | ${item.location}`} meta={`${formatDateOnly(item.camp_date)} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={item.address} extra={item.contact} onEdit={() => { setEditingNadiCampId(item.id); setNadiCampForm({ doctor: item.doctor, camp_date: item.camp_date, location: item.location, contact: item.contact, address: item.address, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("nadi-camps", item.id, "Nadi camp")} />
              )}
            />
          )}

          {currentSection === "relaxation-therapies" && (
            <EntityPanel
              eyebrow="Therapy Editor"
              title={editingRelaxationTherapyId ? "Edit relaxation therapy" : "Create relaxation therapy"}
              subtitle="Benefits should be entered one item per line."
              renderFields={
                <>
                  <Field label="Title"><input value={relaxationTherapyForm.title} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, title: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Duration"><input value={relaxationTherapyForm.duration} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, duration: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Image Path"><input value={relaxationTherapyForm.image} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, image: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={relaxationTherapyForm.sort_order} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Short Description"><textarea value={relaxationTherapyForm.short_description} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, short_description: event.target.value }))} className={textAreaClass} rows="4" required /></Field>
                  <Field label="Detailed Description"><textarea value={relaxationTherapyForm.details} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, details: event.target.value }))} className={textAreaClass} rows="6" required /></Field>
                  <Field label="Benefits (one per line)"><textarea value={relaxationTherapyForm.benefits} onChange={(event) => setRelaxationTherapyForm((current) => ({ ...current, benefits: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                </>
              }
              checked={relaxationTherapyForm.is_active}
              onToggleChange={(value) => setRelaxationTherapyForm((current) => ({ ...current, is_active: value }))}
              editingId={editingRelaxationTherapyId}
              setEditingId={setEditingRelaxationTherapyId}
              setForm={setRelaxationTherapyForm}
              initialForm={initialRelaxationTherapyForm}
              onSubmit={handleRelaxationTherapySubmit}
              isSubmitting={isSubmitting}
              saveLabel="Relaxation Therapy"
              listingTitle="Current relaxation therapies"
              listingSubtitle={`${relaxationTherapies.length} records in MySQL`}
              items={relaxationTherapies}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.title} meta={`${item.duration} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={`${item.short_description}\n\n${item.benefits.join(", ")}`} extra={item.image} onEdit={() => { setEditingRelaxationTherapyId(item.id); setRelaxationTherapyForm({ title: item.title, duration: item.duration, short_description: item.short_description, details: item.details, benefits: item.benefits.join("\n"), image: item.image, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("relaxation-therapies", item.id, "Relaxation therapy")} />
              )}
            />
          )}

          {currentSection === "booking-slots" && (
            <EntityPanel
              eyebrow="Slot Manager"
              title={editingBookingSlotId ? "Edit therapy slot" : "Create therapy slot"}
              subtitle="Use one slot per therapy, date, and time window. Capacity controls how many bookings can be accepted."
              renderFields={
                <>
                  <Field label="Therapy Name"><input value={bookingSlotForm.therapy_name} onChange={(event) => setBookingSlotForm((current) => ({ ...current, therapy_name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Booking Date"><input type="date" value={bookingSlotForm.booking_date} onChange={(event) => setBookingSlotForm((current) => ({ ...current, booking_date: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Start Time"><input type="time" value={bookingSlotForm.start_time} onChange={(event) => setBookingSlotForm((current) => ({ ...current, start_time: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="End Time"><input type="time" value={bookingSlotForm.end_time} onChange={(event) => setBookingSlotForm((current) => ({ ...current, end_time: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Capacity"><input type="number" value={bookingSlotForm.capacity} onChange={(event) => setBookingSlotForm((current) => ({ ...current, capacity: Number(event.target.value) }))} className={inputClass} min="1" required /></Field>
                </>
              }
              checked={bookingSlotForm.is_active}
              onToggleChange={(value) => setBookingSlotForm((current) => ({ ...current, is_active: value }))}
              editingId={editingBookingSlotId}
              setEditingId={setEditingBookingSlotId}
              setForm={setBookingSlotForm}
              initialForm={initialBookingSlotForm}
              onSubmit={handleBookingSlotSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Booking Slot"
              listingTitle="Current therapy slots"
              listingSubtitle={`${bookingSlots.length} slot windows in MySQL`}
              items={bookingSlots}
              renderItem={(item) => (
                <RecordCard key={item.id} title={`${item.therapy_name} | ${formatDateOnly(item.booking_date)}`} meta={`${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)} | Capacity ${item.capacity} | ${item.is_active ? "Active" : "Hidden"}`} body="Slot available for public booking requests." onEdit={() => { setEditingBookingSlotId(item.id); setBookingSlotForm({ therapy_name: item.therapy_name, booking_date: item.booking_date, start_time: item.start_time.slice(0, 5), end_time: item.end_time.slice(0, 5), capacity: item.capacity, is_active: item.is_active }); }} onDelete={() => handleDelete("booking-slots", item.id, "Booking slot")} />
              )}
            />
          )}

          {currentSection === "therapists" && (
            <EntityPanel
              eyebrow="Operations"
              title={editingTherapistId ? "Edit therapist" : "Add therapist"}
              subtitle="Create therapist profiles and map which therapies each therapist can cover."
              renderFields={
                <>
                  <Field label="Full Name"><input value={therapistForm.full_name} onChange={(event) => setTherapistForm((current) => ({ ...current, full_name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Email"><input type="email" value={therapistForm.email} onChange={(event) => setTherapistForm((current) => ({ ...current, email: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Phone"><input value={therapistForm.phone} onChange={(event) => setTherapistForm((current) => ({ ...current, phone: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Specialties (one per line)"><textarea value={therapistForm.specialties} onChange={(event) => setTherapistForm((current) => ({ ...current, specialties: event.target.value }))} className={textAreaClass} rows="4" required /></Field>
                  <Field label="Bio"><textarea value={therapistForm.bio} onChange={(event) => setTherapistForm((current) => ({ ...current, bio: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                </>
              }
              checked={therapistForm.is_active}
              onToggleChange={(value) => setTherapistForm((current) => ({ ...current, is_active: value }))}
              editingId={editingTherapistId}
              setEditingId={setEditingTherapistId}
              setForm={setTherapistForm}
              initialForm={initialTherapistForm}
              onSubmit={handleTherapistSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Therapist"
              listingTitle="Therapist roster"
              listingSubtitle={`${therapists.length} therapist profiles`}
              items={therapists}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.full_name} meta={`${item.email} | ${item.phone} | ${item.is_active ? "Active" : "Inactive"}`} body={`${item.bio}\n\nSpecialties: ${item.specialties.join(", ")}`} onEdit={() => { setEditingTherapistId(item.id); setTherapistForm({ full_name: item.full_name, email: item.email, phone: item.phone, specialties: item.specialties.join("\n"), bio: item.bio, is_active: item.is_active }); }} onDelete={() => handleDelete("therapists", item.id, "Therapist")} />
              )}
            />
          )}

          {currentSection === "therapist-schedules" && (
            <EntityPanel
              eyebrow="Operations"
              title={editingTherapistScheduleId ? "Edit weekly schedule" : "Add weekly schedule"}
              subtitle="Set weekly recurring availability for a therapist and therapy combination."
              renderFields={
                <>
                  <Field label="Therapist">
                    <select value={therapistScheduleForm.therapist_id} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, therapist_id: event.target.value }))} className={inputClass} required>
                      <option value="">Select therapist</option>
                      {therapists.map((therapist) => <option key={therapist.id} value={therapist.id}>{therapist.full_name}</option>)}
                    </select>
                  </Field>
                  <Field label="Therapy Name"><input value={therapistScheduleForm.therapy_name} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, therapy_name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Day of Week">
                    <select value={therapistScheduleForm.day_of_week} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, day_of_week: Number(event.target.value) }))} className={inputClass} required>
                      {weekdayOptions.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Start Time"><input type="time" value={therapistScheduleForm.start_time} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, start_time: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="End Time"><input type="time" value={therapistScheduleForm.end_time} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, end_time: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Slot Interval Minutes"><input type="number" value={therapistScheduleForm.slot_interval_minutes} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, slot_interval_minutes: Number(event.target.value) }))} className={inputClass} min="15" required /></Field>
                  <Field label="Max Bookings Per Slot"><input type="number" value={therapistScheduleForm.max_bookings_per_slot} onChange={(event) => setTherapistScheduleForm((current) => ({ ...current, max_bookings_per_slot: Number(event.target.value) }))} className={inputClass} min="1" required /></Field>
                </>
              }
              checked={therapistScheduleForm.is_active}
              onToggleChange={(value) => setTherapistScheduleForm((current) => ({ ...current, is_active: value }))}
              editingId={editingTherapistScheduleId}
              setEditingId={setEditingTherapistScheduleId}
              setForm={setTherapistScheduleForm}
              initialForm={initialTherapistScheduleForm}
              onSubmit={handleTherapistScheduleSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Therapist Schedule"
              listingTitle="Weekly schedule rules"
              listingSubtitle={`${therapistSchedules.length} recurring schedules`}
              items={therapistSchedules}
              renderItem={(item) => (
                <RecordCard key={item.id} title={`${therapists.find((therapist) => therapist.id === item.therapist_id)?.full_name || `Therapist #${item.therapist_id}`} | ${item.therapy_name}`} meta={`${weekdayOptions.find((day) => day.value === item.day_of_week)?.label} | ${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)} | Every ${item.slot_interval_minutes} mins | Cap ${item.max_bookings_per_slot}`} body={item.is_active ? "Active recurring schedule" : "Inactive recurring schedule"} onEdit={() => { setEditingTherapistScheduleId(item.id); setTherapistScheduleForm({ therapist_id: item.therapist_id, therapy_name: item.therapy_name, day_of_week: item.day_of_week, start_time: item.start_time.slice(0, 5), end_time: item.end_time.slice(0, 5), slot_interval_minutes: item.slot_interval_minutes, max_bookings_per_slot: item.max_bookings_per_slot, is_active: item.is_active }); }} onDelete={() => handleDelete("therapist-availabilities", item.id, "Therapist schedule")} />
              )}
            />
          )}

          {currentSection === "therapist-blackouts" && (
            <EntityPanel
              eyebrow="Operations"
              title={editingTherapistBlackoutId ? "Edit blackout date" : "Add blackout date"}
              subtitle="Use a full-day blackout by leaving the time range empty, or set partial unavailable hours."
              renderFields={
                <>
                  <Field label="Therapist">
                    <select value={therapistBlackoutForm.therapist_id} onChange={(event) => setTherapistBlackoutForm((current) => ({ ...current, therapist_id: event.target.value }))} className={inputClass} required>
                      <option value="">Select therapist</option>
                      {therapists.map((therapist) => <option key={therapist.id} value={therapist.id}>{therapist.full_name}</option>)}
                    </select>
                  </Field>
                  <Field label="Blackout Date"><input type="date" value={therapistBlackoutForm.blackout_date} onChange={(event) => setTherapistBlackoutForm((current) => ({ ...current, blackout_date: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Start Time"><input type="time" value={therapistBlackoutForm.start_time} onChange={(event) => setTherapistBlackoutForm((current) => ({ ...current, start_time: event.target.value }))} className={inputClass} /></Field>
                  <Field label="End Time"><input type="time" value={therapistBlackoutForm.end_time} onChange={(event) => setTherapistBlackoutForm((current) => ({ ...current, end_time: event.target.value }))} className={inputClass} /></Field>
                  <Field label="Reason"><textarea value={therapistBlackoutForm.reason} onChange={(event) => setTherapistBlackoutForm((current) => ({ ...current, reason: event.target.value }))} className={textAreaClass} rows="4" required /></Field>
                </>
              }
              checked={therapistBlackoutForm.is_active}
              onToggleChange={(value) => setTherapistBlackoutForm((current) => ({ ...current, is_active: value }))}
              editingId={editingTherapistBlackoutId}
              setEditingId={setEditingTherapistBlackoutId}
              setForm={setTherapistBlackoutForm}
              initialForm={initialTherapistBlackoutForm}
              onSubmit={handleTherapistBlackoutSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Therapist Blackout"
              listingTitle="Blocked dates and leave windows"
              listingSubtitle={`${therapistBlackouts.length} blackout rules`}
              items={therapistBlackouts}
              renderItem={(item) => (
                <RecordCard key={item.id} title={`${therapists.find((therapist) => therapist.id === item.therapist_id)?.full_name || `Therapist #${item.therapist_id}`} | ${formatDateOnly(item.blackout_date)}`} meta={`${item.start_time ? `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}` : "Full day"} | ${item.is_active ? "Active" : "Inactive"}`} body={item.reason} onEdit={() => { setEditingTherapistBlackoutId(item.id); setTherapistBlackoutForm({ therapist_id: item.therapist_id, blackout_date: item.blackout_date, start_time: item.start_time ? item.start_time.slice(0, 5) : "", end_time: item.end_time ? item.end_time.slice(0, 5) : "", reason: item.reason, is_active: item.is_active }); }} onDelete={() => handleDelete("therapist-blackouts", item.id, "Therapist blackout")} />
              )}
            />
          )}

          {currentSection === "bookings" && (
            <section className="mt-6 rounded-[32px] border border-[#eadfce] bg-white p-5 shadow-[0_20px_50px_rgba(32,18,10,0.06)] md:p-6">
              <div className="border-b border-[#f0e6d9] pb-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ba8f2a]">Booking Desk</p>
                <h3 className="mt-2 text-2xl font-bold text-[#17110d]">Review therapy bookings and cancellations</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b625a]">{bookings.length} bookings loaded from the backend.</p>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#efe4d4] text-left text-[12px] uppercase tracking-[0.18em] text-[#7b726c]">
                      <th className="px-4 py-4">Guest</th>
                      <th className="px-4 py-4">Therapy</th>
                      <th className="px-4 py-4">Therapist</th>
                      <th className="px-4 py-4">Slot</th>
                      <th className="px-4 py-4">Reference</th>
                      <th className="px-4 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-14 text-center text-sm text-[#6b625a]">No bookings yet.</td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-[#f5ecdf] align-top last:border-b-0">
                          <td className="px-4 py-5">
                            <p className="font-semibold text-[#17110d]">{booking.customer_name}</p>
                            <a href={`mailto:${booking.email}`} className="mt-2 block text-sm text-[#7a5d1d] hover:underline">{booking.email}</a>
                            <a href={`tel:${booking.phone}`} className="mt-1 block text-sm text-[#645b54]">{booking.phone}</a>
                          </td>
                          <td className="px-4 py-5 text-sm font-medium text-[#17110d]">{booking.therapy_name}</td>
                          <td className="px-4 py-5 text-sm text-[#645b54]">{booking.therapist_name || "Unassigned"}</td>
                          <td className="px-4 py-5 text-sm leading-7 text-[#645b54]">{formatDateOnly(booking.booking_date)}<br />{booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}</td>
                          <td className="px-4 py-5 text-sm text-[#7a5d1d]">{booking.reference_code}</td>
                          <td className="px-4 py-5">
                            <select value={booking.status} onChange={(event) => handleBookingLifecycleChange(booking.id, { status: event.target.value })} className={selectClass}>
                              {advancedBookingStatusOptions.map((option) => (
                                <option key={option} value={option}>
                                  {toTitleCase(option)}
                                </option>
                              ))}
                            </select>
                            <select value={booking.therapist_id ?? ""} onChange={(event) => handleBookingLifecycleChange(booking.id, { therapist_id: Number(event.target.value) || null })} className={`${selectClass} mt-2`}>
                              <option value="">Unassigned</option>
                              {therapists.map((therapist) => (
                                <option key={therapist.id} value={therapist.id}>{therapist.full_name}</option>
                              ))}
                            </select>
                            {booking.cancellation_reason && (
                              <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#6b625a]">Reason: {booking.cancellation_reason}</p>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {currentSection === "alternative-treatments" && (
            <EntityPanel
              eyebrow="Therapy Editor"
              title={editingAlternativeTreatmentId ? "Edit alternative treatment" : "Create alternative treatment"}
              subtitle="Keep item ids and sorting stable for future frontend integration."
              renderFields={
                <>
                  <Field label="Item Id"><input value={alternativeTreatmentForm.item_id} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, item_id: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Name"><input value={alternativeTreatmentForm.name} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Category"><input value={alternativeTreatmentForm.category} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, category: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Image Path"><input value={alternativeTreatmentForm.image} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, image: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={alternativeTreatmentForm.sort_order} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Short Description"><textarea value={alternativeTreatmentForm.short_desc} onChange={(event) => setAlternativeTreatmentForm((current) => ({ ...current, short_desc: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                </>
              }
              checked={alternativeTreatmentForm.is_active}
              onToggleChange={(value) => setAlternativeTreatmentForm((current) => ({ ...current, is_active: value }))}
              editingId={editingAlternativeTreatmentId}
              setEditingId={setEditingAlternativeTreatmentId}
              setForm={setAlternativeTreatmentForm}
              initialForm={initialAlternativeTreatmentForm}
              onSubmit={handleAlternativeTreatmentSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Alternative Treatment"
              listingTitle="Current alternative treatments"
              listingSubtitle={`${alternativeTreatments.length} records in MySQL`}
              items={alternativeTreatments}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.name} meta={`${item.category} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={item.short_desc} extra={`${item.item_id} | ${item.image}`} onEdit={() => { setEditingAlternativeTreatmentId(item.id); setAlternativeTreatmentForm({ item_id: item.item_id, name: item.name, category: item.category, short_desc: item.short_desc, image: item.image, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("alternative-treatments", item.id, "Alternative treatment")} />
              )}
            />
          )}

          {currentSection === "panchakarma-core" && (
            <EntityPanel
              eyebrow="Panchakarma Editor"
              title={editingPanchakarmaCoreId ? "Edit Panchakarma core therapy" : "Create Panchakarma core therapy"}
              subtitle="Benefits should be entered one item per line."
              renderFields={
                <>
                  <Field label="Item Id"><input value={panchakarmaCoreForm.item_id} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, item_id: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Name"><input value={panchakarmaCoreForm.name} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Dosha"><input value={panchakarmaCoreForm.dosha} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, dosha: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Dosha Color Class"><input value={panchakarmaCoreForm.dosha_color} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, dosha_color: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Dosha Background Class"><input value={panchakarmaCoreForm.dosha_bg} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, dosha_bg: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Dosha Border Class"><input value={panchakarmaCoreForm.dosha_border} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, dosha_border: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Image Path"><input value={panchakarmaCoreForm.image} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, image: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={panchakarmaCoreForm.sort_order} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Short Description"><textarea value={panchakarmaCoreForm.short_desc} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, short_desc: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                  <Field label="Benefits (one per line)"><textarea value={panchakarmaCoreForm.benefits} onChange={(event) => setPanchakarmaCoreForm((current) => ({ ...current, benefits: event.target.value }))} className={textAreaClass} rows="5" required /></Field>
                </>
              }
              checked={panchakarmaCoreForm.is_active}
              onToggleChange={(value) => setPanchakarmaCoreForm((current) => ({ ...current, is_active: value }))}
              editingId={editingPanchakarmaCoreId}
              setEditingId={setEditingPanchakarmaCoreId}
              setForm={setPanchakarmaCoreForm}
              initialForm={initialPanchakarmaCoreForm}
              onSubmit={handlePanchakarmaCoreSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Panchakarma Core Therapy"
              listingTitle="Current Panchakarma core therapies"
              listingSubtitle={`${panchakarmaCoreTherapies.length} records in MySQL`}
              items={panchakarmaCoreTherapies}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.name} meta={`${item.dosha} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={`${item.short_desc}\n\n${item.benefits.join(", ")}`} extra={`${item.item_id} | ${item.image}`} onEdit={() => { setEditingPanchakarmaCoreId(item.id); setPanchakarmaCoreForm({ item_id: item.item_id, name: item.name, dosha: item.dosha, dosha_color: item.dosha_color, dosha_bg: item.dosha_bg, dosha_border: item.dosha_border, short_desc: item.short_desc, image: item.image, benefits: item.benefits.join("\n"), sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("panchakarma-core-therapies", item.id, "Panchakarma core therapy")} />
              )}
            />
          )}

          {currentSection === "panchakarma-other" && (
            <EntityPanel
              eyebrow="Panchakarma Editor"
              title={editingPanchakarmaOtherId ? "Edit Panchakarma other treatment" : "Create Panchakarma other treatment"}
              subtitle="Use this section for the supporting treatments list."
              renderFields={
                <>
                  <Field label="Name"><input value={panchakarmaOtherForm.name} onChange={(event) => setPanchakarmaOtherForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Category"><input value={panchakarmaOtherForm.category} onChange={(event) => setPanchakarmaOtherForm((current) => ({ ...current, category: event.target.value }))} className={inputClass} required /></Field>
                  <Field label="Sort Order"><input type="number" value={panchakarmaOtherForm.sort_order} onChange={(event) => setPanchakarmaOtherForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} min="0" required /></Field>
                  <Field label="Description"><textarea value={panchakarmaOtherForm.desc} onChange={(event) => setPanchakarmaOtherForm((current) => ({ ...current, desc: event.target.value }))} className={textAreaClass} rows="6" required /></Field>
                </>
              }
              checked={panchakarmaOtherForm.is_active}
              onToggleChange={(value) => setPanchakarmaOtherForm((current) => ({ ...current, is_active: value }))}
              editingId={editingPanchakarmaOtherId}
              setEditingId={setEditingPanchakarmaOtherId}
              setForm={setPanchakarmaOtherForm}
              initialForm={initialPanchakarmaOtherForm}
              onSubmit={handlePanchakarmaOtherSubmit}
              isSubmitting={isSubmitting}
              saveLabel="Panchakarma Other Treatment"
              listingTitle="Current Panchakarma other treatments"
              listingSubtitle={`${panchakarmaOtherTreatments.length} records in MySQL`}
              items={panchakarmaOtherTreatments}
              renderItem={(item) => (
                <RecordCard key={item.id} title={item.name} meta={`${item.category} | Order ${item.sort_order} | ${item.is_active ? "Active" : "Hidden"}`} body={item.desc} onEdit={() => { setEditingPanchakarmaOtherId(item.id); setPanchakarmaOtherForm({ name: item.name, category: item.category, desc: item.desc, sort_order: item.sort_order, is_active: item.is_active }); }} onDelete={() => handleDelete("panchakarma-other-treatments", item.id, "Panchakarma other treatment")} />
              )}
            />
          )}
        </section>
      </div>
    </main>
  );
}
