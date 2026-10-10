"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { Check, FileText, Hourglass } from "lucide-react";
import {
  BookingDetails,
  getBookingDetails,
} from "@/app/lib/payment/booking-details";

interface BookingResultPageProps {
  isConfirmed: boolean;
}

export default function BookingResultPage({
  isConfirmed,
}: BookingResultPageProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const reference = searchParams.get("reference");
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    setBooking(getBookingDetails(orderId, reference));
  }, [orderId, reference]);

  const subtotal =
    booking?.items.reduce((sum, item) => sum + item.total, 0) ?? 0;
  const serviceFee = subtotal * 0.1;
  const vat = (subtotal + serviceFee) * 0.075;
  const total = booking?.amount ?? subtotal + serviceFee + vat;
  const formatPrice = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  const title = isConfirmed ? "Booking Confirmed" : "Booking Pending";

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      <PageBanner
        showHome
        backgroundImage="/images/board.jpg"
        title={title}
        subtitle={
          isConfirmed
            ? "Your payment was verified and your campaign booking is confirmed."
            : "Your booking has been saved. Payment is still required to secure your campaign."
        }
        breadcrumbs={[
          { label: "Advertise", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: title },
        ]}
      />

      <section className="px-4 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div
              className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                isConfirmed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {isConfirmed ? (
                <Check size={34} strokeWidth={2.5} />
              ) : (
                <Hourglass size={32} />
              )}
            </div>
            <h2 className="text-xl font-semibold text-[#101928]">
              {isConfirmed
                ? "Your campaign booking is confirmed"
                : "Your booking has been saved"}
            </h2>
            <p className="mt-2 text-sm text-[#667185]">
              {isConfirmed
                ? "A confirmation with your order details will be sent to your email."
                : "This booking is unpaid and is not yet secured. Complete payment when you are ready."}
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-[#E4E7EC] bg-[#FAFAFB] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E4E7EC] pb-5">
              <div>
                <h3 className="font-semibold text-[#101928]">
                  Booking Summary
                </h3>
                {reference && (
                  <p className="mt-1 text-xs text-[#667185]">
                    Reference:{" "}
                    <span className="font-medium text-[#344054]">
                      {reference}
                    </span>
                  </p>
                )}
              </div>
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  isConfirmed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}
              >
                {isConfirmed ? "PAID" : "PAYMENT PENDING"}
              </span>
            </div>

            {booking?.items.length ? (
              <div className="divide-y divide-[#E4E7EC]">
                {booking.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#101928]">
                        {item.name}
                      </p>
                      {item.location && (
                        <p className="mt-0.5 text-xs text-[#667185]">
                          {item.location}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-[#667185]">
                        {item.durationInMonths} month
                        {item.durationInMonths === 1 ? "" : "s"}
                        {item.startDate ? ` · Starts ${item.startDate}` : ""}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-[#101928]">
                      {formatPrice(item.total)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 py-4 text-sm">
                  <div className="flex justify-between text-[#667185]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#667185]">
                    <span>Service fee</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-[#667185]">
                    <span>VAT (7.5%)</span>
                    <span>{formatPrice(vat)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E4E7EC] pt-3 font-semibold text-[#101928]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="grid gap-x-6 gap-y-3 border-t border-[#E4E7EC] py-4 text-sm sm:grid-cols-2">
                  {booking.brandName && (
                    <Detail label="Brand name" value={booking.brandName} />
                  )}
                  {booking.location && (
                    <Detail
                      label="Campaign location"
                      value={booking.location}
                    />
                  )}
                  {booking.industry && (
                    <Detail label="Industry" value={booking.industry} />
                  )}
                  {booking.objective && (
                    <Detail
                      label="Campaign objective"
                      value={booking.objective}
                    />
                  )}
                </div>

                {booking.additionalInfo && (
                  <div className="border-t border-[#E4E7EC] py-4">
                    <Detail
                      label="Additional information"
                      value={booking.additionalInfo}
                    />
                  </div>
                )}

                {booking.artworkUrl && (
                  <div className="flex items-center gap-3 border-t border-[#E4E7EC] py-4">
                    <FileText size={18} className="shrink-0 text-[#667185]" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#667185]">Artwork</p>
                      <a
                        href={booking.artworkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-sm font-medium text-[#0177AB] hover:underline"
                      >
                        {booking.artworkUrl}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="py-6 text-sm text-[#667185]">
                {orderId || reference
                  ? "Order details are unavailable in this browser. Your booking status is shown above."
                  : "Booking details were not provided for this order."}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex-1 rounded-lg border border-[#D0D5DD] px-4 py-3 text-center text-sm font-semibold text-[#344054] hover:bg-white"
              >
                {isConfirmed ? "Book another campaign" : "Continue browsing"}
              </Link>
              <Link
                href={isConfirmed ? "/bookings" : "/contact-us"}
                className="flex-1 rounded-lg bg-[#0177AB] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#016693]"
              >
                {isConfirmed ? "View my bookings" : "Get help with payment"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-[#667185]">{label}</p>
      <p className="mt-0.5 wrap-break-word font-medium text-[#344054]">
        {value}
      </p>
    </div>
  );
}
