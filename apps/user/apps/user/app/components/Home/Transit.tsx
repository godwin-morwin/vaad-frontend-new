"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../SectionHeader";

interface BillboardSectionProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  limit?: number;
}

export default function TransitSection({
  title = "Transit Advertising",
  subtitle = "Take your brand on the move and connect with audiences throughout their daily commute.",
  showViewAll = true,
  limit = 3,
}: BillboardSectionProps) {
  return (
    <section className="sm:p-18 px-5 py-14 bg-white">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        showViewAll={showViewAll}
      />

      <div className="max-w-7xl flex sm:flex-row flex-col gap-6 w-full">
        {/* LEFT LARGE CARD */}
        <div className="relative rounded-xl overflow-hidden h-[460px] w-full">
          <img
            src="/images/ta-1.png"
            alt="Promo"
            className="w-full h-full object-cover"
          />

          {/* Faded Bottom Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 ">
            <h2 className="text-white text-[6vw] sm:text-[32px] font-semibold leading-snug">
              Put your brand in front of commuters every day.
            </h2>
            <p className="text-white/80 text-[16px] mt-2 leading-relaxed">
              Seen by thousands of riders and pedestrians on every route.
            </p>

            {/* CTA */}
            <button className="bg-[#0177AB] text-white hover:bg-[#015f8a] px-5 py-2 rounded-md text-sm font-medium shrink-0 w-fit mt-7">
              Book now
            </button>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="relative rounded-xl overflow-hidden h-[460px] w-full">
          <img
            src="/images/ta-2.png"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
