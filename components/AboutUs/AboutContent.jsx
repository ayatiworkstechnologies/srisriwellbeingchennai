"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import RevealOnScroll from "../Main/RevealOnScroll";
import { FaEye, FaHandHoldingHeart } from "react-icons/fa6";
import LeafGlyph from "../ui/LeafGlyph";
import { listPublicTeam } from "@/lib/api";

function isDoctorProfile(profile) {
  const role = `${profile.role_label || ""} ${profile.qualification || ""}`.toLowerCase();
  return role.includes("doctor") || role.includes("physician") || role.includes("vaidya");
}

function normalizeProfile(profile) {
  return {
    id: profile.id,
    fullName: profile.full_name || profile.fullName || "",
    roleLabel: profile.role_label || profile.roleLabel || "Doctor",
    qualification: profile.qualification || "",
    experienceYears: profile.experience_years || profile.experienceYears || 0,
    languages: Array.isArray(profile.languages) ? profile.languages : [],
    image: profile.image || "/images/doctor-placeholder.png",
    specialties: Array.isArray(profile.specialties) ? profile.specialties : [],
    bio: profile.bio || "",
  };
}

export default function AboutContent() {
  const [teamProfiles, setTeamProfiles] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadTeam() {
      try {
        const result = await listPublicTeam();
        if (!active || !Array.isArray(result)) return;
        setTeamProfiles(result.map((item) => normalizeProfile(item)).filter((item) => item.fullName));
      } catch {
        if (active) {
          setTeamProfiles([]);
        }
      }
    }

    loadTeam();

    return () => {
      active = false;
    };
  }, []);

  const doctorProfiles = useMemo(() => {
    const doctors = teamProfiles.filter((profile) => isDoctorProfile(profile));
    return doctors.length ? doctors : teamProfiles;
  }, [teamProfiles]);

  return (
    <section className="section-padding relative bg-[#fcfaf7] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f5ede1] to-transparent opacity-50" />
      <div className="absolute right-0 top-[20%] h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl" />

      <div className="container-width relative z-10">
        
        {/* Header Section */}
        <RevealOnScroll className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#c29a2f] md:text-sm">
            About Us
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-normal text-black md:text-5xl lg:text-6xl">
            Rediscover the Art of Wellbeing
          </h2>
          <div className="mx-auto mt-7 h-[3px] w-20 rounded-full bg-[#d4af37]" />
        </RevealOnScroll>

        {/* Two Column Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <RevealOnScroll className="space-y-6 text-[#4f443c]">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#3b2218]">
              In a world that rarely pauses, true wellbeing has become the
              ultimate luxury.
            </p>
            <p className="para-text">
              At Sri Sri Wellbeing Chennai, we invite you into a refined sanctuary where ancient Ayurvedic wisdom meets contemporary living, crafted for those who seek balance, clarity, and restoration amidst the rhythm of the city.
            </p>
            <p className="para-text">
              Rooted in the timeless science of Ayurveda and guided by experienced doctors and skilled therapists, every experience is thoughtfully personalised to align with your body, lifestyle, and evolving wellbeing needs. From restorative therapies and detox rituals to deep relaxation and holistic healing, each journey is designed to nurture harmony from within.
            </p>
            <p className="para-text">
              Located in the heart of Chennai, our centre brings together serene spaces, calming ambience, and elevated care to create an environment of quiet sophistication. Spacious therapy suites, attentive wellness experts, and immersive healing experiences come together seamlessly, offering more than treatment, but a mindful return to self.
            </p>
            <p className="para-text">
              Inspired by the philosophy that wellbeing is not a moment, but a way of life, Sri Sri Wellbeing Chennai blends traditional healing practices with modern wellness perspectives to support physical vitality, mental clarity, and emotional ease.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="relative h-[450px] sm:h-[550px] lg:h-[650px] w-full rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border-4 border-white group">
            <Image 
              src="/images/facilities/facilities-3.png" 
              alt="Sri Sri Wellbeing Interior" 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/40 via-transparent to-transparent" />
          </RevealOnScroll>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <RevealOnScroll delay={0.1}>
            <div className="group h-full bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#eadfce] hover:border-[#d4af37] transition-all duration-500 hover:-translate-y-2">
              <div className="h-16 w-16 rounded-2xl bg-[#fdf8ef] text-[#c29a2f] flex items-center justify-center mb-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                <FaEye className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-serif text-[#23130d] mb-4">Our Vision</h3>
              <p className="text-[#5c4a41] leading-relaxed text-lg">
                To redefine modern wellbeing through timeless Ayurvedic wisdom, creating spaces where individuals can reconnect with balance, vitality, and a more conscious way of living.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="group h-full bg-[#fdf8ef] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgba(212,175,55,0.08)] border border-[#f5ede1] hover:border-[#d4af37] transition-all duration-500 hover:-translate-y-2">
              <div className="h-16 w-16 rounded-2xl bg-white text-[#c29a2f] flex items-center justify-center mb-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500 shadow-sm">
                <FaHandHoldingHeart className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-serif text-[#23130d] mb-4">Our Mission</h3>
              <p className="text-[#5c4a41] leading-relaxed text-lg">
                To offer deeply personalised wellness experiences that nurture physical health, mental clarity, and emotional harmony through authentic Ayurveda, compassionate care, and thoughtfully curated healing environments.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Final Quote */}
        <RevealOnScroll delay={0.3} className="max-w-4xl mx-auto text-center border-t border-[#d4af37]/20 pt-16 pb-8">
          <LeafGlyph className="h-10 w-10 text-[#d4af37] mx-auto mb-8 opacity-80" />
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#c29a2f] leading-snug">
            &ldquo;Sri Sri Wellbeing is where healing becomes an experience of grace, balance, and renewal.&rdquo;
          </p>
        </RevealOnScroll>

        {doctorProfiles.length ? (
          <div className="pt-16">
            <RevealOnScroll className="mx-auto mb-12 max-w-4xl text-center">
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#c29a2f] md:text-sm">
                Expert Care
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-normal text-black md:text-5xl">
                Meet Our Doctors
              </h2>
              <div className="mx-auto mt-7 h-[3px] w-20 rounded-full bg-[#d4af37]" />
            </RevealOnScroll>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {doctorProfiles.map((profile, index) => (
                <RevealOnScroll key={profile.id || profile.fullName} delay={(index % 3) * 0.08}>
                  <article className="group h-full overflow-hidden rounded-[30px] border border-[#eadfce] bg-white shadow-[0_16px_45px_rgba(59,34,24,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]">
                    <div className="relative h-[320px] overflow-hidden bg-[#f5ede1]">
                      <Image
                        src={profile.image}
                        alt={profile.fullName}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/55 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5d67d]">
                          {profile.roleLabel}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white">
                          {profile.fullName}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      {profile.qualification ? (
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a741d]">
                          {profile.qualification}
                        </p>
                      ) : null}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {profile.experienceYears ? (
                          <span className="rounded-full bg-[#fdf8ef] px-3 py-1 text-xs font-semibold text-[#6f4b1b]">
                            {profile.experienceYears}+ years
                          </span>
                        ) : null}
                        {profile.languages.slice(0, 3).map((language) => (
                          <span key={language} className="rounded-full bg-[#f8f3e9] px-3 py-1 text-xs font-semibold text-[#6f4b1b]">
                            {language}
                          </span>
                        ))}
                      </div>
                      {profile.bio ? (
                        <p className="mt-5 line-clamp-4 text-sm leading-7 text-[#5c4a41]">
                          {profile.bio}
                        </p>
                      ) : null}
                      {profile.specialties.length ? (
                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#b88621]">
                          {profile.specialties.slice(0, 3).join(" | ")}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
