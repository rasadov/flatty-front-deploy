import React, { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../store/slices/searchSlice";
import {
  Pagination,
} from "../components/index.js";
import { Footer } from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";

export const Complexes = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    results: searchResults,
    filters,
    loading,
    error,
  } = useSelector((state) => state.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [filteredItems, setFilteredItems] = useState([]);
  const page = filters.page || 1;
  const elements = 50;

  useEffect(() => {
    const params = new URLSearchParams({
      page: page,
      elements: elements,
    });
    fetch(`https://api.flatty.ai/api/v1/listing/page?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(
          data.listings / elements + (data.listings % elements ? 1 : 0)
        );
        setFilteredItems(data.listings);
      });
  }, [dispatch, filters]);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      dispatch(updateFilters({ page }));
    },
    [dispatch]
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
      <div className="px-4 lg:px-16 custom-max-width">
        <ResultView
          filteredItems={filteredItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setFilter={(path, value) =>
            dispatch(updateFilters({ [path]: value }))
          }
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-16 mx-auto bg-[#ECE8FF]">
        <Footer />
      </div>
    </div>
  );
};

export default Complexes;

const ResultView = ({
  filteredItems,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div className="w-full p-4 sm:p-6 lg:p-8 my-6 bg-white rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-4">
          <h1 className="font-semibold text-xl sm:text-2xl text-[#1b1313]">
            Complexes
          </h1>
          <h1 className="font-semibold text-xl sm:text-2xl text-[#1b1313]">
            {filteredItems.length} results
          </h1>
        </div>
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                return (
                  <ComplexCard
                    key={item.id}
                    img={item.images[0]?.image_url}
                    title={item.name}
                    roomCount={item.objects}
                    address={item.address}
                    id={item.id}
                  />
                );
              })
            ) : (
              <p>No complexes found</p>
            )
          }

        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
