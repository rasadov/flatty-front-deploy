import React from "react";
import SectionArea from "./SectionArea";

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const CardList = ({ sectionName, seeAll = false, properties, loading }) => {
  return (
    <SectionArea sectionName={sectionName} seeAll={seeAll}>
      {loading && <p>Loading...</p>}
      {Array.isArray(properties) && properties.length > 0 ? (
        chunkArray(properties, 4).map((chunk, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto"
          >
            {chunk.map((item) => (
              <a key={item.id} href={"/appartment/" + item.id}>
                <AgentPost
                  img={item.images[0]?.image_url} // Access the image URL safely
                  price={item.price}
                  location={
                    item.location?.address ||
                    `${item.location?.latitude}, ${item.location?.longitude}`
                  } // Format location as a string
                  area={item?.info?.total_area} // Access the area safely
                  rooms={item.info?.bedrooms} // Access the number of rooms safely
                  currFloor={item.info?.floor} // Access the current floor safely
                  building={item.info?.apartment_stories} // Access the building info safely
                  id={item.id}
                />
              </a>
            ))}
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </SectionArea>
  );
};


export default CardList;
