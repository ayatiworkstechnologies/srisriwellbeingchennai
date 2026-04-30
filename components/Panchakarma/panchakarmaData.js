// ─── Hero ──────────────────────────────────────────────────────────────────
export const heroContent = {
  title: "Panchakarma Therapies",
  subtitle: "The Ultimate Ayurvedic Detoxification",
  description:
    "As per Ayurveda, Panchakarma is a foremost and vital detoxification process, which cleans the entire system. It is inclusive of Vamana, Virechana, Vasti, Nasya and Raktamokshana. The therapies help eliminate toxins, build the immune system, improve digestion, absorption, metabolism and vitality, and boost mental clarity.",
  ctaLabel: "Enquire Now",
  ctaHref: "/contact",
  image: "/images/pk-hero.png",
  mobimage: "/images/pk-hero-mob.png",
};

// ─── Stats ─────────────────────────────────────────────────────────────────
export const stats = [
  { value: 5,    suffix: "",    label: "Core Therapies",  desc: "Five classical\nPanchakarma procedures" },
  { value: 30,   suffix: "+",   label: "Treatments",      desc: "Complementary\nAyurvedic therapies" },
  { value: 5000, suffix: "+",   label: "Patients",        desc: "Successfully treated\nthrough Panchakarma" },
  { value: 15,   suffix: "+",   label: "Years",           desc: "Of Ayurvedic\nexpertise & care" },
];

// ─── 5 Core Panchakarma Therapies ─────────────────────────────────────────
export const coreTherapies = [
  {
    id: "vamana",
    name: "Vamana",
    dosha: "Kapha",
    doshaColor: "text-[#1a7a6a]",
    doshaBg: "bg-[#edfaf4]",
    doshaBorder: "border-[#b5e5cd]",
    shortDesc:
      "The process of detoxifying the body from the affected Kapha Dosha. Vamana treatment involves therapeutic vomiting which helps remove toxins mainly from the respiratory and gastrointestinal tract.",
    image: "/images/pk-vamana.png",
    benefits: ["Clears Kapha from respiratory tract", "Treats asthma and skin disorders", "Improves metabolic function"],
  },
  {
    id: "virechana",
    name: "Virechana",
    dosha: "Pitta",
    doshaColor: "text-[#c07030]",
    doshaBg: "bg-[#fdf4eb]",
    doshaBorder: "border-[#f0d3b0]",
    shortDesc:
      "A Panchakarma Therapy which helps to cleanse toxins from the gastro-intestinal tract and eliminates excess pitta through the anal route. Virechana treatment also helps clear the digestive tract of pollutants.",
    image: "/images/ser-2.jpg",
    benefits: ["Eliminates excess Pitta dosha", "Cleanses gastrointestinal tract", "Treats liver and skin disorders"],
  },
  {
    id: "vasti",
    name: "Vasti",
    dosha: "Vata",
    doshaColor: "text-[#6350c0]",
    doshaBg: "bg-[#f3f0fb]",
    doshaBorder: "border-[#cfc8ef]",
    shortDesc:
      "Considered the most effective of all Panchakarma therapies, Vasti involves medicated enemas using herbal decoctions or oils to cleanse the colon, eliminate Vata dosha, and support deep tissue healing.",
    image: "/images/ser-3.jpg",
    benefits: ["Balances Vata dosha effectively", "Strengthens nervous system", "Relieves chronic constipation"],
  },
  {
    id: "nasya",
    name: "Nasya",
    dosha: "Head & Neck",
    doshaColor: "text-[#2c6fad]",
    doshaBg: "bg-[#eef4fb]",
    doshaBorder: "border-[#bed4ee]",
    shortDesc:
      "Nasya is the administration of medicated oils, ghee, or herbal preparations through the nasal passage to cleanse the head and neck region, treating disorders of the sinuses, brain, eyes, ears, and throat.",
    image: "/images/ser-4.jpg",
    benefits: ["Treats sinusitis and migraines", "Improves memory and clarity", "Addresses eye and ENT disorders"],
  },
  {
    id: "raktamokshana",
    name: "Raktamokshana",
    dosha: "Rakta / Blood",
    doshaColor: "text-[#a03030]",
    doshaBg: "bg-[#fef4f4]",
    doshaBorder: "border-[#ecc0c0]",
    shortDesc:
      "Raktamokshana is the Ayurvedic procedure of bloodletting used to purify the blood, remove toxins circulating in the bloodstream, and treat skin disorders, gout, and chronic conditions caused by blood impurities.",
    image: "/images/ser-5.jpg",
    benefits: ["Purifies blood and removes toxins", "Treats skin disorders and gout", "Reduces inflammation effectively"],
  },
];

// ─── Other Treatments ──────────────────────────────────────────────────────
export const otherTreatments = [
  {
    name: "Lekhanavasti",
    category: "Vasti",
    desc: "An Ayurvedic therapeutic procedure which specifically focuses on the treatment of obesity and weight management by reducing excess fat and meda dhatu (adipose tissue) in the body, improving metabolism and balancing the Kapha dosha.",
  },
  {
    name: "Lepam",
    category: "External",
    desc: "A medicated paste or ointment prepared by combining various herbal powders, oils, and other natural ingredients, applied on the skin for healing skin conditions, skin rejuvenation, improving complexion, and promoting overall skin health.",
  },
  {
    name: "Local Kashayadhara",
    category: "Dhara",
    desc: "An Ayurvedic therapy where medicated herbal decoctions are continuously poured over a specific area of the body to address musculoskeletal issues, joint pain, and inflammation.",
  },
  {
    name: "Local Ksheera Dhara",
    category: "Dhara",
    desc: "An Ayurvedic therapy where medicated milk (ksheera) is continuously poured over a specific area of the body to address various health concerns of the area being treated.",
  },
  {
    name: "Local Pizhichil",
    category: "Oil Therapy",
    desc: "A modified version of the traditional Ayurvedic therapy known as Pizhichil, where warm medicated oil is poured and massaged over a particular area that requires attention.",
  },
  {
    name: "Local Takradhara",
    category: "Dhara",
    desc: "A specialized Ayurvedic therapy where buttermilk (takra) is continuously poured over a specific area of the body, particularly the forehead, to relieve stress, anxiety, and headaches.",
  },
  {
    name: "Local Udwartana",
    category: "Massage",
    desc: "A variation of the traditional Ayurvedic therapy known as Udwartana, which focuses on a specific area or body part rather than the entire body to promote circulation, exfoliation, and the release of tension.",
  },
  {
    name: "Local Uzhichil",
    category: "Massage",
    desc: "An Ayurvedic massage therapy using herbal oils and special customised massage strokes, focused on that area of the body which is having a health concern.",
  },
  {
    name: "Marma",
    category: "Energy",
    desc: "A restorative and therapeutic method to loosen up the system causing full relaxation. It improves vital organ functionality, energises cellular activity and enhances the movement of prana.",
  },
  {
    name: "Matra Vasti",
    category: "Vasti",
    desc: "A gentle and nourishing Ayurvedic therapeutic procedure where a minimal, small, specific quantity of medicated oil or decoction is administered into the rectum for improving digestive function, balancing the doshas and maintaining overall health.",
  },
  {
    name: "Meru Chikitsa",
    category: "Spinal",
    desc: "A traditional Ayurveda therapeutic method that uses gentle touches down the spine to access limitless energy, and erase stress, illness, and suffering.",
  },
  {
    name: "Meru Pichu",
    category: "Oil Therapy",
    desc: "An Ayurvedic therapy where herbal paste or medicated oil is applied on the forehead, particularly in the region where the Ajna (Third Eye) chakra is located, to promote relaxation, emotional wellbeing, mental clarity, and a sense of balance.",
  },
  {
    name: "Mukhalepam",
    category: "Facial",
    desc: "An Ayurveda Facial Therapy which uses natural ingredients, freshly ground herbs, fruits, coconut extract and saffron. This beauty therapy is also relaxing due to the fragrant and aromatic oils used.",
  },
  {
    name: "Rakkenho",
    category: "Full Body",
    desc: "A Japanese full-body therapy using the soles of the feet to gently massage various pressure points on the body. It stimulates the vagus nerve, improves immunity, releases stress, increases blood and lymph flow, and boosts energy levels.",
  },
  {
    name: "Reflexology",
    category: "Energy",
    desc: "Using particular thumb, finger, and hand methods, pressure is applied to the hands and feet during the Reflexology massage. The overall state of one's health is improved and trapped energy is released.",
  },
  {
    name: "Shirodhara",
    category: "Head Therapy",
    desc: "A deeply relaxing therapy for your scalp and forehead using a thin stream of medicated lukewarm oil.",
  },
  {
    name: "Shirolepa",
    category: "Head Therapy",
    desc: "A time-tested Ayurveda therapy where medicinal pastes are applied over the entire scalp which is soothing and has relaxing properties.",
  },
  {
    name: "Shodhan Vasti",
    category: "Vasti",
    desc: "A comprehensive Ayurvedic detoxification and rejuvenation therapy which involves the administration of medicated enemas to remove toxins and waste products from the colon.",
  },
  {
    name: "Sneha Vasti",
    category: "Vasti",
    desc: "A part of Ayurvedic Panchakarma therapy which includes various cleansing and rejuvenating treatments to lubricate the colon and promote healthy bowel movements.",
  },
  {
    name: "Snehapana",
    category: "Preparation",
    desc: "An Ayurvedic therapy used to prepare the body for elimination during detoxification procedures, where the amount of ghee or oil ingested is gradually increased.",
  },
  {
    name: "Sthanika / Local Lepam",
    category: "External",
    desc: "A specific type of Ayurvedic external application or paste that is prepared and applied locally to a specific area or body part, rather than being used for the entire body.",
  },
  {
    name: "Swedish Massage",
    category: "Massage",
    desc: "A massage therapy which focuses on relaxation by using massage oil to smoothly glide the hands and forearms of the therapist over the body.",
  },
  {
    name: "Thalam",
    category: "Head Therapy",
    desc: "The application of medicated pastes or oils to the head, followed by a specific traditional therapeutic process particularly in the context of Ayurvedic head massages or treatments.",
  },
  {
    name: "Udwartana",
    category: "Massage",
    desc: "An exfoliation therapy or a traditional dry powder massage where a specialized herbal or grain-based powder is vigorously applied to the skin in an upward, stimulating, and invigorating manner for better skin health, improving circulation and weight management.",
  },
  {
    name: "Upanaha Swedana",
    category: "Sweat Therapy",
    desc: "An Ayurvedic therapy where one sweats with the application of hot herbal customised potlis to the body to address conditions like muscle pain, joint pain, stiffness, swelling and promote relaxation.",
  },
  {
    name: "Uro Basti",
    category: "Basti",
    desc: "Application of herbal decoctions or medicated oils on the chest area in a specially created chamber to relieve chest pain, improve respiratory function, and address musculoskeletal issues in the chest and upper back area.",
  },
  {
    name: "Uro Pichu",
    category: "Oil Therapy",
    desc: "An Ayurvedic therapy where medicated oil-soaked cotton pads are applied to the chest region for chest-related conditions, such as pain, stiffness, muscle or joint discomfort and respiratory issues.",
  },
  {
    name: "Uttara Vasti",
    category: "Vasti",
    desc: "An Ayurvedic therapeutic procedure to cleanse the urinary and reproductive systems and promoting their health by administering medicated oil through the urethra.",
  },
  {
    name: "Uzhichil",
    category: "Massage",
    desc: "A deep tissue Ayurvedic full body massage which applies pressure to specific parts of the body with oil. This therapy improves blood circulation, reduces pressure on the heart, and calms the nervous system.",
  },
  {
    name: "Valuka Swedana",
    category: "Sweat Therapy",
    desc: "Heated sand or sand potlis is used as a therapeutic medium in this Ayurvedic treatment which is helpful in addressing various musculoskeletal and joint-related conditions, promoting pain relief and improving mobility.",
  },
  {
    name: "Vamana",
    category: "Panchakarma",
    desc: "The process of detoxifying the body from the affected Kapha Dosha. Vamana treatment involves therapeutic vomiting which helps remove toxins mainly from the respiratory and gastrointestinal tract.",
  },
  {
    name: "Virechana",
    category: "Panchakarma",
    desc: "A Panchakarma Therapy which helps to cleanse toxins from the gastro-intestinal tract and also eliminates excess pitta, through the anal route. Virechana treatment also helps clear the digestive tract of pollutants.",
  },
];

// ─── Category Colors ────────────────────────────────────────────────────────
export const categoryColors = {
  Vasti:        { bg: "bg-[#f3f0fb]", text: "text-[#6350c0]", border: "border-[#cfc8ef]" },
  External:     { bg: "bg-[#fdf4eb]", text: "text-[#c07030]", border: "border-[#f0d3b0]" },
  Dhara:        { bg: "bg-[#eef4fb]", text: "text-[#2c6fad]", border: "border-[#bed4ee]" },
  "Oil Therapy":{ bg: "bg-[#fdf0f8]", text: "text-[#a03080]", border: "border-[#ecc0de]" },
  Massage:      { bg: "bg-[#f0faf8]", text: "text-[#1a7a6a]", border: "border-[#a8ddd6]" },
  Energy:       { bg: "bg-[#fdf4eb]", text: "text-[#b06b00]", border: "border-[#f0d9a8]" },
  "Head Therapy":{ bg: "bg-[#ebf8fb]", text: "text-[#1a7a94]", border: "border-[#a8d8e4]" },
  Spinal:       { bg: "bg-[#fef6e8]", text: "text-[#b06b00]", border: "border-[#f0d9a8]" },
  Facial:       { bg: "bg-[#fdf0f8]", text: "text-[#a03080]", border: "border-[#ecc0de]" },
  "Full Body":  { bg: "bg-[#f0faf8]", text: "text-[#1a7a6a]", border: "border-[#a8ddd6]" },
  Preparation:  { bg: "bg-[#f5f5f5]", text: "text-[#4a4a4a]", border: "border-[#d0d0d0]" },
  "Sweat Therapy":{ bg: "bg-[#fef4f4]", text: "text-[#a03030]", border: "border-[#ecc0c0]" },
  Basti:        { bg: "bg-[#f3f0fb]", text: "text-[#6350c0]", border: "border-[#cfc8ef]" },
  Panchakarma:  { bg: "bg-[#fdf3e0]", text: "text-[#c79f31]", border: "border-[#f0d9a8]" },
};
