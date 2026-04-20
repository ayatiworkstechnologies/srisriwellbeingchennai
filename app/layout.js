import Header from "@/components/layouts/Header";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import Script from "next/script";

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
  title: "Sri Sri Wellbeing Chennai – Ayurveda Treatments, Panchakarma & Wellness Therapies",
  description: "Discover natural healing at Sri Sri Wellbeing Chennai with Ayurvedic treatments, detox programs, yoga & stress relief therapies for mind and body balance.",
  keywords: ["Ayurveda Chennai", "Sri Sri Wellbeing", "Holistic Health Chennai", "Ayurvedic Spa Chennai", "Wellness Center Chennai", "Ayurvedic Treatment"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cocogoose.variable} ${helmet.variable}`}>
      <body>
        <Script
          id="google-tag"
          src="https://www.googletagmanager.com/gtag/js?id=G-58P101B0TJ"
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-58P101B0TJ', {
  send_page_view: true,
  page_path: window.location.pathname,
  cookie_flags: 'SameSite=None;Secure'
});`,
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
