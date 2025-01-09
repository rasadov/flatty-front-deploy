const handleSelect = (
  setFilter,
  selectedFilters,
  setSelectedFilters,
  category,
  option,
  isSingleSelect
) => {
  const currentCategory = selectedFilters[category] || [];
  if (isSingleSelect) {
    setSelectedFilters({
      ...selectedFilters,
      [category]: option === currentCategory ? null : option,
    });
    setFilter(category, option === currentCategory ? null : option);
  } else {
    const newCategoryValue = Array.isArray(currentCategory)
      ? currentCategory.includes(option)
        ? currentCategory.filter((item) => item !== option)
        : [...currentCategory, option]
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
      [`${category}.${key}`]: newValue,
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

const isSelected = (filters, category, value) => {
  const currentValue = filters[category];
  if (Array.isArray(currentValue)) {
    return currentValue.includes(value);
  }
  return currentValue === value;
};
const getButtonStyle = (selectedFilters, category, value) => {
  const currentCategory = selectedFilters[category] || [];
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
  if (!filters) return true;

  return !Object.values(filters).some(
    (value) =>
      (Array.isArray(value) && value.length > 0) ||
      (typeof value === "string" && value !== "") ||
      (typeof value === "number" && value !== 0) ||
      (typeof value === "boolean" && value)
  );
};

export {
  handleSelect,
  handleNumericChange,
  handleToggle,
  isSelected,
  getButtonStyle,
  isApplyDisabled,
};
