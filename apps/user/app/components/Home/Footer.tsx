"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import NewsletterModal from "../NewsletterModal";

/* =========================
   ANIMATION VARIANTS
========================= */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =========================
   FOOTER DATA (matches screenshot)
========================= */
const footerSections = [
  {
    title: "COMPANY",
    links: [
      { label: "About us", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Blog", href: "/blog" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "VAAD PRODUCTS",
    links: [
      { label: "Outdoor advertising", href: "/products/outdoor" },
      { label: "Television", href: "/products/television" },
      { label: "Radio", href: "/products/radio" },
      { label: "Print", href: "/products/print" },
      { label: "Digital Marketing", href: "/products/digital" },
    ],
  },
  {
    title: "LEGAL POLICIES",
    links: [
      { label: "Advertisers Booking Policy", href: "/policies/advertisers-booking" },
      { label: "Media Partner Policy", href: "/policies/media-partner" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterMode, setNewsletterMode] = useState<"subscribe" | "unsubscribe">("subscribe");

  const handleSubscribeClick = () => {
    if (email) {
      setNewsletterMode("subscribe");
      setIsNewsletterModalOpen(true);
    }
  };

  return (
    <>
      <footer className="bg-white border-t border-gray-100">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-5 pt-16 pb-10"
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-14">
            
            {/* LEFT — Logo + Newsletter */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/Vaad+.svg"
                  alt="VAAD Media"
                  width={70}
                  height={36}
                  className="w-auto h-6"
                  priority
                />
              </Link>

              <p className="text-[15px] text-[#667085] leading-relaxed mb-6 max-w-xs">
                Be the first to receive all the recent updates, articles,
                and valuable materials.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#D0D5DD] rounded-lg px-4 py-3 text-sm w-full sm:max-w-[220px] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/30 focus:border-[#0177AB] transition"
                />
                <motion.button
                  onClick={handleSubscribeClick}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#0177AB] hover:bg-[#016693] text-white px-6 py-3 rounded-lg text-sm font-semibold transition whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>

            {/* RIGHT — 3 Link Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {footerSections.map((section) => (
                <motion.div key={section.title} variants={fadeUp}>
                  <h4 className="text-[16px] font-semibold text-[#626060] tracking-wide uppercase mb-5">
                    {section.title}
                  </h4>

                  <ul className="space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[14px] text-[#344054] hover:text-[#0177AB] transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="border-t border-gray-200"
          />

          {/* Bottom — Copyright only */}
          <motion.div
            variants={fadeUp}
            className="pt-8 text-center"
          >
            <p className="text-[13px] text-[#98A2B3]">
              © {new Date().getFullYear()} VAAD Media Limited. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </footer>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        mode={newsletterMode}
      />
    </>
  );
}