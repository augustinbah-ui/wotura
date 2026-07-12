"use client";
import { createContext, useContext, useState } from "react";
import { seedListings } from "../data/listings";

const ListingsContext = createContext(null);

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(seedListings);

  function addListing(newListing) {
    setListings((prev) => [{ ...newListing, id: Date.now(), mine: true }, ...prev]);
  }

  return (
    <ListingsContext.Provider value={{ listings, addListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings doit être utilisé dans ListingsProvider");
  return ctx;
}
