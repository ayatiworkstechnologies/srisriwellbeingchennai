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
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PCQPKFM3');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCQPKFM3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
