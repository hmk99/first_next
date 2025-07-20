"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  // Load basket from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("basket");
    if (stored) setBasket(JSON.parse(stored));
  }, []);

  // Save basket to localStorage on change
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product) => {
    setBasket((prev) => [...prev, product]);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item, idx) => idx !== id));
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
