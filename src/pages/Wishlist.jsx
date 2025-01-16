import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Breadcrumbs, HouseItem } from "../components";
import { CardList } from "../components/sections";

const Wishlist = () => {
  // const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('https://flatty.abyssara.tech/api/v1/property/fav', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);


  if (!wishlist || wishlist.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  console.log(wishlist);

  return (
    <div>
      <div className="space-y-2">
        <Breadcrumbs title="Favorites" />
        <div className="flex items-center justify-start">
          <h1 className="text-[36px] leading-[54px] text-[#0F1D40] font-semibold">
            Favorite
          </h1>
        </div>
      </div>
        <CardList sectionName="Popular" seeAll={true}>
          {Array.isArray(wishlist) && wishlist.length > 0 ? (
            wishlist.slice(0, 4).map((item) => (
              <HouseItem
                key={item.id}
                images={item.images} // Access the image URL safely
                price={item.price}
                location={item.location?.address || `${item.location?.latitude}, ${item.location?.longitude}`} // Format location as a string
                rooms={item.info?.bedrooms} // Access the number of rooms safely
                area={item?.info?.total_area} // Access the area safely
                currFloor={item.info?.floor} // Access the current floor safely
                building={item.info?.apartment_stories} // Access the building info safely
                id={item.id}
              
              />
            ))
          ) : (
            <p>No popular properties found</p>
          )}
        </CardList>
    </div>
  );
};

export default Wishlist;
