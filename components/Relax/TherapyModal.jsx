"use client";

import BookingModal from "../booking/BookingModal";

export default function TherapyModal({ therapy, onClose }) {
  if (!therapy) return null;

  return (
    <BookingModal
      offering={{
        title: therapy.title,
        image: therapy.image,
        description: therapy.details || therapy.desc || therapy.shortDescription || "",
        summary: therapy.shortDescription || therapy.desc || therapy.details || "",
        duration: therapy.duration || "",
        benefits: therapy.benefits || [],
      }}
      onClose={onClose}
    />
  );
}
