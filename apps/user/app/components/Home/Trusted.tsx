import Image from "next/image";

export default function Trusted() {
  const partners = [
    { logo: "/logos/partners/bruhm.svg", name: "Bruhm" },
    { logo: "/logos/partners/good-mama.svg", name: "Good Mama" },
    { logo: "/logos/partners/klin.svg", name: "Klin" },
    { logo: "/logos/partners/lubis.svg", name: "Lubis" },
    { logo: "/logos/partners/milo.svg", name: "Milo" },
    { logo: "/logos/partners/supreme.svg", name: "Supreme" },
    { logo: "/logos/partners/topcafe.svg", name: "Top Cafe" },
    { logo: "/logos/partners/urban.svg", name: "Urban" },
  ];

  const renderLogoSet = (hidden = false) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-8 sm:pr-8"
    >
      {partners.map((partner) => (
        <div
          key={`${hidden ? "duplicate-" : ""}${partner.name}`}
          className="flex h-16 w-24 shrink-0 items-center justify-center sm:w-32"
        >
          <Image
            src={partner.logo}
            alt={hidden ? "" : partner.name}
            width={160}
            height={64}
            className="max-h-12 w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );

  const marqueeStyle = {
    animation: "trusted-marquee 28s linear infinite",
  };

  const marqueeStyles = `
    @keyframes trusted-marquee {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }

    .trusted-marquee:hover {
      animation-play-state: paused;
    }

    @media (prefers-reduced-motion: reduce) {
      .trusted-marquee {
        animation-play-state: paused;
        transform: translateX(-25%);
      }
    }
  `;

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-18 sm:px-18">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-[5.5vw] font-semibold text-[#141212] md:text-[32px]">
          They trust us, you too can!
        </h1>
        <p className="px-7 text-center text-[3.5vw] font-normal text-[#434141] md:px-0 md:text-[16px]">
          Trusted by top brands in finance, FMCG, fashion, and telecom.
        </p>
      </div>

      <div className="relative mt-10 w-full overflow-hidden py-2">
        <div
          className="trusted-marquee flex w-max"
          style={marqueeStyle}
        >
          {renderLogoSet()}
          {renderLogoSet(true)}
        </div>
      </div>
      <style jsx>{marqueeStyles}</style>
    </section>
  );
}