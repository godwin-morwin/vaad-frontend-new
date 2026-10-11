/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/Home/Footer";
import SimilarMedia from "@/app/components/SimilarMedia";
import PageBanner from "@/app/components/PageBanner";
import { Minus, Plus, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  billboardService,
  Billboard,
} from "@/app/lib/billboard/billboard-service";
import { useCartContext } from "@/app/contexts/cart-context";
import { useAuthContext } from "@/app/contexts/auth-context";
import AuthModal from "@/app/components/AuthModal";

export default function BillboardDetailsPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { id } = params;

  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { addToCart, isItemInCart, getCartItemByBillboardId } =
    useCartContext();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();

  const handleLeaveDetails = () => {
    const referrer = document.referrer;
    const hasSameOriginReferrer = referrer
      ? new URL(referrer).origin === window.location.origin
      : false;

    if (hasSameOriginReferrer && window.history.length > 1) {
      router.back();
      return;
    }

    router.replace("/");
  };

  useEffect(() => {
    if (isAuthLoading) return;
    setShowAuthModal(!isAuthenticated);
  }, [isAuthLoading, isAuthenticated]);

  useEffect(() => {
    const fetchBillboard = async () => {
      if (!id || isAuthLoading) return;

      setIsLoading(true);
      try {
        const data = await billboardService.getBillboardById(id as string, {
          skipAuthRedirect: !isAuthenticated,
        });
        setBillboard(data);
        if (data.photos?.[0] || data.images?.[0]) {
          setActiveImage(data.photos?.[0] || data.images?.[0] || "");
        }
      } catch (err) {
        console.error("Failed to fetch billboard:", err);
        setError("Failed to load billboard details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillboard();
  }, [id, isAuthLoading, isAuthenticated]);

  const allImages = billboard?.photos?.length
    ? billboard.photos
    : billboard?.images?.length
      ? billboard.images
      : [];

  const isInCart = billboard ? isItemInCart(billboard._id) : false;
  const cartItem = billboard ? getCartItemByBillboardId(billboard._id) : null;

  const formatDateYYYYMMDD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleAddToCart = async () => {
    if (!billboard) return;

    setIsAddingToCart(true);

    const payload = {
      billboardId: billboard._id,
      durationInMonths: quantity,
      startDate: startDate || formatDateYYYYMMDD(new Date()),
    };

    try {
      await addToCart(payload);
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const displayMediaType =
    billboard?.mediaType?.toLowerCase().replace(/-/g, " ") || "Billboard";

  const rate = billboard?.rate ?? billboard?.price;
  const dimension =
    billboard?.dimension ||
    (billboard?.height && billboard?.width
      ? `${billboard.height}x${billboard.width}ft`
      : "—");

  const mapLink =
    (billboard as any)?.googleMapLink ||
    (billboard as any)?.mapUrl ||
    (billboard?.locationAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${billboard.locationAddress}, ${billboard.city || ""}`,
        )}`
      : "https://www.google.com/maps");

  const isAvailable =
    (billboard as any)?.status?.toLowerCase() === "available" ||
    (billboard as any)?.availability?.toLowerCase() === "available" ||
    true;

  /* ===================== LOADING ===================== */
  if (isLoading) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleLeaveDetails}
          onSuccess={() => setShowAuthModal(false)}
          dismissible={false}
          onBack={handleLeaveDetails}
          showAlternativeActions={false}
          successRedirectTo={pathname}
        />
        <div className="bg-[#F7F9FC] min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar transparent />
          </div>
          <PageBanner
            showHome={false}
            title="Loading..."
            compact
            backgroundImage="/images/board.jpg"
          />
          <section className="bg-white px-4 sm:px-8 lg:px-16 py-10">
            <div className="max-w-7xl mx-auto animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="h-[420px] bg-gray-200 rounded-2xl" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-40 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  /* ===================== ERROR ===================== */
  if (error || !billboard) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleLeaveDetails}
          onSuccess={() => setShowAuthModal(false)}
          dismissible={false}
          onBack={handleLeaveDetails}
          showAlternativeActions={false}
          successRedirectTo={pathname}
        />
        <div className="bg-[#F7F9FC] min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar transparent />
          </div>
          <PageBanner
            showHome={true}
            title="Billboard Not Found"
            backgroundImage="/images/board.jpg"
          />
          <section className="bg-white px-4 sm:px-8 lg:px-16 py-10">
            <div className="max-w-7xl mx-auto text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Billboard Not Found
              </h2>
              <p className="text-gray-500 mb-6">
                {error || "The billboard you're looking for doesn't exist."}
              </p>
              <Link
                href="/"
                className="bg-[#0177AB] text-white px-6 py-3 rounded-lg hover:bg-[#006d91] transition"
              >
                Go Back Home
              </Link>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  /* ===================== SUCCESS ===================== */
  const productDetails = [
    {
      label: "Billboard Type",
      value: billboard.mediaType || (billboard as any).billboardType || "Static",
    },
    {
      label: "Product Type",
      value:
        (billboard as any).productType ||
        billboard.serviceType ||
        (billboard as any).structureType ||
        "—",
    },
    {
      label: "Orientation",
      value: (billboard as any).orientation || "Landscape",
    },
    {
      label: "Dimension",
      value: dimension,
    },
    {
      label: "Illumination",
      value:
        (billboard as any).illumination ||
        (billboard as any).illuminated
          ? "Yes"
          : (billboard as any).illumination === false
            ? "No"
            : "—",
    },
    {
      label: "Location",
      value: billboard.locationAddress || "—",
    },
    {
      label: "City",
      value: billboard.city || "—",
    },
    {
      label: "Traffic",
      value: (billboard as any).traffic || (billboard as any).trafficLevel || "—",
    },
    {
      label: "Audience type",
      value:
        (billboard as any).audienceType ||
        (billboard as any).audience ||
        "Best for FMCG, Telco, Retail, Education, Health, others.",
    },
    {
      label: "Rate",
      value: rate ? `₦${Number(rate).toLocaleString()}/month` : "—",
    },
  ];

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleLeaveDetails}
        onSuccess={() => setShowAuthModal(false)}
        dismissible={false}
        onBack={handleLeaveDetails}
        showAlternativeActions={false}
        successRedirectTo={pathname}
      />

      <div className="bg-[#F7F9FC] min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar transparent />
        </div>

        <PageBanner
          showHome={true}
          title={`${displayMediaType} in ${billboard.city || billboard.state || "Nigeria"}`}
          subtitle={`Explore advertising details, pricing, dimensions, and availability for this ${displayMediaType.toLowerCase()} at ${billboard.locationAddress}.`}
          breadcrumbs={[{ label: displayMediaType }]}
          backgroundImage="/images/board.jpg"
        />

        <section className="bg-white px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ================= LEFT — Images ================= */}
            <div>
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={
                    activeImage || allImages[0] || "/billboard-placeholder.jpg"
                  }
                  alt={billboard.mediaType || "Billboard"}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>

              {allImages.length > 0 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {allImages.map((img: string, i: number) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative shrink-0 w-[88px] h-[72px] sm:w-[110px] sm:h-[88px] rounded-xl overflow-hidden border-2 transition ${
                        activeImage === img || (!activeImage && i === 0)
                          ? "border-[#0177AB]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ================= RIGHT — Details ================= */}
            <div className="flex flex-col">
              {/* Title row */}
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-[#101928] capitalize leading-tight">
                    {billboard.mediaType || "Billboard"}
                  </h1>
                  <p className="mt-1.5 text-sm text-[#667185]">
                    {billboard.locationAddress}
                    {billboard.city ? `, ${billboard.city}` : ""}
                    {billboard.state ? `, ${billboard.state}` : ""}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-sm font-medium ${
                    isAvailable ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Product details */}
              <div className="mt-8">
                <h2 className="text-[15px] font-semibold text-[#101928] mb-4">
                  Product details
                </h2>

                <ul className="space-y-2.5">
                  {productDetails.map((item) => (
                    <li
                      key={item.label}
                      className="text-sm text-[#344054] leading-relaxed"
                    >
                      <span className="text-[#344054]">• </span>
                      <span className="font-medium">{item.label}:</span>{" "}
                      <span className="text-[#667185]">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location link */}
              <div className="mt-8">
                <h3 className="text-[15px] font-semibold text-[#101928] mb-3">
                  Location
                </h3>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] text-sm text-[#0177AB] hover:border-[#0177AB]/40 transition"
                >
                  <MapPin size={16} className="text-[#667185] shrink-0" />
                  <span className="truncate underline-offset-2 hover:underline">
                    {mapLink}
                  </span>
                </a>
              </div>

              {/* Duration */}
              <div className="mt-8">
                <h3 className="text-[15px] font-semibold text-[#101928] mb-3">
                  Duration
                </h3>

                <div className="inline-flex items-center bg-[#F9FAFB] border border-[#E4E7EC] rounded-full px-2 py-1.5 gap-4">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    disabled={isInCart}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white transition disabled:opacity-40"
                    aria-label="Decrease duration"
                  >
                    <Minus size={16} className="text-[#667185]" />
                  </button>

                  <span className="text-[15px] font-medium text-[#101928] min-w-[72px] text-center">
                    {quantity} Month{quantity > 1 ? "s" : ""}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={isInCart}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white transition disabled:opacity-40"
                    aria-label="Increase duration"
                  >
                    <Plus size={16} className="text-[#667185]" />
                  </button>
                </div>
              </div>

              {/* Start date */}
              <div className="mt-6">
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                  />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={isInCart}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4E7EC] bg-white text-sm text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition disabled:opacity-50"
                    placeholder="Start date"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  type="button"
                  className="flex-1 py-3.5 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white text-[15px] font-semibold transition shadow-sm shadow-[#0177AB]/20"
                >
                  Book Now
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isInCart || isAddingToCart}
                  className="flex-1 py-3.5 rounded-xl border border-[#0177AB] text-[#0177AB] hover:bg-[#0177AB]/5 text-[15px] font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart
                    ? "Adding..."
                    : isInCart
                      ? "Already in Cart"
                      : "Add to Cart"}
                </button>
              </div>

              {isInCart && cartItem && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm text-emerald-700">
                    ✓ Already in cart ({cartItem.durationInMonths} month
                    {cartItem.durationInMonths > 1 ? "s" : ""})
                  </p>
                  <Link
                    href="/cart"
                    className="text-xs text-[#0177AB] hover:underline mt-1 inline-block"
                  >
                    View Cart →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <SimilarMedia />
      <Footer />
    </>
  );
}