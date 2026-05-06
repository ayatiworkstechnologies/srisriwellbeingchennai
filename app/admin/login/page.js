"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login for now, redirect to admin dashboard
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] flex flex-col justify-center items-center p-4">
      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-md p-8 md:p-10 border border-black/5">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Sri Sri Wellbeing"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1f1a17] mb-2 font-primary">Admin Portal</h1>
          <p className="text-[#7a726c] text-sm">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1f1a17] mb-2">Username or Email</label>
            <input 
              type="text" 
              required
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-3 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              placeholder="admin@srisriwellbeing.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1f1a17] mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-3 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a726c] hover:text-[#c29a2f] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link href="#" className="text-xs text-[#c29a2f] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#c29a2f] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[13px] transition-all duration-300 hover:bg-[#a88528] hover:shadow-[0_10px_20px_rgba(194,154,47,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-black/5 pt-6">
          <Link href="/" className="text-sm text-[#7a726c] hover:text-[#c29a2f] transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
