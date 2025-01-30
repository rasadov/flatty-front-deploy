import ChooseUsCard from "../ChooseUsCard";
import img2 from "../../assets/images/ChooseUsHome.png";
import img1 from "../../assets/images/ChooseUsCircle.png";
import img3 from "../../assets/images/ChooseUsCard.png";

// Main Section Component
export const ChooseUsSection = () => {
  const cardsData = [
    {
      imageSrc: img1,
      title: "Connect with Verified Realtors",
      description:
        "Join a trusted network of experienced real estate professionals who are ready to help you find your ideal home.",
    },
    {
      imageSrc: img2,
      title: "Discover Dream Homes",
      description:
        "Explore a curated selection of properties tailored to fit your lifestyle and preferences.",
    },
    {
      imageSrc: img3,
      title: "Simple, Hassle-Free Transactions",
      description:
        "Enjoy a seamless experience with clear steps and reliable support, making property buying and selling easy and efficient.",
    },
  ];

  return (
    <section className="w-full px-8 pt-8 pb-16 m-auto bg-white border rounded-lg custom-max-width mb-20">
      <div className="mb-8 text-left">
        <h2 className="mb-2 text-[28px] leading-[42px] font-semibold text-darkText">
          Why Choose Us for Your Real Estate Journey
        </h2>
        <div className="w-[55%]">
          <p className="text-[18x] text-black  font-normal leading-[28px] mb-2">
            Easily connect with trusted realtors, explore dream properties, and
            enjoy a smooth, stress-free real estate experience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <ChooseUsCard
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ChooseUsSection;
