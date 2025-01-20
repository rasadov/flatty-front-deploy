import React from 'react';

function formatNumber(number) {
    console.log("formatNumber called");
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

export { formatNumber };