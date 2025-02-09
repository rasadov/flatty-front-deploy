import React from "react";
import Input from "./Input";

export const RangeInput = ({
  label,
  from,
  to,
  onFromChange,
  onToChange,
  selectedCurrency,
  onCurrencyChange,
  currencies,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-[5px] p-2">
      {/* Labels */}
      <div className="flex items-center justify-start gap-4">
        <label className="text-xs font-medium text-[#8247E5]">{label}</label>
        <label className="text-xs font-medium text-[#8C93A3]">
          Price per square meter
        </label>
      </div>

      {/* Input fields and Currency dropdown */}
      <div className="flex gap-2">
        {/* From Input */}
        <div className="relative ">
          <Input
            type="text"
            placeholder="from"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-[146px] h-[35px] p-2 border border-gray-300 rounded-md text-xs text-[#B2B7C2]"
          />
          <span className="absolute text-xs text-gray-400 right-3 top-2">
            m²
          </span>
        </div>
        {/* To Input */}
        <div className="relative ">
          <Input
            type="text"
            placeholder="to"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="w-[146px] h-[35px] p-2 border border-gray-300 rounded-md text-xs text-[#B2B7C2]"
          />
          <span className="absolute text-xs text-gray-400 right-3 top-2">
            m²
          </span>
        </div>
        {/* Currency Dropdown */}
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="p-2 border border-[#EEEFF2] rounded-md w-[68px] h-[35px] text-xs"
        >
          {currencies.map((currency) => (
            <option
              key={currency}
              value={currency}
              className="text-[#0F1D40] text-xs"
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RangeInput;
