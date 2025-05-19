import React, { createContext, useState } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};
