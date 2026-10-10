"use client";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import TransitSection from "@/app/components/Home/Transit";
import BusShelterSection from "@/app/components/Home/BusShelter";

export default function TransitAdvertisingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Transit Advertising"
        subtitle="Advertise where people already are — on the move. Reach transit riders daily through Nigeria's bus communities."
      />

      <div className="bg-white">
        {/* BRT / Bus / Minibus / Tricycle blocks live in TransitSection.
            If you split them later, import each section separately. */}
        <TransitSection />

        {/* Bus Shelter */}
        <BusShelterSection />

        {/* CTA */}
        <ConsultationCTA />
      </div>

      <Footer />
    </div>
  );
}