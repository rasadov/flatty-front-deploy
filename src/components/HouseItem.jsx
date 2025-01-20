import React, { useCallback, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Euro,
  HeartEmpty,
  HeartFull,
  MapPin,
} from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../components/Notification";
import { formatNumber } from "../components/numberFormater.jsx";

export const HeartButton = React.memo(({ liked, onClick }) => (
  <motion.div
    className="absolute z-20 cursor-pointer bottom-2 right-2"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    {liked ? <HeartFull /> : <HeartEmpty />}
  </motion.div>
));

const PriceSection = React.memo(({ price, currency }) => (
  <div className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]">
    {price} {currency}
  </div>
));

const RoomAreaFloorSection = React.memo(
  ({ room, area, currFloor, building }) => (
    <div className="flex flex-row justify-between gap-2 mb-2">
      <div className="text-sm text-[#525C76] font-medium">{room} Rooms</div>
      <div className="text-sm text-[#525C76] font-medium">{area} sq.m</div>
      <div className="text-sm text-[#525C76] font-medium">
        {currFloor} / {building} Floor
      </div>
    </div>
  )
);

const LocationSection = React.memo(({ location }) => (
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
));

export const HouseItem = React.memo(
  ({ id, images, price, location, rooms, area, currFloor, building }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const liked = useMemo(
      () => wishlist.some((item) => item.id === id),
      [wishlist, id]
    );
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    console.log("Images prop:", images);
    console.log("Price prop:", price);
    const currency = localStorage.getItem("currency") || "£";

    const currencies_to_dollar = {
      "€": 1.03,
      "£": 1.22,
      "$": 1,
      "₺": 0.028,
    };

    const handleLikeClick = useCallback(
      (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
          // Redirect to login if not authenticated
          navigate("/login", {
            state: {
              from: window.location.pathname,
              item: {
                id,
                images,
                price,
                location,
                rooms,
                area,
                currFloor,
                building,
              },
            },
          });
        } else {
          // Toggle like status
          fetch("https://api.flatty.ai/api/v1/property/like/" + id, {
            method: "POST",
            body: JSON.stringify({ property_id: id }),
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                if (!liked) {
                  dispatch(
                    addToWishlist({
                      id,
                      images,
                      price,
                      location,
                      rooms,
                      area,
                      currFloor,
                      building,
                    })
                  );
                  notify("Item added to wishlist");
                } else {
                  dispatch(removeFromWishlist({ id }));
                  notify("Item removed from wishlist");
                }
              } else {
                console.error("Failed to update wishlist:", data.error);
              }
            })
            .catch((error) => {
              console.error("Error updating wishlist:", error);
            });
        }
      },
      [
        isAuthenticated,
        liked,
        id,
        images,
        price * currencies_to_dollar[currency],
        location,
        rooms,
        area,
        currFloor,
        building,
        navigate,
        dispatch,
      ]
    );

    console.log("Images prop:", images);

    return (
      <div
        className="block border rounded-[6px] border-[#EEEFF2] p-4 relative sm:w-full sm:p-2 outline-[#EEEFF2] transform transition-transform duration-300
         custom-shadow"
        style={{
          boxShadow: "0px 1px 1px 0px #703ACA14",
        }}
      >
        {/* Image Section with Slider */}
        <div
          className="relative w-full rounded-[6px] overflow-hidden"
          style={{
            height: "16vh", // Adjust height dynamically based on width
            maxHeight: "300px", // Set a max height if needed
          }}
        >
          {images && Array.isArray(images) && images.length > 0 ? (
            <Swiper
              loop={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              speed={800} // Adjust the speed of slide transition
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
              className="swiper-container"
            >
              {images.map((img, index) => (
                console.log("Image URL:", img.image_url),
                console.log("Index:", img),
                <SwiperSlide key={index}>
                  <Link to={`/appartment/${id}`}>
                    <img
                      src={img.image_url}
                      alt={`Slide ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div>No images available</div>
          )}
    
          {/* Previous Button */}
          <div
            ref={prevRef}
            className="absolute z-10 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full cursor-pointer custom-swiper-button swiper-btn-prev top-1/2 left-2"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft color="white" size="30" />
          </div>
    
          {/* Next Button */}
          <div
            ref={nextRef}
            className="absolute z-10 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full cursor-pointer custom-swiper-button swiper-btn-next top-1/2 right-2"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight color="white" />
          </div>
    
          <HeartButton liked={liked} onClick={handleLikeClick} />
        </div>
    
        {/* Information Section */}
        <Link to={`/appartment/${id}`} className="py-5 block">
          <PriceSection
            price={formatNumber(price / currencies_to_dollar[currency])}
            currency={currency}
          />
          <RoomAreaFloorSection
            room={rooms}
            area={area}
            currFloor={currFloor}
            building={building}
          />
          <LocationSection location={location} />
        </Link>
      </div>
    );
        
  }
);

export default HouseItem;
