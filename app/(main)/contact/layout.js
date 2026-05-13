import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("contact", {
    title: "Sri Sri Wellbeing Chennai Contact | Book Ayurveda & Panchakarma Consultation",
    description:
      "Reach Sri Sri Wellbeing Chennai for expert Ayurveda treatments, Panchakarma therapies & wellness programs. Call now or visit our Kilpauk center.",
  });
}

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
