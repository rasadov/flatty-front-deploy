import { CardList } from "../components/CardList";
import Searchbar from "../components/Searchbar";
import AgentCard from "../components/AgentCard";
import { HouseItem } from "../components/HouseItem";
import WhyChooseUsSection from "../components/ChooseUsSection";
import TestimonialSection from "../components/TestimonialSection";
import header_bg from "../assets/images/header_bg.png";
import key_img from "../assets/images/key_img.png";
import apparment1 from "../assets/images/apparment1.png";
import apartment2 from "../assets/images/apparment2.png";
import apartment3 from "../assets/images/apparment3.png";
import apartment4 from "../assets/images/apparment4.png";
const items = [
  {
    img: apparment1,
    price: "250 000",
    room: 3,
    area: 150,
    currFloor: "10",
    building: "15",
    location: "New York City, NY",
  },
  {
    img: apartment2,
    price: "300 000",
    room: 4,
    area: 180,
    currFloor: "10",
    building: "15",
    location: "Los Angeles, CA",
  },
  {
    img: apartment3,
    price: "400 000",
    room: 5,
    area: 200,
    currFloor: "10",
    building: "15",
    location: "Miami, FL",
  },
  {
    img: apartment4,
    price: "500 000",
    room: 6,
    area: 250,
    currFloor: "10",
    building: "15",
    location: "San Francisco, CA",
  },
];

const Home = () => {
  return (
    <div>
      <div>
        <div
          className="relative w-full h-[751px]  bg-no-repeat bg-contain bg-center rounded-lg"
          style={{
            backgroundImage: ` url(${header_bg})`,
          }}
        >
          <h1 className="absolute z-10 text-[56px]  font-bold w-[40%] text-slate-900 top-8 ">
            Unlocking Doors to Your Next Home
          </h1>

          <div className="absolute z-20 transform -translate-y-1/2 bottom-[42%] left-[3%]">
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
            {items.map((item) => (
              <HouseItem key={item.img} {...item} />
            ))}
          </CardList>
        </div>
        <CardList sectionName={"Popular"}>
          {items.map((item) => (
            <HouseItem key={item.img} {...item} />
          ))}
        </CardList>
        <CardList sectionName={"Agents"}>
          {items.map((item) => (
            <AgentCard key={item.img} {...item} />
          ))}
        </CardList>

        <WhyChooseUsSection />
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
