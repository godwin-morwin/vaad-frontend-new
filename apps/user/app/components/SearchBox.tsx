"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import Select, { StylesConfig } from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

interface Filters {
  mediaType: string;
  productType: string;
  location: string;
}

interface AssetsData {
  services: string[];
  mediaAndProductsTypes: Record<string, string[]>;
  orientation: string[];
  printProductType: string[];
  landmarks: string[];
  statesAndCites: Record<string, string[]>;
  targetAudience: string[];
}

interface SearchBoxProps {
  filters: Filters;
  handleFilterChange: (key: keyof Filters, value: string) => void;
  onMediaTypeChange?: (mediaType: string, productType: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  assets: AssetsData;
  assetsLoading: boolean;
  locations: string[];
}

export default function SearchBox({
  filters,
  handleFilterChange,
  onMediaTypeChange,
  handleSearch,
  isLoading,
  assets,
  assetsLoading,
  locations,
}: SearchBoxProps) {
  const [open, setOpen] = useState(false);

  // Get available media types from mediaAndProductsTypes
  const mediaTypes = useMemo(() => {
    return Object.keys(assets?.mediaAndProductsTypes || {});
  }, [assets]);

  // Get available product types based on selected media type
  const availableProductTypes = useMemo(() => {
    if (!filters.mediaType || !assets?.mediaAndProductsTypes) return [];
    return assets.mediaAndProductsTypes[filters.mediaType] || [];
  }, [filters.mediaType, assets]);

  // Handle media type change
  const handleMediaTypeChange = (value: string) => {
    const productTypes = assets?.mediaAndProductsTypes?.[value] || [];
    const productType = productTypes[0] || "";

    if (onMediaTypeChange) {
      onMediaTypeChange(value, productType);
    } else {
      handleFilterChange("mediaType", value);
      handleFilterChange("productType", productType);
    }
  };

  // Summary text for mobile collapsed view
  const summary = `${filters.mediaType || "Media"}, ${
    filters.productType || "Product"
  }, ${filters.location || "Location"}`;

  // Desktop field configuration
  const desktopFields = [
    {
      label: "Media Type",
      value: filters.mediaType,
      key: "mediaType" as const,
      options: mediaTypes,
      onChange: handleMediaTypeChange,
      placeholder: "Select media type",
    },
    {
      label: "Product Type",
      value: filters.productType,
      key: "productType" as const,
      options: availableProductTypes,
      onChange: (value: string) => handleFilterChange("productType", value),
      disabled: !filters.mediaType || availableProductTypes.length === 0,
      placeholder: "Select product type",
    },
    {
      label: "Location",
      value: filters.location,
      key: "location" as const,
      options: locations,
      onChange: (value: string) => handleFilterChange("location", value),
      placeholder: "Select location",
    },
  ];

  const selectStyles: StylesConfig<SelectOption, false> = {
    control: (base, state) => ({
      ...base,
      minHeight: 48,
      borderRadius: 10,
      borderColor: state.isFocused ? "#0088b5" : "#e5e7eb",
      backgroundColor: "#f8fafc",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(0, 136, 181, 0.14)" : "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      "&:hover": {
        borderColor: state.isFocused ? "#0088b5" : "#cbd5e1",
      },
    }),
    valueContainer: (base) => ({ ...base, padding: "2px 12px" }),
    placeholder: (base) => ({ ...base, color: "#94a3b8" }),
    singleValue: (base) => ({ ...base, color: "#1e293b" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#0088b5" : "#94a3b8",
      transition: "color 150ms ease",
      "&:hover": { color: "#0088b5" },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.14)",
    }),
    option: (base, state) => ({
      ...base,
      color: "#1e293b",
      backgroundColor: state.isSelected
        ? "#0088b5"
        : state.isFocused
          ? "#e6f6fa"
          : "white",
      cursor: "pointer",
      padding: "10px 12px",
      "&:active": { backgroundColor: "#ccecf3" },
    }),
  };

  const renderSelect = (item: (typeof desktopFields)[number]) => {
    const options = item.options.map((option) => ({
      label: option,
      value: option,
    }));
    const selectedOption =
      options.find((option) => option.value === item.value) || null;

    return (
      <Select<SelectOption, false>
        value={selectedOption}
        options={options}
        onChange={(option) => item.onChange(option?.value || "")}
        isDisabled={assetsLoading || item.disabled}
        isLoading={assetsLoading}
        isClearable
        placeholder={item.placeholder}
        noOptionsMessage={() => "No options available"}
        loadingMessage={() => "Loading options..."}
        styles={selectStyles}
        classNamePrefix="hero-select"
      />
    );
  };

  return (
    <>
      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg p-6 w-full border border-[#DFDFE1]">
        <div className="grid grid-cols-4 gap-4">
          {desktopFields.map((item) => (
            <div key={item.key}>
              <label className="text-sm text-gray-600 mb-2 block">
                {item.label}
              </label>
              {renderSelect(item)}
            </div>
          ))}

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-[#0088b5] text-white rounded-xl flex items-center justify-center gap-2 font-semibold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Search size={18} /> Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE ---------------- */}
      <div className="md:hidden mt-6">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-white rounded-2xl shadow-md px-4 py-4 flex items-center justify-between"
        >
          <div className="text-left">
            <p className="text-sm text-gray-400">Search Ads</p>
            <p className="text-sm font-medium text-gray-800 truncate">
              {summary}
            </p>
          </div>
          <ChevronDown className="text-gray-400" />
        </button>
      </div>

      {/* FULLSCREEN MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 space-y-6 animate-[slideUp_.3s_ease]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Search Filters</h2>
              <button onClick={() => setOpen(false)}>Close</button>
            </div>

            {desktopFields.map((item) => (
              <div key={item.key}>
                <label className="text-sm text-gray-600 mb-2 block">
                  {item.label}
                </label>
                {renderSelect(item)}
              </div>
            ))}

            <button
              onClick={() => {
                handleSearch();
                setOpen(false);
              }}
              disabled={isLoading}
              className="w-full bg-[#0088b5] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Search size={18} /> Search
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
