"use client";

import { useMemo, useState } from "react";
import FilterSection from "./FilterSection";
import Checkbox from "./Checkbox";

export interface ListingFilters {
  mediaType: string;
  productType: string;
  location: string;
  minRate?: number;
  maxRate?: number;
  landmark: string;
  availability: "" | "available" | "booked" | "unavailable";
  targetAudience: string;
}

interface FilterSidebarProps {
  onFilterChange: <K extends keyof ListingFilters>(
    key: K,
    value: ListingFilters[K],
  ) => void;
  onPriceRangeChange: (range: { minRate?: number; maxRate?: number }) => void;
  filters: ListingFilters;
  assets: {
    landmarks?: string[];
    statesAndCites?: Record<string, string[]>;
    targetAudience?: string[];
  };
}

const priceRanges = [
  { label: "Under ₦200,000", min: 0, max: 200000 },
  { label: "₦200,000 - ₦500,000", min: 200000, max: 500000 },
  { label: "₦500,000 - ₦1,000,000", min: 500000, max: 1000000 },
  { label: "₦1,000,000 - ₦2,000,000", min: 1000000, max: 2000000 },
  { label: "₦2,000,000 - ₦5,000,000", min: 2000000, max: 5000000 },
  { label: "₦5,000,000 and above", min: 5000000, max: undefined },
];

export default function FilterSidebar({
  onFilterChange,
  onPriceRangeChange,
  filters,
  assets,
}: FilterSidebarProps) {
  const [landmarkSearch, setLandmarkSearch] = useState("");
  const landmarks = useMemo(() => assets.landmarks ?? [], [assets.landmarks]);
  const markets = useMemo(
    () => Object.keys(assets.statesAndCites ?? {}),
    [assets.statesAndCites],
  );
  const audiences = useMemo(
    () => assets.targetAudience ?? [],
    [assets.targetAudience],
  );

  const filteredLandmarks = useMemo(
    () =>
      landmarks.filter((landmark) =>
        landmark.toLowerCase().includes(landmarkSearch.toLowerCase()),
      ),
    [landmarks, landmarkSearch],
  );

  const selectedPriceRange = priceRanges.find(
    (range) => range.min === filters.minRate && range.max === filters.maxRate,
  );

  const selectPriceRange = (range: (typeof priceRanges)[number]) => {
    const isSelected = selectedPriceRange?.label === range.label;
    onPriceRangeChange(
      isSelected ? {} : { minRate: range.min, maxRate: range.max },
    );
  };

  return (
    <aside className="space-y-4">
      <FilterSection title="Pricing">
        {priceRanges.map((range) => (
          <Checkbox
            key={range.label}
            label={range.label}
            checked={selectedPriceRange?.label === range.label}
            onChange={() => selectPriceRange(range)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Landmark" searchable>
        <input
          type="search"
          placeholder="Search landmarks"
          value={landmarkSearch}
          onChange={(event) => setLandmarkSearch(event.target.value)}
          className="mb-2 w-full rounded-sm border border-[#E0E0E0] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="max-h-60 space-y-2 overflow-y-auto">
          {filteredLandmarks.map((landmark) => (
            <Checkbox
              key={landmark}
              label={landmark}
              checked={filters.landmark === landmark}
              onChange={(checked) =>
                onFilterChange("landmark", checked ? landmark : "")
              }
            />
          ))}
          {filteredLandmarks.length === 0 && (
            <p className="text-sm text-gray-500">No landmarks available</p>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Major Markets">
        <div className="max-h-60 space-y-2 overflow-y-auto">
          {markets.map((market) => (
            <Checkbox
              key={market}
              label={market}
              checked={filters.location === market}
              onChange={(checked) =>
                onFilterChange("location", checked ? market : "")
              }
            />
          ))}
          {markets.length === 0 && (
            <p className="text-sm text-gray-500">No markets available</p>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        {(
          [
            ["available", "Available Now"],
            ["booked", "Booked"],
            ["unavailable", "Unavailable"],
          ] as const
        ).map(([value, label]) => (
          <Checkbox
            key={value}
            label={label}
            checked={filters.availability === value}
            onChange={(checked) =>
              onFilterChange("availability", checked ? value : "")
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Target Audience">
        <div className="max-h-60 space-y-2 overflow-y-auto">
          {audiences.map((audience) => (
            <Checkbox
              key={audience}
              label={audience}
              checked={filters.targetAudience === audience}
              onChange={(checked) =>
                onFilterChange("targetAudience", checked ? audience : "")
              }
            />
          ))}
          {audiences.length === 0 && (
            <p className="text-sm text-gray-500">No audiences available</p>
          )}
        </div>
      </FilterSection>
    </aside>
  );
}
