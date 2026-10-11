"use client";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import ServiceQuoteForm from "@/app/components/ServiceQuoteForm";

export default function RadioServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome={false}
        backgroundImage="/images/board.jpg"
        title="Radio"
        subtitle="Bring your story to life through television advertising that combines sight, sound, and storytelling to create memorable brand experiences."
      />

      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-3xl mx-auto">
          <ServiceQuoteForm defaultMediaType="Radio" />
        </div>
      </section>

      <ConsultationCTA />
      <Footer />
    </div>
  );
}