import React, { createContext, useContext, useReducer } from "react";

export const RideContext = createContext();

export const RideProvider = ({ reducer, initialState, children }) => (
  <RideContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </RideContext.Provider>
);

export const useRideValue = () => useContext(RideContext);
