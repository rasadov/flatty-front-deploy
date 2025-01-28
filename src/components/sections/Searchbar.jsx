import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ShowMap } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const cities = [
  "Lefkoşa",
  "Girne",
  "Gazimağusa",
  "Güzelyurt",
  "İskele",
  "Lefke",
  "Lapta",
  "Alsancak",
  "Değirmenlik",
  "Yeni Erenköy",
  "Geçitkale",
];

const areas = {
  "Lefkoşa": [
    "Akıncılar",
    "Alayköy",
    "Dilekkaya",
    "Erdemli",
    "Gönyeli",
    "Gürpınar",
    "Hamitköy",
    "Haspolat",
    "Kanlıköy",
    "Kırklar",
    "Kırıkkale",
    "Lefkoşa",
    "Türkeli",
    "Yılmazköy",
    "Yiğitler",
    "Abdi Çavuş",
    "Akkavuk",
    "Arabahmet",
    "Ayyıldız",
    "Çağlayan",
    "Göçmenköy",
    "Haydarpaşa",
    "İbrahimpaşa",
    "İplikpazarı",
    "Kafesli",
    "Karamanzade",
    "Köşklüçiftlik",
    "Kızılay",
    "Küçük Kaymaklı",
    "Mahmutpaşa",
    "Marmara",
    "Metehan",
    "Ortaköy",
    "Selimiye",
    "Taşkınköy",
    "Yenicami",
    "Yenişehir"
  ],
  "Gönyeli": [
    "Gönyeli",
    "Yenikent"
  ],
  "Değirmenlik": [
    "Balıkesir",
    "Beyköy",
    "Cihangir",
    "Çukurova",
    "Değirmenlik",
    "Demirhan",
    "Düzova",
    "Gaziköy",
    "Gökhan",
    "Kalavaç",
    "Meriç",
    "Minareliköy",
    "Yeniceköy",
    "Bahçelievler",
    "Başpınar",
    "Camialtı",
    "Mehmetçik",
    "Saray",
    "Tepebaşı"
  ],
  "Gazimağusa": [
    "Akova",
    "Alaniçi",
    "Aslanköy",
    "Dörtyol",
    "Gazimağusa",
    "Güvercinlik",
    "Korkuteli",
    "Kurudere",
    "Mormenekşe",
    "Mutluyaka",
    "Pirhan",
    "Şehitler",
    "Yeni Boğaziçi",
    "Yıldırım",
    "Anadolu",
    "Baykal",
    "Canbolat",
    "Çanakkale",
    "Dumlupınar",
    "Harika",
    "Karakol",
    "Lala Mustafa Paşa",
    "Namık Kemal",
    "Pertev Paşa",
    "Piyale Paşa",
    "Sakarya",
    "Suriçi",
    "Tuzla",
    "Zafer",
    "Atlılar",
    "Muratağa",
    "Sandallar"
  ],
  "Geçitkale": [
    "Çamlıca",
    "Çınarlı",
    "Ergenekon",
    "Geçitkale",
    "Gönendere",
    "Görneç",
    "Mallıdağ",
    "Nergisli",
    "Pınarlı",
    "Serdarlı",
    "Sütlüce",
    "Tatlısu",
    "Tirmen",
    "Ulukışla",
    "Yamaçköy"
  ],
  "Tatlısu": [
    "Aktunç",
    "Küçükerenköy",
    "Yalı"
  ],
  "Akdoğan": [
    "Akdoğan",
    "Beyarmudu",
    "Çayönü",
    "İncirli",
    "İnönü",
    "Köprü",
    "Paşaköy",
    "Turunçlu",
    "Türkmenköy",
    "Vadili"
  ],
  "Girne": [
    "Ağırdağ",
    "Alsancak",
    "Arapköy",
    "Aşağı Dikmen",
    "Aşağı Taşkent",
    "Bahçeli",
    "Beşparmak",
    "Beylerbeyi",
    "Boğazköy",
    "Çatalköy",
    "Dağyolu",
    "Esentepe",
    "Girne",
    "Göçeri",
    "Güngör",
    "Ilgaz",
    "Karaağaç",
    "Karaman",
    "Karşıyaka",
    "Kömürcü",
    "Lapta",
    "Malatya/İncesu",
    "Ozanköy",
    "Pınarbası",
    "Yeni Mahalle",
    "Yeşiltepe",
    "Yukarı Dikmen",
    "Yukarı Taşkent",
    "Aşağı Girne",
    "Aşağı Karaman",
    "Doğanköy",
    "Edremit",
    "Karakum",
    "Karaoğlanoğlu",
    "Yukarı Girne",
    "Zeytinlik"
  ],
  "Lapta": [
    "Adatepe",
    "Başpınar",
    "Kocatepe",
    "Sakarya",
    "Tınaztepe",
    "Türk",
    "Yavuz"
  ],
  "Alsancak": [
    "Çağlayan",
    "Yayla",
    "Yeşilova"
  ],
  "Çamlıbel": [
    "Akçiçek",
    "Akdeniz",
    "Alemdağ",
    "Çamlıbel",
    "Geçitköy",
    "Hisarköy",
    "Karpaşa",
    "Kayalar",
    "Kılıçarslan",
    "Koruçam",
    "Kozanköy",
    "Özhan",
    "Sadrazamköy",
    "Şirinevler",
    "Tepebaşı"
  ],
  "Güzelyurt": [
    "Akçay",
    "Aydınköy",
    "Gayretköy",
    "Güneşköy",
    "Güzelyurt",
    "Kalkanlı",
    "Mevlevi",
    "Serhatköy",
    "Şahinler",
    "Yayla",
    "Yuvacık",
    "Zümrütköy",
    "Asağı Bostancı",
    "İsmetpaşa",
    "Lala Mustafa Paşa",
    "Piyalepaşa",
    "Yukarı Bostancı"
  ],
  "İskele": [
    "Ağıllar",
    "Altınova",
    "Ardahan",
    "Aygün",
    "Boğaziçi",
    "Ergazi",
    "İskele",
    "Kalecik",
    "Kaplıca",
    "Kurtuluş",
    "Kuzucuk",
    "Mersinlik",
    "Ötuken",
    "Sınırüstü",
    "Topçuköy",
    "Turnalar",
    "Yarköy",
    "Boğaz",
    "Boğaztepe",
    "Cevizli",
    "İskele",
    "Bafra",
    "Balalan",
    "Büyükkonuk",
    "Çayırova",
    "Kilitkaya",
    "Kumyalı",
    "Mehmetçik",
    "Pamuklu",
    "Sazlıköy",
    "Tuzluca",
    "Yedikonuk",
    "Zeybekköy"
  ],
  "Yeni Erenköy": [
    "Adaçay",
    "Avtepe",
    "Boltaşlı",
    "Derince",
    "Dipkarpaz",
    "Esenköy",
    "Gelincik",
    "Kaleburnu",
    "Kuruova",
    "Sipahi",
    "Taşlıca",
    "Yeni Erenköy",
    "Yeşilköy",
    "Ziyamet"
  ],
  "Lefke": [
    "Bademliköy",
    "Bağlıköy",
    "Cengizköy",
    "Çamlıköy",
    "Doğancı",
    "Erenköy",
    "Gaziveren",
    "Kurutepe",
    "Lefke",
    "Taşpınar",
    "Yeşilırmak",
    "Yeşilyurt",
    "Denizli",
    "Gemikonağı",
    "Lefke",
    "Yedidalga"
  ]
}


export const Searchbar = ({
  onShowMap,
  onSearch,
  value,
  onChange,
  filters,
  API_URL,
  setData,
  redirectPath = "/search",
}) => {
  const [dropdownStates, setDropdownStates] = useState({
    category: null,
    roomNumber: [],
    priceRange: { Min: "", Max: "" },
    location: value || "",
    city: null,
    // Instead of min/max, we store the chosen area name
    area: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  // Use saved currency or default to "£"
  const [selectedCurrency] = useState(
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

  // Keep 'location' synced with prop 'value'
  useEffect(() => {
    setDropdownStates((prevState) => ({
      ...prevState,
      location: value || "",
    }));
  }, [value]);

  // Fetch data whenever URL changes or dropdown states change
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const queryString = currentParams.toString();

    fetch(`${API_URL}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data search bar", data);
        setData(data);
      });
  }, [window.location.search, dropdownStates, API_URL, setData]);

  /**
   * Build a fresh query string from state, navigate, and run onSearch if needed.
   */
  const handleSearch = (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams();
    queryParams.set("page", 1);
    queryParams.set("elements", 50);

    // 1) Category
    if (dropdownStates.category) {
      queryParams.set("category", dropdownStates.category);
    }

    // 2) Room Number
    if (dropdownStates.roomNumber.length > 0) {
      // For example ["Studio","1+1"] => "0,1" ignoring the plus sign part
      const mapped = dropdownStates.roomNumber.map((val) => {
        if (val.toLowerCase() === "studio") {
          return "0";
        }
        const plusIndex = val.indexOf("+");
        if (plusIndex !== -1) {
          return val.substring(0, plusIndex);
        }
        return val;
      });
      queryParams.set("roomNumber", mapped.join(","));
    }

    // 3) Price Range
    const { Min, Max } = dropdownStates.priceRange;
    if (Min) {
      queryParams.set(
        "priceRangeMin",
        Math.round(Min * currencies_to_dollar[selectedCurrency])
      );
    }
    if (Max) {
      queryParams.set(
        "priceRangeMax",
        Math.round(Max * currencies_to_dollar[selectedCurrency])
      );
    }

    // 4) Area (now a single string, not a min/max range)
    if (dropdownStates.area) {
      queryParams.set("area", dropdownStates.area);
    }

    // 5) City
    if (dropdownStates.city) {
      if (dropdownStates.area) {
        queryParams.set("city", dropdownStates.area);
      }
      else {
        queryParams.set("city", dropdownStates.city);
      }
    }

    // 6) Location
    if (dropdownStates.location) {
      queryParams.set("location", dropdownStates.location);
    }

    navigate(`${redirectPath}?${queryParams.toString()}`);
    console.log("Final query:", queryParams.toString());
  };

  /**
   * Room selection toggle
   */
  const handleRoomSelect = (room) => {
    setDropdownStates((prevState) => {
      if (prevState.roomNumber.includes(room)) {
        return {
          ...prevState,
          roomNumber: prevState.roomNumber.filter((r) => r !== room),
        };
      } else {
        return {
          ...prevState,
          roomNumber: [...prevState.roomNumber, room],
        };
      }
    });
  };

  const handleShowOnMap = () => {
    // Show on map
    window.location = "/map";
  };

  /**
   * Open or close a dropdown
   */
  const handleDropdownToggle = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  /**
   * Handle setting city/category/etc. from the dropdown
   */
  const handleSelectOption = (type, newValue) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: newValue,
    }));
    // Close dropdown (except if it's for location, which might be typed?)
    if (type !== "location") setDropdownOpen(null);
  };

  /**
   * Price range inputs
   */
  const handlePriceChange = (e, priceKey) => {
    const val = e.target.value;
    setDropdownStates((prevState) => ({
      ...prevState,
      priceRange: { ...prevState.priceRange, [priceKey]: val },
    }));
  };

  /**
   * Render dynamic dropdown content
   */
  const renderDropdownContent = (type) => {
    switch (type) {
      case "city":
        return (
          <div className="p-4">
            {cities.map((cityItem, index) => (
              <p
                key={index}
                onClick={() => handleSelectOption("city", cityItem)}
                className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm cursor-pointer"
              >
                {cityItem}
              </p>
            ))}
          </div>
        );
      case "area":
        return (
          <div className="p-4">
            {dropdownStates.city ? (
              areas[dropdownStates.city] ? (
                areas[dropdownStates.city].map((areaName, index) => (
                  <p
                    key={index}
                    onClick={() => handleSelectOption("area", areaName)}
                    className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm cursor-pointer"
                  >
                    {areaName}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No areas found for {dropdownStates.city}
                </p>
              )
            ) : (
              <p className="text-sm text-gray-500">Please select a city first</p>
            )}
          </div>
        );
      case "category":
        return (
          <div className="p-4">
            {["Appartment", "Villa", "Penthouse", "Cottages"].map((cat) => (
              <p
                key={cat}
                onClick={() => handleSelectOption("category", cat)}
                className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm cursor-pointer"
              >
                {cat}
              </p>
            ))}
          </div>
        );
      case "roomNumber":
        return (
          <div className="absolute mt-2 w-[260px] bg-white border rounded-md shadow-lg z-10">
            <div className="grid grid-cols-3 gap-2 p-4">
              {["Studio", "1+1", "2+1", "3+1", "4+1", "5+1"].map((room) => (
                <button
                  key={room}
                  onClick={() => handleRoomSelect(room)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md text-gray-700 focus:outline-none ${
                    dropdownStates.roomNumber.includes(room)
                      ? "border-purple-500 bg-white text-black"
                      : "bg-gray-200"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        );
      case "price":
        return (
          <div className="p-4">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={dropdownStates.priceRange.Min}
                onChange={(e) => handlePriceChange(e, "Min")}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={dropdownStates.priceRange.Max}
                onChange={(e) => handlePriceChange(e, "Max")}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-full w-full mx-auto bg-white rounded-lg shadow-lg flex flex-wrap items-center gap-4 justify-between"
      style={{ boxShadow: "0px 1px 1px 0px #703ACA14" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[200px]">
        <button
          onClick={() => handleDropdownToggle("category")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.category || "Category"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "category" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "category" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("category")}
          </motion.div>
        )}
      </div>

      {/* Room Number Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[150px]">
        <button
          onClick={() => handleDropdownToggle("roomNumber")}
          className="flex items-center justify-between w-full px-4 py-2 bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            Room Number
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "roomNumber" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "roomNumber" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("roomNumber")}
          </motion.div>
        )}
      </div>

      {/* Price Range Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("price")}
          className="flex items-center justify-between w-full px-4 py-2 bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.priceRange.Min || dropdownStates.priceRange.Max
              ? `${selectedCurrency}${dropdownStates.priceRange.Min} - ${selectedCurrency}${dropdownStates.priceRange.Max}`
              : "Price"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "price" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "price" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("price")}
          </motion.div>
        )}
      </div>

      {/* City Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("city")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.city || "City"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "city" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "city" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("city")}
          </motion.div>
        )}
      </div>

      {/* Area Dropdown (select from the area list for chosen city) */}
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("area")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {/* Show the selected area or 'Area' if none */}
            {dropdownStates.area || "Area"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "area" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "area" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("area")}
          </motion.div>
        )}
      </div>


      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        {/* Show on Map */}
        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-2 text-[#8247E5] bg-white h-[50px] w-full sm:w-auto font-semibold rounded-md shadow-md sm:shadow-none"
        >
          <ShowMap />
          <span className="ml-2 text-sm sm:text-base">Show on map</span>
        </button>
        {/* Search */}
        <motion.button
          onClick={handleSearch}
          className="bg-[#8247E5] hover:bg-[#A673EF] text-white px-6 py-3 w-full sm:w-auto h-[50px] sm:h-auto rounded-md font-semibold shadow-md sm:shadow-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Search
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Searchbar;