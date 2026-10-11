"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import { Target, Eye, Users, Building2, LayoutGrid, Settings } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="About Us"
        subtitle="VAAD+ combines technology, data and OOH expertise to make outdoor advertising more accessible and measurable."
      />

      {/* ========== Who We Are ========== */}
      <section className="px-4 sm:px-8 lg:px-16 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden">
            <Image
              src="/images/board.jpg"
              alt="VAAD outdoor advertising"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#0177AB] mb-2">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101928] leading-tight">
              Powering the Future of Out-of-Home Advertising
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#667185] leading-relaxed">
              VAAD+ is an OOH marketplace and technology infrastructure platform
              operated by VAAD Media Ltd., connecting advertisers, agencies and
              media owners through a smarter, simpler and more transparent way to
              discover, plan, book and manage Out-of-Home advertising.
            </p>
            <Link
              href="/outdoor"
              className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
            >
              Get your billboard
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Building the Infrastructure ========== */}
      <section className="px-4 sm:px-8 lg:px-16 py-14 lg:py-20 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101928] leading-tight">
              We are Building the Infrastructure Behind Smarter OOH
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#667185] leading-relaxed">
              VAAD+ brings advertisers, agencies and media owners into one
              connected digital ecosystem, making it easier to discover media
              opportunities, evaluate locations, check availability, manage
              bookings and track campaigns.
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#667185] leading-relaxed">
              By combining technology, data and OOH expertise, we are modernizing
              an industry that has traditionally relied on fragmented processes,
              manual communication and limited visibility.
            </p>
            <Link
              href="/outdoor"
              className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
            >
              Get your billboard
            </Link>
          </div>

          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/board.jpg"
              alt="OOH infrastructure"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ========== What We Do ========== */}
      <section className="px-4 sm:px-8 lg:px-16 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden">
            <Image
              src="/images/board.jpg"
              alt="What we do"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#0177AB] mb-2">What We Do</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101928] leading-tight">
              Making OOH advertising simpler, smarter, and more accessible.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#667185] leading-relaxed">
              Through VAAD+, advertisers can discover the right media
              opportunities, evaluate locations, check availability, request or
              confirm bookings, and manage campaigns with greater visibility and
              control. VAAD+ combines OOH inventory with location data, audience
              insights, availability information, campaign management and
              performance reporting to help advertisers make better media
              decisions.
            </p>
            <Link
              href="/outdoor"
              className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
            >
              Get your billboard
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Mission & Vision ========== */}
      <section className="px-4 sm:px-8 lg:px-16 py-14 lg:py-16 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8">
            <div className="w-11 h-11 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-5">
              <Target size={22} className="text-[#0177AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#101928]">Our Mission</h3>
            <p className="mt-3 text-sm text-[#667185] leading-relaxed">
              We are transforming the traditional OOH buying experience by
              bringing media discovery, location intelligence, availability,
              booking, campaign management and reporting into one connected
              platform.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8">
            <div className="w-11 h-11 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-5">
              <Eye size={22} className="text-[#0177AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#101928]">Our Vision</h3>
            <p className="mt-3 text-sm text-[#667185] leading-relaxed">
              Our goal is simple: make OOH advertising easier to find, easier to
              buy, easier to manage and easier to measure. VAAD+ brings both
              demand and supply together, creating a more efficient OOH
              ecosystem for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ========== Result-driven agency ========== */}
      <section className="px-4 sm:px-8 lg:px-16 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101928] text-center mb-10">
            A result-driven agency,
            <br className="hidden sm:block" /> built with excellence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "For Advertisers & Agencies",
                text: "Advertisers can discover the right media opportunities, evaluate locations, check availability, request or confirm bookings, and manage campaigns with greater visibility and control.",
              },
              {
                icon: Building2,
                title: "For Media Owners",
                text: "VAAD+ provides a digital marketplace to list, manage and monetize their OOH inventory while connecting them with qualified media buyers with a wider pool of advertisers and agencies.",
              },
              {
                icon: LayoutGrid,
                title: "Our Coverage / Formats",
                text: "From billboards and digital screens to transit, bus shelters and other OOH formats, VAAD+ is building a connected marketplace for outdoor advertising.",
              },
              {
                icon: Settings,
                title: "How We Work",
                text: "VAAD+ combines technology, data and OOH expertise to make outdoor advertising more accessible and measurable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F7F9FC] rounded-2xl border border-[#E4E7EC] p-6 sm:p-8"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-[#0177AB]" />
                </div>
                <h3 className="text-base font-semibold text-[#101928]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#667185] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-xs text-[#98A2B3] leading-relaxed max-w-4xl mx-auto text-center">
            Disclaimer: VAAD+ does not own the OOH media assets listed on its
            marketplace. The media products available on VAAD+ are provided by
            independent third-party media owners and operators. VAAD+ facilitates
            the discovery, connection, booking and management of these
            opportunities through its technology platform, subject to applicable
            terms and availability.
          </p>
        </div>
      </section>

      <ConsultationCTA />
      <Footer />
    </div>
  );
}