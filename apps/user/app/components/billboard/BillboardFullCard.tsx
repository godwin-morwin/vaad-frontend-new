"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Billboard } from "@/app/types/billboard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartContext } from "@/app/contexts/cart-context";

type Props = {
  billboard: Billboard;
};

export default function BillboardFullCard({ billboard }: Props) {
  const router = useRouter();
  const { addToCart, isItemInCart } = useCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const inCart = isItemInCart(billboard._id);
  const isAvailableLater =
    billboard.availabilityLabel?.startsWith("Available in ");

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const startDate = new Date().toISOString().split("T")[0];
      const cartItem = await addToCart({
        billboardId: billboard._id,
        durationInMonths: 1,
        startDate,
      });
      if (!cartItem) {
        return;
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="relative bg-white border border-[#F0EFFB] rounded-[9px] overflow-hidden flex flex-col md:flex-row transition-all duration-300 min-h-57.75">
      {/* Image - Full height on left */}
      <div className="relative w-full md:w-[315.4375px] h-[150px] md:h-auto md:min-h-full flex-shrink-0 overflow-hidden">
        <Image
          src={billboard.image || "/placeholder-billboard.jpg"}
          alt={billboard.title}
          fill
          className="object-cover rounded-tl-[9px] rounded-bl-[9px]"
          unoptimized
        />
      </div>

      {/* Content - Details section */}
      <div className="relative flex flex-col flex-1 justify-between p-5">
        {/* Availability Tag - Top Right of details section with left-pointing arrow */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            {/* Speech bubble */}
            <div
              className={`rounded-md px-3 py-1.5 ${
                isAvailableLater
                  ? "bg-[#D93A4A]"
                  : billboard.availabilityLabel === "Available"
                    ? "bg-[#E7F8F2]"
                    : "bg-gray-100"
              }`}
            >
              <span
                className={`whitespace-nowrap text-sm font-medium ${
                  isAvailableLater
                    ? "text-white"
                    : billboard.availabilityLabel === "Available"
                      ? "text-[#0B835C]"
                      : "text-gray-700"
                }`}
              >
                {billboard.availabilityLabel ||
                  (billboard.availableInDays
                    ? `Available in ${billboard.availableInDays} day${billboard.availableInDays === 1 ? "" : "s"}`
                    : "Available")}
              </span>
            </div>
            {/* Arrow pointer - left side of bubble pointing left toward content */}
            <div
              className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: `6px solid ${
                  isAvailableLater
                    ? "#D93A4A"
                    : billboard.availabilityLabel === "Available"
                      ? "#E7F8F2"
                      : "#f3f4f6"
                }`,
              }}
            />
          </div>
        </div>

        {/* Top */}
        <div className="pr-36">
          {" "}
          {/* Add padding to avoid overlap with badge */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[18px] font-semibold text-gray-900 leading-snug">
              {billboard.title}
            </h3>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            {billboard.location}
          </div>
          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {billboard.description ||
              "Vibrant, high-resolution screens that showcase your brand dynamically. Update content in real time and capture attention instantly."}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={inCart || isAddingToCart}
            className="flex items-center gap-2 rounded-md bg-[#0177AB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#006d91] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAddingToCart && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => router.push(`/billboard/${billboard._id}`)}
            className="rounded-md border border-[#0177AB] bg-transparent px-4 py-2 text-sm font-medium text-[#0177AB] transition hover:bg-[#0177AB]/5"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
