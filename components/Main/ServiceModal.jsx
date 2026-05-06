"use client";

import BookingModal from "../booking/BookingModal";

export default function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <BookingModal
      offering={{
        title: service.title,
        image: service.image,
        description: service.fullDesc || service.desc || service.description || "",
        summary: service.desc || service.shortDescription || service.description || "",
        duration: service.duration || "",
        benefits: service.benefits || [],
      }}
      onClose={onClose}
      theme="brown"
    />
  );
}
