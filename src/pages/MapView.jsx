// src/pages/MapView.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from "../components/Map";
import MapPropertyDetails from "../components/MapPropertyDetails";
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import {
  FilterModal,
  Searchbar,
  SelectedFilters,
} from "../components/sections/index.js";
import { FilterButton } from "../assets/icons";
// Предполагается, что updateFilters импортирован, если он используется

export default function MapView() {
  // Состояния:
  // - resProperties – минимальные данные, полученные с сервера (например, от /api/v1/property/map)
  // - visibleProperties – детальные данные объектов, находящихся в текущей видимой области карты
  // - selectedProperties – выбранные объекты (при клике по маркеру или кластеру)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [resProperties, setResProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem("currency") === null
      ? "£"
      : localStorage.getItem("currency")
  );
  const currencies_to_dollar = {
    "€": 1.03,
    "£": 1.22,
    $: 1,
    "₺": 0.028,
  };
  const dispatch = useDispatch();

  // Получаем минимальные данные с сервера (например, с /api/v1/property/map)
  useEffect(() => {
    fetch("https://api.flatty.ai/api/v1/property/map")
      .then((res) => res.json())
      .then((data) => {
        console.log("Минимальные данные:", data);
        setResProperties(data);
      })
      .catch((err) =>
        console.error("Ошибка при загрузке данных из /property/map", err)
      );
  }, []);

  console.log("Минимальные объекты (resProperties):", resProperties);

  // Если resProperties уже загружены, а visibleProperties пусты,
  // запрашиваем детальную информацию для всех объектов, чтобы изначально показать весь список.
  useEffect(() => {
    if (resProperties.length > 0 && visibleProperties.length === 0) {
      Promise.all(
        resProperties.map((prop) =>
          fetch(`https://api.flatty.ai/api/v1/property/record/${prop.property_id}`)
            .then((res) => res.json())
        )
      )
        .then((allDetails) => {
          setVisibleProperties(allDetails);
        })
        .catch((err) =>
          console.error("Ошибка при загрузке детальной информации всех объектов", err)
        );
    }
  }, [resProperties, visibleProperties]);

  const handleCloseDetails = () => {
    setSelectedProperties([]);
  };

  const handleShowMap = () => {
    setSelectedProperties([]);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  // При клике по маркеру запрашиваем детальную информацию для выбранного объекта
  const handleMarkerClick = async (property) => {
    try {
      const response = await fetch(
        `https://api.flatty.ai/api/v1/property/record/${property.property_id}`
      );
      const detailedProperty = await response.json();
      // Обновляем состояние выбранного объекта (одиночно)
      setSelectedProperties([detailedProperty]);
    } catch (err) {
      console.error("Error fetching property details:", err);
    }
  };

  // При клике по кластеру – устанавливаем массив объектов кластера (для выделения)
  const handleClusterClick = (clusterProperties) => {
    setSelectedProperties(clusterProperties);
  };

  // Обработчик изменения границ карты.
  // Он фильтрует объекты из resProperties по видимой области
  // и для каждого запрашивает детальную информацию.
  const handleBoundsChanged = (bounds) => {
    if (!bounds) return;
    const visibleMinProps = resProperties.filter((property) => {
      const lat = property.latitude;
      const lng = property.longitude;
      if (!lat || !lng) return false;
      return bounds.contains(new window.google.maps.LatLng(lat, lng));
    });
    Promise.all(
      visibleMinProps.map((prop) =>
        fetch(`https://api.flatty.ai/api/v1/property/record/${prop.property_id}`)
          .then((res) => res.json())
      )
    )
      .then((detailedVisibleProps) => {
        setVisibleProperties(detailedVisibleProps);
      })
      .catch((err) =>
        console.error("Ошибка при загрузке детальной информации видимых объектов", err)
      );
  };

  // Итоговый список для левого сайдбара – здесь отображаются только видимые объекты.
  // Для выделения выбранных объектов они передаются отдельно через selectedProperties.
  const orderedProperties =
    selectedProperties.length > 0
      ? [
          ...selectedProperties,
          ...visibleProperties.filter(
            (prop) =>
              !selectedProperties.some(
                (sel) => sel.property_id === prop.property_id
              )
          ),
        ]
      : visibleProperties;

  return (
    <main className="flex-grow mt-28 bg-[#F4F2FF]">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
      <div className=" flex items-center justify-center w-full  px-4">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => {}}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          API_URL="https://api.flatty.ai/api/v1/property/map"
          setData={setResProperties}
          redirectPath="/map"

          
        />
       
      </div>
      <div className="flex flex-col lg:flex-row h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
        {/* Левый сайдбар – отображаем объекты, находящиеся в видимой области карты */}
        <div className="w-full sm:w-[300px] mb-4 border-r border-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 mt-4">
          <MapPropertyDetails
            properties={orderedProperties}
            selectedProperties={selectedProperties}
            onCloseDetails={handleCloseDetails}
          />
        </div>

        {/* Фильтр в виде модального окна */}
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApply={(newFilters) => {
            dispatch(updateFilters(newFilters));
            setIsModalOpen(false);
          }}
        />

        {/* Правая часть – карта */}
        <div className="flex-1 p-4">
          <Map
            properties={resProperties}
            onMarkerClick={handleMarkerClick}
            onClusterClick={handleClusterClick}
            onBoundsChanged={handleBoundsChanged}  // Передаём callback для обновления видимых объектов
          />
        </div>
      </div>
      <div className="px-6 mx-auto bg-[#ECE8FF]">
        <Footer />
      </div>
    </main>
  );
}