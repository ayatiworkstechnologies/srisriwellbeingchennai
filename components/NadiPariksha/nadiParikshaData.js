export const heroContent = {
  title: "Nadi Pariksha",
  description: [
    "Nadi Pariksha is an ancient, non-invasive pulse diagnosis technique rooted in Ayurveda. By analysing your pulse, it reveals imbalances in your doshas, assesses organ health, and provides deep insights into your physical, emotional, and mental wellbeing.",
    "It helps identify potential health concerns early and the Ayurveda Nadi Vaidya can guide the right diet, lifestyle changes, Ayurvedic supplements, and treatments personalised just for you.",
  ],
  image: "/banner/nadi-web.png",
  mobimage: "/banner/nadi-mob.png",
  isOverlay: true,
};

export const featuredCities = [
  {
    name: "Chennai",
    tag: "Daily access",
    description:
      "Book a Nadi Pariksha consultation with local support, guided follow-up, and easy access to therapies.",
  },
  {
    name: "Pondicherry",
    tag: "Camp access",
    description:
      "Reserve your spot for upcoming Nadi camps and connect with the team for schedule-based appointments.",
  },
];

export const stats = [
  {
    value: 380,
    suffix: "+",
    label: "Doctors",
    desc: "across India\nand the Globe",
  },
  {
    value: 5,
    suffix: "M+",
    label: "Patients",
    desc: "More than 5 Million\npatients addressed",
  },
  {
    value: 500,
    suffix: "+",
    label: "Districts",
    desc: "Nadi camps across\n500+ districts in India",
  },
  {
    value: 20,
    suffix: "+",
    label: "Countries",
    desc: "reached through our\ndoctors",
  },
];

import { GiKidneys, GiHeartOrgan, GiLungs, GiStomach, GiBrain, GiLiver, GiJoint, GiButterfly, GiNightSleep } from "react-icons/gi";
import { FaTint, FaEye, FaUserAlt, FaBone, FaNotesMedical, FaVial, FaBed, FaWeight, FaHandHoldingHeart, FaToilet, FaHeadSideCough, FaVenusMars } from "react-icons/fa";

export const conditions = [
  { label: "Kidney Care", icon: GiKidneys },
  { label: "Diabetes", icon: FaTint },
  { label: "Cardiac Care", icon: FaHandHoldingHeart },
  { label: "Asthma", icon: GiLungs },
  { label: "Eye Care", icon: FaEye },
  { label: "Skin & Hair", icon: FaUserAlt },
  { label: "Joint Pain", icon: GiJoint },
  { label: "Constipation", icon: FaToilet },
  { label: "Thyroid", icon: GiButterfly },
  { label: "Migraine", icon: FaHeadSideCough },
  { label: "Liver Care", icon: GiLiver },
  { label: "Hormonal Issues", icon: FaVenusMars },
  { label: "Stress & Sleep", icon: GiNightSleep },
  { label: "Allergies", icon: FaHeadSideCough },
  { label: "Obesity", icon: FaWeight },
];

export const therapyCards = [
  {
    title: "Reflexology",
    image: "/images/nadi/img-1.png",
  },
  {
    title: "Abhyanga",
    image: "/images/nadi/img-2.png",
  },
];

export const testimonials = [
  {
    quote:
      "The Nadi Pariksha experience I had at Sri Sri Wellbeing was the best thing I've done for my health. The doctor immediately identified my issues and I got a customised set of treatments and supplements from my visits. Now I feel energised, and the improvement is unbelievable all around. My body feels healthy.",
    name: "Ruban Kumar",
    location: "Bangalore",
  },
  {
    quote:
      "I was suffering from chronic digestive issues for years. The Nadi Vaidya at Sri Sri Wellbeing accurately identified the root cause through pulse diagnosis and recommended a personalised treatment plan. Within weeks, I noticed significant improvement in my digestion and overall energy levels.",
    name: "Priya Sharma",
    location: "Chennai",
  },
  {
    quote:
      "As someone dealing with stress-related health problems, Nadi Pariksha was a revelation. The practitioner could sense my imbalances just through my pulse. The Ayurvedic treatments and lifestyle changes suggested have transformed my sleep quality and mental clarity.",
    name: "Arjun Menon",
    location: "Hyderabad",
  },
];

export const camps = [
  {
    id: 1,
    doctor: "Dr. K Aravindhan",
    date: "20/05/2026",
    location: "Chennai, Tamil Nadu",
    contact: "Manickam M (9444004975)",
    address: "Gurukripa Agencies, No : 16, Aadhi Street , Villivakkam",
    type: "this-month",
  },
  {
    id: 2,
    doctor: "Dr. S Meenakshi",
    date: "15/05/2026",
    location: "Pondicherry",
    contact: "Saravanan (9843210987)",
    address: "Sri Auro Wellness Hall, Heritage Town",
    type: "this-month",
  },
  {
    id: 3,
    doctor: "Dr. R Rajesh",
    date: "05/05/2026",
    location: "Coimbatore, Tamil Nadu",
    contact: "Vijay (9765432109)",
    address: "Art of Living Center, Race Course",
    type: "this-week",
  },
  {
    id: 4,
    doctor: "Dr. N Lakshmi",
    date: "10/06/2026",
    location: "Salem, Tamil Nadu",
    contact: "Prakash (9123456789)",
    address: "Shiva Temple Premise, Fairlands",
    type: "upcoming",
  },
  {
    id: 5,
    doctor: "Dr. V Anitha",
    date: "22/05/2026",
    location: "Trichy, Tamil Nadu",
    contact: "Ramesh (9876543210)",
    address: "Srirangam Community Hall",
    type: "this-month",
  },
  {
    id: 6,
    doctor: "Dr. M Karthik",
    date: "02/05/2026",
    location: "Tirunelveli, Tamil Nadu",
    contact: "Gopal (9944332211)",
    address: "Nellai Wellness Hub",
    type: "today",
  },
  {
    id: 7,
    doctor: "Dr. P Swathi",
    date: "18/05/2026",
    location: "Vellore, Tamil Nadu",
    contact: "Suresh (9000011122)",
    address: "Anna Salai Center",
    type: "this-month",
  },
];
