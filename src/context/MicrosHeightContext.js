/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
// src/context/MicrosHeightContext.js
import React, { createContext, useState, useContext } from 'react';

const MicrosHeightContext = createContext();

export const MicrosHeightProvider = ({ children }) => {
  const [maxHeight, setMaxHeight] = useState(0);

  return (
    <MicrosHeightContext.Provider value={{ maxHeight, setMaxHeight }}>
      {children}
    </MicrosHeightContext.Provider>
  );
};

export const useMicrosHeight = () => {
  return useContext(MicrosHeightContext);
};
