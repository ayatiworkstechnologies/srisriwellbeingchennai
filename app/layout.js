import "./globals.css";
import localFont from "next/font/local";
import { Rubik } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-rubik",
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
    <html lang="en" className={`${rubik.variable} ${helmet.variable}`}>
      <body suppressHydrationWarning>
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
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
