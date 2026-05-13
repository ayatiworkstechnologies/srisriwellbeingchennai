const SEO_FALLBACKS = {
  home: {
    title: "Sri Sri Wellbeing Chennai | Ayurveda, Panchakarma & Relaxation",
    description:
      "Discover natural healing at Sri Sri Wellbeing Chennai with Ayurvedic treatments, Panchakarma therapies, relaxation rituals, and personalised wellness care.",
  },
  about: {
    title: "About Sri Sri Wellbeing Chennai",
    description:
      "Learn about Sri Sri Wellbeing Chennai, our Ayurvedic approach, wellness philosophy, and personalised healing experience.",
  },
  relax: {
    title: "Relaxation Therapy | Sri Sri Wellbeing Chennai",
    description:
      "Explore Ayurvedic relaxation therapies, renewal rituals, and restorative wellbeing experiences at Sri Sri Wellbeing Chennai.",
  },
  facilities: {
    title: "Facilities | Sri Sri Wellbeing Chennai",
    description:
      "Explore the facilities, stay options, therapy spaces, and wellness environment at Sri Sri Wellbeing Chennai.",
  },
  products: {
    title: "Products | Sri Sri Wellbeing Chennai",
    description:
      "Browse wellness products and supportive Ayurvedic offerings from Sri Sri Wellbeing Chennai.",
  },
  contact: {
    title: "Contact Sri Sri Wellbeing Chennai",
    description:
      "Reach Sri Sri Wellbeing Chennai for Ayurveda treatments, Panchakarma therapies, wellness appointments, and enquiries.",
  },
  "nadi-pariksha": {
    title: "Nadi Pariksha | Sri Sri Wellbeing Chennai",
    description:
      "Book Nadi Pariksha consultations and upcoming camps with expert Ayurvedic guidance at Sri Sri Wellbeing Chennai.",
  },
  panchakarma: {
    title: "Panchakarma | Sri Sri Wellbeing Chennai",
    description:
      "Discover Panchakarma detox, cleansing therapies, and Ayurvedic renewal programmes at Sri Sri Wellbeing Chennai.",
  },
  "alternative-treatments": {
    title: "Alternative Treatments | Sri Sri Wellbeing Chennai",
    description:
      "Explore complementary Ayurvedic and holistic treatments offered at Sri Sri Wellbeing Chennai.",
  },
  "netra-tejas": {
    title: "Netra Tejas | Sri Sri Wellbeing Chennai",
    description:
      "Learn about Netra Tejas and supportive eye-focused wellness therapies at Sri Sri Wellbeing Chennai.",
  },
};

export async function getPageMetadata(pageKey, fallback = {}) {
  const mergedFallback = {
    ...(SEO_FALLBACKS[pageKey] || {}),
    ...fallback,
  };
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return mergedFallback;
  }

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/content/page-meta`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      return mergedFallback;
    }
    const items = await response.json();
    const matched = Array.isArray(items) ? items.find((item) => item.page_key === pageKey && item.is_active) : null;
    if (!matched) {
      return mergedFallback;
    }
    return {
      title: matched.title || mergedFallback.title,
      description: matched.description || mergedFallback.description,
    };
  } catch {
    return mergedFallback;
  }
}
