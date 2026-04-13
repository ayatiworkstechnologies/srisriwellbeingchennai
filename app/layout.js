import Header from "@/components/layouts/Header";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";

const cocogoose = localFont({
  src: "../public/fonts/Cocogoose Pro Regular Trial.ttf",
  display: "swap",
  variable: "--font-cocogoose",
});

const helmet = localFont({
  src: "../public/fonts/Helmet-Regular.ttf",
  display: "swap",
  variable: "--font-helmet",
});

export const metadata = {
  title: "Sri Sri Wellbeing | Ayurvedic & Holistic Health Centre in Chennai",
  description: "Experience authentic Ayurvedic healing at Sri Sri Wellbeing Chennai. Offering personalised therapies, expert consultations, and holistic wellness products rooted in tradition for modern wellbeing.",
  keywords: ["Ayurveda Chennai", "Sri Sri Wellbeing", "Holistic Health Chennai", "Ayurvedic Spa Chennai", "Wellness Center Chennai", "Ayurvedic Treatment"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cocogoose.variable} ${helmet.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
