"use client";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import LedBillboardSection from "@/app/components/Home/LedBillboard";
import BillboardSection from "@/app/components/Home/BillboardSection";
import LamppostSection from "@/app/components/Home/Lamppost";
import AirportSection from "@/app/components/Home/Airport";
import RetailStoreSection from "@/app/components/Home/RetailStore";

export default function OutdoorAdvertisingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Outdoor Advertising Marketplace"
        subtitle="Find and book billboards and other OOH media locations with VAAD+. Discover real-time inventory, get quotes and manage your outdoor advertising campaigns in one platform."
      />

      <div className="bg-white">
        {/* LED Billboards */}
        <LedBillboardSection />

        {/* Static Billboards */}
        <BillboardSection />

        {/* Lamppost Advertising */}
        <LamppostSection />

        {/* Airport Advertising */}
        <AirportSection />

        {/* Retail Store Advertising */}
        <RetailStoreSection />

        {/* CTA */}
        <ConsultationCTA />
      </div>

      <Footer />
    </div>
  );
}