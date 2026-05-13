import dynamic from "next/dynamic";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const SiteAssistant = dynamic(() => import("@/components/booking/SiteAssistant"), {
  loading: () => null,
});

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SiteAssistant />
    </>
  );
}
