import ConsultationCard from "./Card/ConsultationCard";



const ConsultationSection = () => {
  return (
    <section className="bg-[#FCFCFD] py-20 px-6 md:px-18">
      <div className="max-w-7xl mx-auto">

        {/* Card */}
        <div className="mt-10">
          <ConsultationCard
            title="Ready to put your brand out there?"
            subtitle=""
            image="/images/c-image.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;