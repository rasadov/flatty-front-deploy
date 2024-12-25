import { CardList } from "../components/CardList";
import Searchbar from "../components/Searchbar";
import AgentCard from "../components/AgentCard";
import { HouseItem } from "../components/HouseItem";
import WhyChooseUsSection from "../components/ChooseUsSection";
import TestimonialSection from "../components/TestimonialSection";
import header_bg from "../assets/images/header_bg.png";
import key_img from "../assets/images/key_img.png";
import { data } from "../data.js";
const Home = () => {
  return (
    <div>
      <div
        className="relative min-w-full h-[751px]   bg-no-repeat bg-cover bg-right rounded-lg w-[1440px]"
        style={{
          backgroundImage: ` url(${header_bg})`,
        }}
      >
        <h1 className="absolute z-10 text-[56px]  font-bold w-[40%] text-slate-900 top-8 left-10 ">
          Unlocking Doors to Your Next Home
        </h1>

        <div className="absolute z-20 transform -translate-y-1/2 bottom-[42%] left-[3%] w-[1131px]">
          <Searchbar />
        </div>

        <img
          src={key_img}
          alt="Overlay Image"
          className="absolute z-20 top-[72%] left-[50%] transform -translate-x-1/2 w-[200px] opacity-90"
        />
      </div>

      <div className="relative z-10 -mt-40">
        <CardList sectionName="Featured">
          {data.slice(0, 4).map((item) => (
            <HouseItem key={item.img} {...item} />
          ))}
        </CardList>
      </div>
      <CardList sectionName={"Popular"}>
        {data.slice(0, 4).map((item) => (
          <HouseItem key={item.img} {...item} />
        ))}
      </CardList>
      <CardList sectionName={"Agents"}>
        {data.slice(0, 4).map((item) => (
          <AgentCard key={item.img} {...item} />
        ))}
      </CardList>

      <WhyChooseUsSection />
      <TestimonialSection sectionName={"Testimonials"} />
    </div>
  );
};

export default Home;
