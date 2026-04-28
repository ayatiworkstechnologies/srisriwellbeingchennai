import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f6f1]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/images/therapy-bg-pattern.svg"
          alt="Pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none text-[#d0a93d] drop-shadow-sm" style={{ fontFamily: "sans-serif" }}>
          404
        </h1>
        
        <div className="mb-8 mt-4 h-[3px] w-[82px] rounded-full bg-[#c29a2f]" />

        <h2 className="mb-4 text-2xl md:text-4xl font-bold text-[#35140b] font-primary">
          Page Not Found
        </h2>
        
        <p className="mb-10 max-w-[500px] text-base md:text-lg text-[#5e5751]">
          The sanctuary you are looking for seems to have faded into the mist. Let us guide you back to your journey of wellness.
        </p>

        <Link
          href="/"
          className="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-[#c29a2f] px-8 font-medium text-white transition-all duration-300 hover:bg-[#a68224] hover:shadow-lg"
        >
          Return to Sanctuary
        </Link>
      </div>
    </div>
  );
}
