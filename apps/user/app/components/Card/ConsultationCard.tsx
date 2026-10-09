"use client";

import Image from "next/image";

interface ConsultationCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  onClick?: () => void;
}

const ConsultationCard = ({
  title,
  subtitle,
  image,
  onClick,
}: ConsultationCardProps) => {
  return (
    <div
      className="relative isolate flex w-full min-h-90 flex-col items-center justify-between gap-8 overflow-hidden rounded-[56px] bg-[#087BAA] p-8 sm:p-10 md:min-h-[360px] md:flex-row md:gap-10 md:px-14 md:py-8"
      onClick={onClick}
    >
      {/* Pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: "url('/images/c-layer.jpg')" }}
      />

      {/* Blue overlay to maintain the reference color */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#087BAA]/40" />

      {/* Left content */}
      <div className="flex w-full max-w-[520px] flex-col items-start justify-center md:flex-1">
        <h2 className="max-w-[480px] text-[26px] font-semibold leading-[1.55] tracking-[-0.5px] text-white sm:text-[30px] md:text-[32px]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
            {subtitle}
          </p>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
          className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-[9px] bg-white px-[18px] py-3 text-[15px] font-medium text-[#0077AA] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#087BAA]"
        >
          Get a Quick Quote
        </button>
      </div>

      {/* Right image */}
      {image && (
        <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[38px] border-[6px] border-[#48A3C5] sm:h-[260px] md:h-[290px] md:w-[43%] md:max-w-[520px]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 43vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

export default ConsultationCard;
