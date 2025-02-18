import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import CardList from "../components/sections/CardList";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Button from "../components/Button.jsx";
import agent_back from "../assets/images/Group 15.png";
import { NewPost } from "../assets/icons/NewPost.jsx";
import AgentPost from "../components/AgentPost.jsx";
import AgentComplex from "../components/AgentComplex.jsx";
import NewPostModal from "../components/NewPostModal.jsx"; // Импортируем модальное окно для поста
import NewComplexModal from "../components/NewComplexModal.jsx";
import { fetchPosts } from "../store/slices/agentPostSlice";
import { NewComplex } from "../assets/icons/NewComplex.jsx";
import { useNavigate } from "react-router-dom";
import { AddUserImage } from "../assets/icons/AddUserImage";

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplexModalOpen, setIsComplexModalOpen] = useState(false);
  // Добавляем состояние для хранения данных редактируемого поста (если null – режим создания)
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  let user = {};
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const [agent, setAgent] = useState([]);
  const [properties, setAgentProperties] = useState([]);
  const [complexes, setComplexes] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const namesOfComplexes = [];

  useEffect(() => {
    const fetchProfile = async () => {
      fetch("https://api.flatty.ai/api/v1/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) {
            window.location.href = "/login";
            navigate("/login");
            localStorage.removeItem("user");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.user) {
            dispatch(setUser(data.user));
          }
        })
        .catch((error) => {
          console.log(error);
          window.location.href = "/login";
          navigate("/login");
          localStorage.removeItem("user");
        });
      const userResponse = await fetch(
        "https://api.flatty.ai/api/v1/user/me/agent",
        {
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const userProfileData = await userResponse.json();
      console.log(userProfileData);
      setAgent(userProfileData);

      const agentPropertiesParams = new URLSearchParams({
        page: 1,
        elements: 50,
      });

      const agentPropertiesResponse = await fetch(
        `https://api.flatty.ai/api/v1/property/agent/${userProfileData.id}/page?${agentPropertiesParams.toString()}`,
        {
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const agentPropertiesData = await agentPropertiesResponse.json();
      setAgentProperties(agentPropertiesData.properties);
      setResultCount(agentPropertiesData.results);
      console.log(agentPropertiesData);

      const response3 = await fetch("https://api.flatty.ai/api/v1/listing/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data3 = await response3.json();
      setComplexes(data3);
      for (let i = 0; i < data3.length; i++) {
        namesOfComplexes.push(data3[i].name);
      }
      console.log("COMPLEX ", data3);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Открытие модального окна создания поста
  const handleOpenModal = () => {
    // Для создания нового поста modalData сбрасываем в null
    setModalData(null);
    setIsModalOpen(true);
  };

  // Открытие модального окна редактирования поста
  const handleEditPost = (postData) => {
    setModalData(postData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenComplexModal = () => {
    setIsComplexModalOpen(true);
  };

  const handleCloseComplexModal = () => {
    setIsComplexModalOpen(false);
  };

  const fileInputRef = useRef(null);

  // Trigger the hidden file input when the icon is clicked.
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection and upload the image.
  const handleUserProfileImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // No file selected

    // Prepare the file to be sent as form data.
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.flatty.ai/api/v1/user/profile/image",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      const parsedUser = JSON.parse(localStorage.getItem("user"));
      parsedUser.image_url = data.image_url;
      localStorage.setItem("user", JSON.stringify(parsedUser));
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 px-4 sm:px-16 ">
      <Breadcrumbs title="Apartment" />
      <div className="flex flex-col gap-6 mt-8 lg:flex-row">
        {/* Agent Info */}
        <div className="p-6 bg-white rounded-lg w-full">
          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4 mb-6">
            <div className="relative">
              <img
                src={
                  user?.image_url
                    ? user.image_url
                    : "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/user.jpg"
                }
                className="rounded-full w-[120px] h-[120px] object-cover"
                style={{ minWidth: "120px" }}
                alt="Agent"
              />
              <div
                className="absolute bottom-0 right-0"
                onClick={handleIconClick}
              >
                <AddUserImage />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleUserProfileImage}
                accept="image/*"
              />
            </div>

            <div className="w-full">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {agent.user ? agent.user.name : ""}
                  </h2>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <Rating rating="4" />
                  <p className="text-sm text-[#525C76]">
                    {agent.reviews ? agent.reviews.length + " Votes" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Experience, Sales, Active Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#EEEFF2] p-4 rounded-md">
            {["Experience", "Successful sales", "Active posts"].map((label, index) => (
              <div key={index} className="text-center">
                <span className="block text-sm text-gray-500">{label}</span>
                <p className="font-medium text-lg text-[#0F1D40]">
                  {index === 0
                    ? agent.experience
                      ? agent.experience + " years"
                      : "Unknown"
                    : index === 1
                    ? agent.sales
                      ? agent.sales
                      : "Unknown"
                    : index === 2
                    ? properties.length
                      ? properties.length
                      : "Unknown"
                    : ""}
                </p>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4">
            <Button
              className="w-full py-2 text-sm h-[45px] font-semibold text-white rounded-sm leading-[28px] text-[18px]"
              variant="primary"
              onClick={handleOpenModal} // Открытие модального окна создания нового поста
            >
              <NewPost />
              New Object
            </Button>
            <Button
              className="w-full py-2 text-sm h-[45px] font-semibold text-[#8247E5] bg-white border border-[#8247E5] rounded-sm leading-[28px] text-[18px]"
              variant="outline"
              onClick={handleOpenComplexModal}
            >
              <NewComplex />
              New Complex
            </Button>
          </div>
        </div>

        {/* Agent Image */}
        <div className="hidden lg:block w-full z-1 relative">
          <img
            src={agent_back}
            className="absolute w-full rounded-lg"
            alt="Agent"
            loading="lazy"
          />
        </div>
      </div>

      {/* Active Posts Section */}
      <CardList sectionName="My posts" seeAll={false}>
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((item) => (
            <a href={"/appartment/" + item.id} key={item.id}>
              <AgentPost
                img={item.images[0]?.image_url}
                price={item.price}
                location={
                  item.location?.address ||
                  `${item.location?.latitude}, ${item.location?.longitude}`
                }
                area={item?.info?.total_area}
                rooms={item.info?.bedrooms}
                currFloor={item.info?.floor}
                building={item.info?.apartment_stories}
                id={item.id}
                // Передаем данные поста для редактирования через onEdit
                onEdit={(postData) => {
                  // При клике на редактирование открываем модальное окно с данными
                  setModalData(postData);
                  setIsModalOpen(true);
                }}
                postData={item} // Передаем данные карточки
              />
            </a>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </CardList>

      <CardList sectionName="Complexes" seeAll={false}>
        {Array.isArray(complexes) && complexes.length > 0 ? (
          complexes.map((item) =>
            agent.id === item.agent_id ? (
              <a href={"/complex/" + item.id} key={item.id}>
                <AgentComplex
                  img={item.images[0]?.image_url}
                  title={item.name}
                  roomCount={item.objects}
                  address={item.address}
                  id={item.id}
                />
              </a>
            ) : (
              ""
            )
          )
        ) : (
          <p>No posts found</p>
        )}
      </CardList>

      {/* Модальное окно для создания/редактирования поста */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        complexes={complexes}
        isEdit={modalData !== null} // Если modalData не null, режим редактирования
        initialData={modalData || {}}
        setProperties={setAgentProperties}
      />
      <NewComplexModal
        isOpen={isComplexModalOpen}
        onClose={handleCloseComplexModal}
      />
    </div>
  );
};

export default Profile;