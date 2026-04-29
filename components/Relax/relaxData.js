export const relaxHero = {
  subtitle: "Divine Sanctuary",
  title: "Relaxation Therapy",
  description: "Step into a world of profound stillness. Our ancient Ayurvedic protocols are meticulously designed to dissolve stress and awaken your inner vitality.",
  ctaLabel: "Experience Bliss",
  ctaHref: "/contact",
  image: "/images/1446.jpg" 
};

export const relaxStats = [
  { value: 12000, suffix: "+", label: "Calm Sessions", desc: "Moments of profound\nrelaxation delivered" },
  { value: 4800,  suffix: "+", label: "Happy Souls",    desc: "Patients who found\ntranquility with us" },
  { value: 12,    suffix: "+", label: "Years",           desc: "Of dedicated\nwellness expertise" },
  { value: 15,    suffix: "+", label: "Therapists",      desc: "Certified Ayurvedic\nwellness specialists" },
];

export const therapies = [
  {
    id: "abhyanga",
    name: "Abhyanga",
    sanskrit: "अभ्यंग",
    duration: "45 mins",
    shortDesc: "A traditional Ayurvedic full-body oil massage using warm herbal oils. It helps relax the body, improve blood circulation, and calm the nervous system.",
    image: "/images/ser-4.jpg",
    benefits: [
      "Relieves stress and muscle fatigue",
      "Improves blood and lymph circulation",
      "Nourishes and rejuvenates the skin",
      "Supports better quality sleep",
    ],
    category: "Full Body",
  },
  {
    id: "shirodhara",
    name: "Shirodhara",
    sanskrit: "शिरोधारा",
    duration: "45 mins",
    shortDesc: "A deeply calming therapy where warm medicated oil flows gently over the forehead. Ideal for stress relief, mental relaxation, and emotional balance.",
    image: "/images/ser-3.jpg",
    benefits: [
      "Deeply calms the central nervous system",
      "Reduces chronic stress and anxiety",
      "Promotes mental clarity and focus",
      "Effective for insomnia and sleep issues",
    ],
    category: "Head Therapy",
  },
  {
    id: "uzhichil",
    name: "Uzhichil",
    sanskrit: "उमिच्चिल",
    duration: "40 mins",
    shortDesc: "An Ayurvedic oil massage that focuses on muscular relaxation, stiffness relief, and improving body flexibility.",
    image: "/images/ser-5.jpg",
    benefits: [
      "Relieves persistent muscle stiffness",
      "Significantly improves body flexibility",
      "Enhances overall physical circulation",
      "Reduces deep-seated body fatigue",
    ],
    category: "Deep Tissue",
  },
  {
    id: "ksheeradhara",
    name: "Ksheeradhara",
    sanskrit: "क्षीरधारा",
    duration: "45 mins",
    shortDesc: "Gentle pouring of medicated milk over the body or head. Known for its cooling, calming, and nourishing effect on the body and mind.",
    image: "/images/ser-6.jpg",
    benefits: [
      "Cooling effect on the entire system",
      "Nourishes the skin and deep tissues",
      "Calms mental agitation and anger",
      "Highly relaxing for the nervous system",
    ],
    category: "Dhara",
  },
];

export const otherRelaxTherapies = [
  {
    name: "Head Massage",
    category: "Local",
    duration: "40 mins",
    desc: "Focuses on the scalp, head, neck, and upper shoulder area. Helps reduce stress and refresh the mind.",
  },
  {
    name: "Foot Reflexology",
    category: "Energy",
    duration: "40 mins",
    desc: "Pressure-point therapy for the feet to relax the body and improve energy flow.",
  },
  {
    name: "Head & Foot Massage",
    category: "Combined",
    duration: "40 mins",
    desc: "Combines scalp relaxation with foot pressure therapy for total body calmness.",
  },
  {
    name: "Aroma Therapy",
    category: "Beauty",
    duration: "45 mins",
    desc: "Uses natural aromatic oils and gentle massage to improve mood and refresh the senses.",
  },
  {
    name: "Shirolepa",
    category: "Head Therapy",
    duration: "45 mins",
    desc: "Herbal paste application on the head to cool the system and support peaceful sleep.",
  },
  {
    name: "Mukhalepa",
    category: "Facial",
    duration: "45 mins",
    desc: "Ayurvedic herbal facial therapy for natural skin cleansing and rejuvenation.",
  },
  {
    name: "Chlorophyll Body Wrap",
    category: "Body Care",
    duration: "90 mins",
    desc: "Detoxifying body wrap that nourishes the skin and promotes deep relaxation.",
  },
];

export const categoryColors = {
  "Full Body":    { bg: "bg-[#fdf4eb]", text: "text-[#c07030]", border: "border-[#f0d3b0]" },
  "Head Therapy": { bg: "bg-[#ebf8fb]", text: "text-[#1a7a94]", border: "border-[#a8d8e4]" },
  "Deep Tissue":  { bg: "bg-[#f0faf8]", text: "text-[#1a7a6a]", border: "border-[#a8ddd6]" },
  "Dhara":        { bg: "bg-[#eef4fb]", text: "text-[#2c6fad]", border: "border-[#bed4ee]" },
  "Local":        { bg: "bg-[#f5f5f5]", text: "text-[#4a4a4a]", border: "border-[#d0d0d0]" },
  "Energy":       { bg: "bg-[#fdf4eb]", text: "text-[#b06b00]", border: "border-[#f0d9a8]" },
  "Combined":     { bg: "bg-[#f3f0fb]", text: "text-[#6350c0]", border: "border-[#cfc8ef]" },
  "Beauty":       { bg: "bg-[#fdf0f8]", text: "text-[#a03080]", border: "border-[#ecc0de]" },
  "Facial":       { bg: "bg-[#fdf0f8]", text: "text-[#a03080]", border: "border-[#ecc0de]" },
  "Body Care":    { bg: "bg-[#f0faf8]", text: "text-[#1a7a6a]", border: "border-[#a8ddd6]" },
};
