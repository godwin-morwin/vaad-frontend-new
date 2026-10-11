"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { MapPin } from "lucide-react";

/* ---------- mock data (replace with real booked boards API) ---------- */
const bookedBoards = [
  {
    id: "1",
    name: "LED Billboard",
    location: "Lekki-Epe Express Way, Lagos",
    price: 2000000,
    status: "Booked",
    image: "/images/board.jpg", // replace with real image URLs
  },
  {
    id: "2",
    name: "Static Billboard",
    location: "Lekki-Epe Express Way, Lagos",
    price: 2000000,
    status: "Booked",
    image: "/images/board.jpg",
  },
  {
    id: "3",
    name: "Rooftop Billboard",
    location: "Lekki-Epe Express Way, Lagos",
    price: 2000000,
    status: "Booked",
    image: "/images/board.jpg",
  },
];

export default function BookedBoardsPage() {
  const formatNaira = (n: number) =>
    `₦${n.toLocaleString("en-NG")}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      {/* Banner */}
      <PageBanner
        showHome={true}
        backgroundImage="/images/board.jpg"
        title="Your Booked Boards"
        subtitle="Track performance and manage your active campaigns in one place"
        breadcrumbs={[
          { label: "Advertise", href: "/" },
          { label: "Booked Boards" },
        ]}
      />

      {/* Main content */}
      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto">
          {/* Inline breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-sm mb-8">
            <Link
              href="/"
              className="text-[#667185] hover:text-[#0177AB] transition"
            >
              Billboard
            </Link>
            <span className="text-[#98A2B3]">/</span>
            <span className="text-[#0177AB] font-medium">Booked boards</span>
          </nav>

          {/* Heading + count */}
          <div className="flex items-center gap-2.5 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101928]">
              Booked Boards
            </h2>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0177AB] text-white text-xs font-semibold">
              {bookedBoards.length}
            </span>
          </div>

          {/* Board list */}
          <div className="space-y-6">
            {bookedBoards.map((board) => (
              <div
                key={board.id}
                className="flex flex-col sm:flex-row gap-5 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-[#E4E7EC] bg-white hover:shadow-sm transition"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-[200px] lg:w-[220px] h-[140px] sm:h-[130px] rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={board.image}
                    alt={board.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold text-[#101928]">
                      {board.name}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#667185]">
                      <MapPin size={14} className="shrink-0 text-[#98A2B3]" />
                      <span className="truncate">{board.location}</span>
                    </p>

                    <p className="mt-3 text-lg font-bold text-[#101928]">
                      {formatNaira(board.price)}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link
                        href={`/bookings/${board.id}/monitor`}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
                      >
                        Monitor Campaign
                      </Link>
                      <Link
                        href={`/billboard/${board.id}`}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#0177AB] text-[#0177AB] hover:bg-[#0177AB]/5 text-sm font-semibold transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className="shrink-0 self-start inline-flex items-center px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100">
                    {board.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {bookedBoards.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#667185] text-sm mb-4">
                You don&apos;t have any booked boards yet.
              </p>
              <Link
                href="/"
                className="inline-flex px-6 py-3 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
              >
                Browse Billboards
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}