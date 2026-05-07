export const initialCredentials = { email: "", password: "" };
export const initialAdminUserForm = {
  email: "",
  full_name: "",
  password: "",
  role: "doctor",
  therapist_id: "",
  is_active: true,
};

export const initialServiceForm = {
  title: "",
  short_description: "",
  description: "",
  benefits: [""],
  image: "/images/ser-1.jpg",
  sort_order: 0,
  is_active: true,
};

export const initialTestimonialForm = { name: "", review: "", sort_order: 0, is_active: true };

export const initialNadiCampForm = { doctor: "", camp_date: "", location: "", contact: "", address: "", sort_order: 0, is_active: true };

export const initialRelaxationTherapyForm = {
  title: "",
  duration: "",
  short_description: "",
  details: "",
  benefits: [""],
  image: "/images/1446.jpg",
  sort_order: 0,
  is_active: true,
};

export const initialBookingSlotForm = {
  therapy_name: "Abhyanga",
  booking_date: "",
  start_time: "09:00",
  end_time: "10:00",
  capacity: 1,
  is_active: true,
};

export const initialTherapistForm = {
  full_name: "",
  role_label: "Therapist",
  qualification: "",
  experience_years: 0,
  languages: "",
  image: "/images/doctor-placeholder.png",
  email: "",
  phone: "",
  specialties: "",
  bio: "",
  is_active: true,
};

export const initialTeamForm = {
  full_name: "",
  role_label: "Therapist",
  qualification: "",
  experience_years: 0,
  languages: "",
  image: "/images/doctor-placeholder.png",
  email: "",
  phone: "",
  specialties: "",
  bio: "",
  is_active: true,
  create_login: true,
  login_email: "",
  login_password: "",
  login_role: "therapist",
  login_is_active: true,
  linked_user_id: null,
};

export const initialTherapistScheduleForm = {
  therapist_id: "",
  therapy_name: "Abhyanga",
  day_of_week: 0,
  start_time: "09:00",
  end_time: "13:00",
  slot_interval_minutes: 45,
  max_bookings_per_slot: 1,
  is_active: true,
};

export const initialTherapistBlackoutForm = {
  therapist_id: "",
  blackout_date: "",
  start_time: "",
  end_time: "",
  reason: "",
  is_active: true,
};

export const initialAlternativeTreatmentForm = {
  item_id: "",
  name: "",
  category: "",
  short_desc: "",
  image: "/images/alt-hero.png",
  sort_order: 0,
  is_active: true,
};

export const initialPanchakarmaCoreForm = {
  item_id: "",
  name: "",
  dosha: "",
  dosha_color: "text-[#1a7a6a]",
  dosha_bg: "bg-[#edfaf4]",
  dosha_border: "border-[#b5e5cd]",
  short_desc: "",
  image: "/images/pk-vamana.png",
  benefits: "",
  sort_order: 0,
  is_active: true,
};

export const initialPanchakarmaOtherForm = {
  name: "",
  category: "",
  desc: "",
  sort_order: 0,
  is_active: true,
};

export const statusOptions = ["new", "contacted", "closed"];
export const bookingStatusOptions = ["pending", "confirmed", "completed", "cancelled"];
export const advancedBookingStatusOptions = ["pending", "confirmed", "rescheduled", "completed", "cancelled", "no_show"];
export const weekdayOptions = [
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
];
