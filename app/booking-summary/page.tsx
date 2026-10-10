"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import PageBanner from "@/app/components/PageBanner";
import { ChevronDown, LoaderCircle, Upload } from "lucide-react";
import { useCartContext } from "@/app/contexts/cart-context";
import { usePayment } from "@/app/hooks/usePayment";
import { saveBookingDetails } from "@/app/lib/payment/booking-details";

const LOCATION_OPTIONS = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Aba"];
const INDUSTRY_OPTIONS = [
  "FMCG",
  "Telco",
  "Retail",
  "Education",
  "Health",
  "Finance",
  "Others",
];
const OBJECTIVE_OPTIONS = [
  "Brand Awareness",
  "Product Launch",
  "Lead Generation",
  "Event Promotion",
  "Others",
];

export default function BookingSummaryPage() {
  const { cartItems, isLoading: isCartLoading } = useCartContext();
  const {
    initializePayment,
    isPaying,
    error: paymentError,
    clearError,
  } = usePayment();
  const router = useRouter();
  const [brandName, setBrandName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [objective, setObjective] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [coupon, setCoupon] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bookingItems = useMemo(
    () =>
      cartItems.map((item) => {
        const billboard = item.billboard;
        const unitPrice = Number(
          billboard?.rate ?? billboard?.price ?? item.rate ?? item.price ?? 0,
        );
        const durationInMonths = Number(item.durationInMonths) || 1;
        const startDate = new Date(`${item.startDate}T00:00:00`);
        const displayDate = Number.isNaN(startDate.getTime())
          ? item.startDate
          : startDate.toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

        return {
          id: item._id,
          name: billboard?.mediaType || "Billboard",
          location: [
            billboard?.locationAddress,
            billboard?.city,
            billboard?.state,
          ]
            .filter(Boolean)
            .join(", "),
          durationInMonths,
          displayDate,
          unitPrice,
          total: unitPrice * durationInMonths,
        };
      }),
    [cartItems],
  );

  const subTotal = bookingItems.reduce((sum, item) => sum + item.total, 0);
  const serviceFee = subTotal * 0.1; // 10%
  const vat = (subTotal + serviceFee) * 0.075; // 7.5%
  const total = subTotal + serviceFee + vat;
  const canPay =
    agreed && bookingItems.length > 0 && !isCartLoading && !isPaying;

  const formatNaira = (n: number) =>
    `₦${n.toLocaleString("en-NG", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    })}`;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // handle file upload here
  };

  const getOrderItems = () =>
    cartItems
      .map((item) => ({
        durationInMonths: item.durationInMonths,
        billboardId: item.billboardId || item.billboard?._id || "",
        startDate: item.startDate,
      }))
      .filter((item) => item.billboardId);

  const getBookingFields = () => ({
    orderItems: getOrderItems(),
    ...(coupon.trim() ? { couponCode: coupon.trim() } : {}),
    ...(brandName.trim() ? { brandName: brandName.trim() } : {}),
    ...(location ? { location } : {}),
    ...(industry ? { industry } : {}),
    ...(objective ? { objective } : {}),
    ...(additionalInfo.trim() ? { additionalInfo: additionalInfo.trim() } : {}),
    ...(artworkUrl.trim() ? { artworkUrl: artworkUrl.trim() } : {}),
  });

  const getBookingSnapshot = () => ({
    items: bookingItems.map((item) => ({
      id: item.id,
      name: item.name,
      location: item.location,
      durationInMonths: item.durationInMonths,
      startDate:
        cartItems.find((cartItem) => cartItem._id === item.id)?.startDate ?? "",
      unitPrice: item.unitPrice,
      total: item.total,
    })),
    brandName,
    location,
    industry,
    objective,
    additionalInfo,
    artworkUrl,
    amount: total,
  });

  const handlePayNow = async () => {
    if (!canPay) return;
    clearError();
    await initializePayment(getBookingFields(), getBookingSnapshot());
  };

  const handlePayLater = async () => {
    if (!canPay) return;
    clearError();
    const draftId = `draft-${crypto.randomUUID()}`;
    saveBookingDetails({ _id: draftId }, getBookingSnapshot());
    router.push(`/booking-pending?orderId=${encodeURIComponent(draftId)}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar transparent />
      </div>

      {/* Banner */}
      <PageBanner
        showHome={true}
        backgroundImage="/images/board.jpg"
        title="Review Your Booking"
        subtitle="Confirm your selected billboards and complete payment to secure your campaign"
        breadcrumbs={[
          { label: "Advertise", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Booking Summary" },
        ]}
      />

      {/* Main content */}
      <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto">
          {/* Inline breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-sm mb-8">
            <Link
              href="/"
              className="text-[#667185] hover:text-[#0177AB] transition"
            >
              Search Result
            </Link>
            <span className="text-[#98A2B3]">/</span>
            <Link
              href="/cart"
              className="text-[#667185] hover:text-[#0177AB] transition"
            >
              Cart
            </Link>
            <span className="text-[#98A2B3]">/</span>
            <span className="text-[#0177AB] font-medium">Booking summary</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-7 space-y-8">
              {/* Booking Summary card */}
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <h2 className="text-lg font-semibold text-[#101928]">
                    Booking Summary
                  </h2>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0177AB] text-white text-xs font-semibold">
                    {isCartLoading ? "…" : bookingItems.length}
                  </span>
                </div>

                {isCartLoading ? (
                  <div className="flex items-center gap-3 py-8 text-sm text-[#667185]">
                    <LoaderCircle className="h-5 w-5 animate-spin text-[#0177AB]" />
                    Loading your cart bookings...
                  </div>
                ) : bookingItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="font-medium text-[#101928]">
                      Your cart is empty
                    </p>
                    <p className="mt-1 text-sm text-[#667185]">
                      Add a billboard to your cart to review your booking here.
                    </p>
                    <Link
                      href="/advertise"
                      className="mt-4 inline-flex rounded-lg bg-[#0177AB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#016693]"
                    >
                      Browse billboards
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F0F2F5]">
                    {bookingItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div>
                          <p className="text-[15px] font-medium text-[#101928]">
                            {item.name}
                          </p>
                          {item.location && (
                            <p className="mt-1 text-sm text-[#667185]">
                              {item.location}
                            </p>
                          )}
                          <p className="text-sm text-[#667185] mt-1">
                            Duration: {item.durationInMonths} month
                            {item.durationInMonths === 1 ? "" : "s"}{" "}
                            <span className="text-[#98A2B3]">/</span> Starts{" "}
                            {item.displayDate}
                          </p>
                        </div>
                        <p className="text-[15px] font-semibold text-[#101928] shrink-0">
                          {formatNaira(item.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tell us about your brand */}
              <div>
                <h2 className="text-lg font-semibold text-[#101928] mb-5">
                  Tell us about your brand
                </h2>

                <div className="space-y-5">
                  {/* Brand name */}
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                      Brand name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="What is your business name?"
                      className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] bg-white focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        {LOCATION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667185] pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                      Industry
                    </label>
                    <div className="relative">
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] bg-white focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                      >
                        <option value="" disabled>
                          Select Industry
                        </option>
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667185] pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Campaign objective */}
                  <div>
                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                      Campaign objective
                    </label>
                    <div className="relative">
                      <select
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] bg-white focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                      >
                        <option value="" disabled>
                          Select objective
                        </option>
                        {OBJECTIVE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667185] pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload artwork */}
              <div>
                <h2 className="text-lg font-semibold text-[#101928] mb-1">
                  Upload artwork{" "}
                  <span className="text-[#98A2B3] font-normal text-sm">
                    (optional)
                  </span>
                </h2>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition ${
                    isDragging
                      ? "border-[#0177AB] bg-[#0177AB]/5"
                      : "border-[#D0D5DD] bg-[#F9FAFB]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center mb-4">
                    <Upload size={20} className="text-[#667185]" />
                  </div>
                  <p className="text-sm text-[#344054]">
                    <span className="text-[#0177AB] font-medium cursor-pointer hover:underline">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-[#98A2B3] mt-1.5">
                    JPG, JPEG, PNG up to 5MB
                  </p>
                </div>

                {/* Or divider */}
                <div className="flex items-center gap-4 my-5">
                  <div className="flex-1 h-px bg-[#E4E7EC]" />
                  <span className="text-sm text-[#98A2B3]">or</span>
                  <div className="flex-1 h-px bg-[#E4E7EC]" />
                </div>

                {/* Import from URL */}
                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-1.5">
                    Import from URL{" "}
                    <span className="text-[#98A2B3] font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={artworkUrl}
                      onChange={(e) => setArtworkUrl(e.target.value)}
                      placeholder="Add file URL"
                      className="flex-1 px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                    />
                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition shrink-0"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#101928] mb-1">
                  Additional Information{" "}
                  <span className="text-[#98A2B3] font-normal text-sm">
                    (optional)
                  </span>
                </h2>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Tell us anything else we should know..."
                  rows={4}
                  className="mt-3 w-full px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition resize-none"
                />
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 sticky top-28">
                <h2 className="text-lg font-semibold text-[#101928] mb-6">
                  Payment Information
                </h2>

                {paymentError && (
                  <div
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {paymentError}
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#667185]">Sub Total</span>
                    <span className="font-medium text-[#101928]">
                      {formatNaira(subTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#667185]">Service fee (10%)</span>
                    <span className="font-medium text-[#101928]">
                      {formatNaira(serviceFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#667185]">VAT (7.5%)</span>
                    <span className="font-medium text-[#101928]">
                      {formatNaira(vat)}
                    </span>
                  </div>

                  <div className="border-t border-[#E4E7EC] pt-3 mt-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#101928]">
                        Total
                      </span>
                      <span className="font-bold text-[#101928] text-base">
                        {formatNaira(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#344054] mb-1.5">
                    Coupon code
                  </label>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
                  />
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#D0D5DD] text-[#0177AB] focus:ring-[#0177AB]/30"
                  />
                  <span className="text-xs text-[#667185] leading-relaxed">
                    By proceeding with this booking, you agree to VAAD+&apos;s{" "}
                    <Link
                      href="/terms"
                      className="text-[#0177AB] hover:underline"
                    >
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/policies/advertisers-booking"
                      className="text-[#0177AB] hover:underline"
                    >
                      Advertiser Booking &amp; Cancellation Policy
                    </Link>
                    . OOH media products listed on VAAD are third-party assets
                    and are subject to availability and confirmation.
                  </span>
                </label>

                <p className="mt-4 text-xs text-[#98A2B3] leading-relaxed">
                  VAAD+ shall charge a Service Fee of 10% on qualifying OOH
                  media products purchased through the Platform. The Service Fee
                  covers services that may include media finding, planning,
                  booking facilitation, campaign management, technology access,
                  administrative support, monitoring and reporting up to the
                  campaign&apos;s expiry.
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={handlePayLater}
                    disabled={!canPay}
                    className="flex-1 py-3.5 rounded-xl border border-[#D0D5DD] text-[#344054] text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Pay Later
                  </button>
                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={!canPay}
                    className="flex-1 py-3.5 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-[#0177AB]/20"
                  >
                    {isPaying ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <LoaderCircle size={16} className="animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
