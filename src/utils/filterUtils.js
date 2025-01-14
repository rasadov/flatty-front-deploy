const handleSelect = (
  setFilter,
  selectedFilters,
  setSelectedFilters,
  category,
  option,
  isSingleSelect
) => {
  console.log("Handling select for:", category, option);
  if (isSingleSelect) {
    setSelectedFilters({
      ...selectedFilters,
      [category]: option,
    });
    setFilter(category, option);
  } else {
    const newCategoryValue = Array.isArray(selectedFilters[category])
      ? selectedFilters[category].includes(option)
        ? selectedFilters[category].filter((item) => item !== option)
        : [...selectedFilters[category], option]
      : [option];
    setSelectedFilters({
      ...selectedFilters,
      [category]: newCategoryValue,
    });
    setFilter(category, newCategoryValue);
  }
};

const handleNumericChange = (
  setFilter,
  selectedFilters,
  setSelectedFilters,
  category,
  key,
  change,
  minValue = 0
) => {
  setFilter(`${category}.${key}`, (prev) => {
    const newValue = Math.max(minValue, (prev || 0) + change);
    setSelectedFilters({
      ...selectedFilters,
      [category]: {
        ...(selectedFilters[category] || {}),
        [key]: newValue,
      },
    });
    return newValue;
  });
};
const handleToggle = (
  toggleFilter,
  selectedFilters,
  setSelectedFilters,
  key
) => {
  toggleFilter(key);
  setSelectedFilters({ ...selectedFilters, [key]: !selectedFilters[key] });
};

const isSelected = (filters, category, value, subKey = null) => {
  const currentValue = subKey ? filters[category]?.[subKey] : filters[category];
  if (Array.isArray(currentValue)) {
    return currentValue.includes(value);
  }
  return currentValue === value;
};

const getButtonStyle = (selectedFilters, category, value, subKey = null) => {
  const currentCategory = subKey
    ? selectedFilters[category]?.[subKey] || []
    : selectedFilters[category] || [];
  const isSelected = Array.isArray(currentCategory)
    ? currentCategory.includes(value)
    : currentCategory === value;
  return `px-4 py-2 text-xs font-semibold border text-[#525C76] h-[40px] rounded-sm transition-all duration-300 ease-in-out transform ${
    isSelected
      ? "border-[#8247E5] outline outline-2 outline-[#DCD4FF] scale-105"
      : "border-[#E2E4E8] hover:border-[#8247E5] hover:bg-[#F5F6F7]"
  }`;
};
const isApplyDisabled = (filters) => {
  const isEmpty = (value) =>
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value === "") ||
    (typeof value === "number" && value === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "boolean" && !value);

  for (let key in filters) {
    if (!isEmpty(filters[key])) {
      return false;
    }
  }
  return true;
};
export {
  handleSelect,
  handleNumericChange,
  handleToggle,
  isSelected,
  getButtonStyle,
  isApplyDisabled,
};
