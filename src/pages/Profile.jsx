import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import AgencyMiniCard from "../components/AgencyMiniCard";
import CardList from "../components/sections/CardList";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Button from "../components/Button.jsx";
import apparment from "../assets/images/apparment.png";
import agent_back from "../assets/images/agent_back.png";
import { Certified } from "../assets/icons/Certified.jsx";
import { NewPost } from "../assets/icons/NewPost.jsx";
import { EditPost } from "../assets/icons/EditPost.jsx";
import { DotsThreeOutline } from "../assets/icons/DotsThreeOutline.jsx";
import AgentPost from "../components/AgentPost.jsx";
import NewPostModal from "../components/NewPostModal.jsx"; // Import the modal component
import { fetchPosts } from "../store/slices/agentPostSlice";

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full py-3 mx-auto mt-8">
      <Breadcrumbs title="Apartment" />
      <div className="flex flex-col items-start gap-6 mt-8 lg:flex-row">
        {/* Agent Info */}
        <div className=" p-6 bg-white rounded-lg w-[578px] min-h-[272px]">
          <div className="flex items-center justify-start gap-4 mb-6">
            <img
              src={apparment}
              className="rounded-full w-[120px] h-[120px] object-cover"
              alt="Agent"
            />
            <div className="inline-block w-full">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Name Surname</h2>
                  <DotsThreeOutline />
                </div>

                <div className="flex items-center gap-1 text-sm text-[#525C76]">
                  <Certified />
                  <span>Certified</span>
                </div>
                <AgencyMiniCard
                  agencyName="Emtan Construction"
                  agencyProfileLink="/complex"
                />
                <div className="flex items-center justify-start gap-4">
                  <Rating rating="4" />
                  <p className="text-sm text-[#525C76]">(133 Votes)</p>
                </div>
              </div>
            </div>
          </div>
          {/* Experience, Sales, Active Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#EEEFF2] p-4 rounded-md">
            {["Experience", "Successful sales", "Active posts"].map(
              (label, index) => (
                <div key={index} className="text-center">
                  <span className="block text-sm text-gray-500">{label}</span>
                  <p className="font-medium text-lg text-[#0F1D40]">
                    {index === 0 ? "2 years" : index === 1 ? "135" : "36"}
                  </p>
                </div>
              )
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              className="w-full py-2 text-sm h-[45px] font-semibold text-white rounded-sm leading-[28px] text-[18px]"
              variant="primary"
              onClick={handleOpenModal}
            >
              <NewPost />
              New Post
            </Button>
            <Button
              className="w-full py-2 h-[45px] text-[#8247E5] bg-transparent border  leading-[28px] border-[#8247E5] rounded-sm text-[18px] font-semibold"
              variant="cancel"
            >
              <EditPost />
              Edit
            </Button>
          </div>
        </div>

        {/* Agent Image */}
        <div className="w-[683px] h-[345px] relative">
          <img
            src={agent_back}
            className="absolute w-full h-auto rounded-lg bottom-10"
            alt="Agent"
            loading="lazy"
          />
        </div>
      </div>
      {/* Active Posts Section */}
      <CardList sectionName="My posts" seeAll={false}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {posts.slice(0, 4).map((item) => (
          <AgentPost
            key={item.id}
            img={item.images[0]}
            price={item.price}
            location={item.location}
            rooms={item.room}
            currFloor={item.currFloor}
            building={item.building}
          />
        ))}
      </CardList>
      <NewPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default Profile;
