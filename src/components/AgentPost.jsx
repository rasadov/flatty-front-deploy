import React from "react";
import { Link } from "react-router-dom";
import { Euro, MapPin, Trash, EditPencil } from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { formatNumber } from "./numberFormater";
import { toast } from "react-toastify";

// Функция для удаления, как у вас уже есть
const handleDeletePost = async (id) => {
  if (window.confirm("Are you sure you want to delete this property?")) {
    const response = await fetch(`https://api.flatty.ai/api/v1/property/record/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      toast.error("Error deleting property");
    } else {
      window.location.href = "/profile";
    }
  }
};

export const AgentPost = React.memo(
  ({ id, img, price, location, rooms, area, currFloor, building, postData }) => {
    // postData – объект со всеми данными карточки, который понадобится для редактирования
    const currency = localStorage.getItem("currency") || "£";
    const currencies_to_dollar = {
      "€": 1.03,
      "£": 1.22,
      "$": 1,
      "₺": 0.028,
    };
    const dispatch = useDispatch();

    // Функция, которая открывает модальное окно для редактирования.
    // Как вариант, можно использовать глобальное состояние (например, Redux или Context)
    // для управления отображением NewPostModal. Ниже приведён пример через локальный вызов.
    const handleEditPost = () => {
      // Например, можно сохранить данные карточки в Redux и открыть модальное окно.
      // Или, если вы используете родительский компонент, передайте функцию, которая открывает NewPostModal с нужными данными.
      // Здесь приведён псевдокод:
      dispatch({
        type: "modal/open",
        payload: {
          modalType: "editPost",
          initialData: postData, // postData содержит все поля карточки
        },
      });
    };

    return (
      <div
        className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2] custom-shadow"
        style={{
          boxShadow: "0px 1px 1px 0px #703ACA14",
        }}
      >
        {/* Image Section */}
        <div className="relative w-full h-[173px] rounded-[6px] overflow-hidden">
          <img
            src={img}
            alt={`Slide ${id}`}
            className="object-cover w-full h-[173px]"
          />
          {/* Icons for Edit and Delete */}
          <div className="absolute flex gap-2 bottom-2 right-2">
            {/* Edit Icon */}
            <div
              className="w-[33px] h-[33px] flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleEditPost();
              }}
            >
              <EditPencil color="black" size="20" />
            </div>
            {/* Delete Icon */}
            <div
              className="w-[33px] h-[33px] flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleDeletePost(id);
              }}
            >
              <Trash color="black" size="20" />
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="py-2">
          <div className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]">
            {formatNumber(price / currencies_to_dollar[currency])} {currency}
          </div>
          <div className="flex flex-row justify-between gap-2 mb-2">
            <div className="text-sm text-[#525C76] font-medium">{rooms} Rooms</div>
            <div className="text-sm text-[#525C76] font-medium">{area} sq.m</div>
            <div className="text-sm text-[#525C76] font-medium">{currFloor} Floor</div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[#525C76] font-medium">
            <div>
              <MapPin />
            </div>
            <motion.span
              className="text-sm font-bold text-[#525C76]"
              whileHover={{
                color: "#A673EF",
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              {location}
            </motion.span>
          </div>
        </div>
      </div>
    );
  }
);

export default AgentPost;