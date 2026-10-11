import LargeFormatCard from "../Card/LargeFormatCard";


const LargeFormatSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-18">
      <div className="max-w-7xl mx-auto">

        {/* Card */}
        <div className="mt-10">
          <LargeFormatCard
            title="Large Format Print"
            subtitle="We bring your campaign to life on every surface production and mounting handled end to end."
            image="/images/lg.png"
          />
        </div>
      </div>
    </section>
  );
};

export default LargeFormatSection;