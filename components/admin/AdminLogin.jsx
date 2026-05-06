"use client";

import Image from "next/image";
import { FlashMessage } from "./admin-ui";

export default function AdminLogin({ 
  handleLogin, 
  credentials, 
  setCredentials, 
  isSubmitting, 
  errorMessage, 
  successMessage 
}) {
  return (
    <div className="min-h-[82vh] flex flex-col justify-center items-center p-4">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_460px] lg:items-center">
        <div className="hidden rounded-[2.8rem] border border-white/70 bg-[linear-gradient(145deg,#1f1a17,#443226)] p-10 text-white shadow-[0_40px_120px_rgba(32,18,10,0.22)] lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#e2bf70]">Backend Console</p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-tight tracking-tight">
            Clean admin control for bookings and therapy content.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-8 text-white/72">
            A focused workspace for monitoring booking demand, updating service
            content, and keeping the public experience in sync with backend data.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">Bookings</p>
              <p className="mt-3 text-2xl font-semibold text-white">Live</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">Services</p>
              <p className="mt-3 text-2xl font-semibold text-white">Managed</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">Therapies</p>
              <p className="mt-3 text-2xl font-semibold text-white">Connected</p>
            </div>
          </div>
        </div>

        <div className="bg-white/82 backdrop-blur-xl rounded-[2.6rem] shadow-[0_32px_120px_rgba(32,18,10,0.08)] w-full max-w-md mx-auto p-10 md:p-12 border border-white/80">
          <div className="flex justify-center mb-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#f8f6f1] p-3 shadow-sm border border-black/5">
            <Image
              src="/logo.svg"
              alt="Sri Sri Wellbeing"
              width={80}
              height={80}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
              priority
            />
          </div>
          </div>

          <div className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c29a2f] mb-3">Secure Access</p>
            <h1 className="text-3xl font-bold text-[#1f1a17] mb-2 font-serif tracking-tight">Backend Admin</h1>
            <p className="text-[#7a726c] text-sm leading-relaxed">Sign in to manage bookings, services, relaxation therapies, and API-driven content.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
          {errorMessage && <FlashMessage tone="error" message={errorMessage} />}
          {successMessage && <FlashMessage tone="success" message={successMessage} />}
          
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1f1a17] ml-1">Email Address</label>
            <input 
              type="email" 
              value={credentials.email} 
              onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
              required
              className="w-full h-14 rounded-2xl border border-black/10 bg-[#f8f6f1] px-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              placeholder="admin@srisriwellbeingchennai.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1f1a17] ml-1">Password</label>
            <input 
              type="password" 
              value={credentials.password} 
              onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
              required
              className="w-full h-14 rounded-2xl border border-black/10 bg-[#f8f6f1] px-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 bg-[linear-gradient(135deg,#caa03f,#a97b24)] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:brightness-105 hover:shadow-[0_12px_24px_rgba(194,154,47,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center shadow-lg shadow-[#c29a2f]/20"
          >
            {isSubmitting ? "Verifying..." : "Enter Backend Admin"}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
