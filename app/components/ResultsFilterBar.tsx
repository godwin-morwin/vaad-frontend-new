/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import { useCartContext } from "@/app/contexts/cart-context";

const CartDrawer = dynamic(() => import("./cart/CartDrawer"), { ssr: false });

type Props = {
  title?: string;
  total: number;
  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  priceFilterLabel?: string;
  openCart: any;
  open: boolean;
  closeCart: any;
};

export default function ResultsFilterBar({
  title = "Static Billboard",
  total,
  filters,
  activeFilter,
  onFilterChange,
  priceFilterLabel,
  openCart,
  open,
  closeCart,
}: Props) {
  const { totalItems } = useCartContext();

  return (
    <div className="flex items-end justify-between mb-6">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Title */}
        <h2 className="text-[16px] font-semibold text-gray-800">
          {title} :{" "}
          <span className="font-normal text-gray-600">
            {total} search results found
          </span>
        </h2>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter, index) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={`${filter}-${index}`}
                onClick={() => onFilterChange(filter)}
                className={`px-4 py-2 text-sm whitespace-nowrap transition ${
                  isActive
                    ? "bg-[#e6f6fb] text-[#0088b5] font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } rounded-lg border border-gray-300`}
              >
                {filter}
              </button>
            );
          })}
          {priceFilterLabel && (
            <button
              type="button"
              onClick={() => onFilterChange(priceFilterLabel)}
              className="rounded-lg border border-[#0088b5] bg-[#e6f6fb] px-3 py-2 text-sm font-medium text-[#0088b5]"
              aria-label={`Remove price filter ${priceFilterLabel}`}
            >
              {priceFilterLabel} ×
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative">
        <button
          onClick={openCart}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition hover:bg-gray-50"
        >
          <span>My Cart</span>
          <span className="relative inline-flex h-6 w-6 items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-gray-700" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0177AB] px-1 text-[10px] font-semibold leading-none text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </span>
        </button>

        {/* Drawer */}
        <CartDrawer open={open} onClose={closeCart} />
      </div>
    </div>
  );
}
