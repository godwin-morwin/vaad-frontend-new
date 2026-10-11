"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title?: string;
  subtitle?: string;
  showHome?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  compact?: boolean;
  backgroundImage?: string;
}

export default function PageBanner({
  title,
  subtitle,
  showHome = true,
  breadcrumbs = [],
  className = "",
  compact = false,
  backgroundImage = "/images/board.jpg",
}: PageBannerProps) {
  const hasBreadcrumbs = showHome || breadcrumbs.length > 0;

  return (
    <section
      className={`relative isolate w-full overflow-hidden bg-gray-900  ${className}`}
      style={{ minHeight: compact ? 260 : 320 }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center  bg-no-repeat"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      ```
      {/* Dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/65" />
      {/* Banner content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-16"
        style={{
          paddingTop: compact ? 110 : 128,
          paddingBottom: compact ? 40 : 56,
        }}
      >
        {/* Breadcrumbs */}
        {hasBreadcrumbs && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium"
          >
            {showHome && (
              <>
                <Link
                  href="/"
                  className="text-[#EB5017] no-underline transition-colors hover:text-white"
                >
                  Home
                </Link>

                {(breadcrumbs.length > 0 || title) && (
                  <span className="text-white/50">/</span>
                )}
              </>
            )}

            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1 && !title;

              return (
                <span
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-2"
                >
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-white/80 no-underline transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{item.label}</span>
                  )}

                  {!isLast && <span className="text-white/50">/</span>}
                </span>
              );
            })}
          </nav>
        )}

        {/* Title */}
        {title && (
          <h1 className="m-0 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-0 mt-3 max- text-base leading-relaxed text-white/90">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
