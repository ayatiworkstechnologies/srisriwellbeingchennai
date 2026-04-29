"use client";

export default function AuthenticSpaFooter() {
  return (
    <footer className="bg-[#f8f6f1] py-6 border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-[#5e5751] text-sm">
          &copy; 2026 Sri Sri Wellbeing Chennai
        </p>
        <p className="eyebrow-text text-[#857b72]">
          Design and Developed by{" "}
          <a 
            href="https://ayatiworks.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#c29a2f] transition-colors font-bold"
          >
            Ayatiworks
          </a>
        </p>
      </div>
    </footer>
  );
}
