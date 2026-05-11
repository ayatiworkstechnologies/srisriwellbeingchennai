import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SiteAssistant from "@/components/booking/SiteAssistant";

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
