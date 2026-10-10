"use client";

import { useState } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { MapPin, ArrowUpRight, Plus, Minus } from "lucide-react";

const OFFICE_ADDRESS =
  "1b, Awayewaserere Street, Off Lateef Jakande Road, Agidingbi, Ikeja, Lagos.";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(OFFICE_ADDRESS);

const faqs = [
  {
    question: "What Services does VAAD Media offer?",
    answer:
      "We provide end-to-end outdoor advertising solutions such as billboards, LED digital screens, bus wraps, lamp post ads, wall drapes, and other high-impact OOH advertising formats.",
  },
  {
    question: "Can VAAD help me choose the best location for my campaign?",
    answer:
      "Yes. Our team helps you select high-visibility locations based on your target audience, budget, campaign goals, and traffic data across Lagos and other cities.",
  },
  {
    question: "How much does it cost to advertise with VAAD?",
    answer:
      "Pricing depends on the media type, location, size, duration, and format. Share your brief with us and we’ll provide a tailored quote that fits your budget.",
  },
  {
    question: "How long does it take to launch my campaign after I make payment?",
    answer:
      "Most campaigns can go live within a few days after payment confirmation, artwork approval, and site availability. Timelines vary by format and location.",
  },
  {
    question: "Do you offer proof of display?",
    answer:
      "Yes. We provide proof of display, including installation photos and monitoring updates, so you can verify that your campaign is running as booked.",
  },
  {
    question: "Can I run a short-term campaign?",
    answer:
      "Absolutely. We support short-term and long-term bookings depending on inventory availability. Tell us your preferred dates and we’ll advise on options.",
  },
  {
    question: "Do you operate only in Lagos?",
    answer:
      "Lagos is our primary market, but we can support campaigns in other major Nigerian cities through our network and partners. Reach out with your target cities.",
  },
  {
    question: "Can small businesses advertise with VAAD?",
    answer:
      "Yes. We work with brands of all sizes — from startups and SMEs to large enterprises — and can recommend cost-effective formats that still deliver strong visibility.",
  },
  {
    question: "What is the first step to get started?",
    answer:
      "Simply contact us with your campaign goals, budget, and preferred locations, or request a quick quote. Our team will guide you through inventory, pricing, and booking.",
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Frequently Asked Questions"
        subtitle="Got questions, we've got answers to your most common questions. Can't find what you're looking for? Reach out directly."
      />

      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* ========== FAQ accordion ========== */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden transition-shadow hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-medium text-[#101928] pr-2">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${
                        isOpen
                          ? "bg-[#E8F4FA] text-[#0177AB]"
                          : "bg-[#F2F4F7] text-[#667185]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-sm text-[#667185] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========== Map section ========== */}
          <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden border border-[#E4E7EC] bg-[#E8ECF0]">
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

            {/* Floating card */}
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