// import React from "react";
// import {
//   isSelected,
//   getButtonStyle,
//   handleSelect,
//   handleToggle,
// } from "../utils/filterUtils";
// import { ToggleTrue } from "../assets/icons/ToggleTrue";
// import { ToggleFalse } from "../assets/icons/ToggleFalse";

// const FilterSelect = ({
//   label,
//   category,
//   value,
//   options,
//   setFilter,

//   setSelectedFilters,
//   selectedFilters = {},
// }) => (
//   <div className="flex items-center justify-between mb-3">
//     <label className="block text-[12px] font-medium text-[#0F1D40]">
//       {label}
//     </label>
//     <select
//       // Safely access the category in selectedFilters, defaulting to an empty string if undefined
//       value={selectedFilters[category] ?? ""}
//       onChange={(e) =>
//         handleSelect(
//           setFilter,
//           selectedFilters,
//           setSelectedFilters,
//           category,
//           e.target.value,
//           true
//         )
//       }
//       className="w-[224px] h-[40px] p-2 bg-[#EEEFF2] border border-[#E2E4E8] rounded-sm text-[#525C76] font-semibold text-[12px] leading-[19.2px]"
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default FilterModuleSelectBox;
