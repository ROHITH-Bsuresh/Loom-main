

import React, { createContext, useState } from 'react';

export const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const updateStockAfterSale = (saleData) => {
    // Logic to update stock
    console.log("Stock updated with", saleData);
  };

  return (
    <SaleContext.Provider value={{ updateStockAfterSale }}>
      {children}
    </SaleContext.Provider>
  );
};
