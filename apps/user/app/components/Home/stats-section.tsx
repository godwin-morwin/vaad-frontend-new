"use client";

interface StatCardProps {
  title: string;
  description: string;
}

function StatCard({ title, description }: StatCardProps) {
  return (
    <div className="h-full rounded-[10px] border border-[#0177AB] p-5 sm:p-6">
      <h3 className="text-2xl font-semibold uppercase text-[#141212] sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-lg font-normal leading-snug text-[#141212] sm:text-[20px]">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      title: "100k+",
      description:
        "Verified Billboards",
    },
    {
      title: "VETTED",
      description:
        "& Verfied Media Partner",
    },
    {
      title: "ZERO",
      description:
        "Subscription Fee",
    },
    {
      title: "ZERO",
      description:
        "Management Fee",
    },
  ];

  return (
    <section className="w-full bg-white sm:py-18 sm:px-18 px-5 py-18">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="w-full">
          <h2 className="sm:text-[32px] text-[5.5vw] font-medium text-[#141212]">
            We Turn Traffic Into Attention.
          </h2>
          <p className="text-[#434141] mt-2 sm:text-base text-[3.5vw] leading-relaxed font-normal">
           From static billboards to digital billboards, we give your business the visibility it deserves, everywhere your customers go.
          </p>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-4">
           {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>

        {/* Cards */}
        {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}