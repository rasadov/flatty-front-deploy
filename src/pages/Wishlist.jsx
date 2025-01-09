import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumbs, HouseItem } from "../components";
import { CardList } from "../components/sections";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  if (!wishlist || wishlist.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

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
      <CardList seeAll={false}>
        {wishlist.map((item) => (
          <HouseItem key={item.id} {...item} />
        ))}
      </CardList>
    </div>
  );
};

export default Wishlist;
