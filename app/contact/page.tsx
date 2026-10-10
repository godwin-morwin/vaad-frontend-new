"use client";

import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const OFFICE_ADDRESS =
  "1b, Awayewaserere Street, Off Lateef Jakande Road, Agidingbi, Ikeja, Lagos.";
const EMAIL = "briefs@vaad.com.ng";
const PHONES = ["(+234) 901 794 4928", "(+234) 808 559 7663"];
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(OFFICE_ADDRESS);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Contact Us"
        subtitle="We are one message away. Tell us what you're working on, and we will help you bring it to life."
      />

      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* ========== Let's Connect card ========== */}
          <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-xl font-semibold text-[#101928]">
              Let&apos;s Connect
            </h2>
            {/* teal underline */}
            <div className="mt-2 w-10 h-1 rounded-full bg-[#0177AB]" />

            <p className="mt-4 text-sm text-[#667185] max-w-xl">
              We&apos;d Love to hear from you. Reach out to us using any of the
              details below
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {/* Left column */}
              <div className="space-y-7">
                {/* Office Address */}
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E8F4FA] flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#0177AB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101928] mb-1">
                      Office Address
                    </p>
                    <p className="text-sm text-[#667185] leading-relaxed">
                      {OFFICE_ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E8F4FA] flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#0177AB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101928] mb-1">
                      Phone Number
                    </p>
                    <div className="space-y-0.5">
                      {PHONES.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          className="block text-sm text-[#667185] hover:text-[#0177AB] transition"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-7">
                {/* Email */}
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E8F4FA] flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#0177AB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101928] mb-1">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm text-[#667185] hover:text-[#0177AB] transition"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E8F4FA] flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#0177AB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101928] mb-1">
                      Business Hours
                    </p>
                    <p className="text-sm text-[#667185]">
                      Mon – Fri: 9:00 AM – 5:00 PM
                    </p>
                    <p className="text-sm text-[#667185]">Sat – Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== Map section ========== */}
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden border border-[#E4E7EC] bg-[#E8ECF0]">
            {/* Google Maps embed — replace src with your exact place embed if needed */}
            <iframe
              title="VAAD+ Office Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                OFFICE_ADDRESS,
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Floating "Find us here" card */}
            <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-10 w-[min(100%,280px)] bg-white rounded-2xl shadow-lg border border-[#E4E7EC] p-5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-3">
                <MapPin size={18} className="text-[#0177AB]" />
              </div>

              <h3 className="text-base font-semibold text-[#101928]">
                Find us here
              </h3>
              <p className="mt-1.5 text-sm text-[#667185] leading-relaxed">
                {OFFICE_ADDRESS}
              </p>

              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#0177AB] hover:underline"
              >
                Get Directions
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}