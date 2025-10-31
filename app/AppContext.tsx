"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  age: number;
}

interface AppContextType {
  adventureId: string;
  setAdventureId: (id: string) => void;
  slotDate?: string;
  setSlotDate: (date: string | undefined) => void;
  slotTime?: string;
  setSlotTime: (time: string | undefined) => void;
  seats?: number;
  setSeats: (quantity: number | undefined) => void;
  slotId?: string;
  setSlotId: (id: string | undefined) => void;
  totalAmount?: number;
  setTotalAmount: (amount: number | undefined) => void;
  bookingId?: string;
  setBookingId: (id: string | undefined) => void;
  searchItem?: string;
  setSearchItem: (adventure: string | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [adventureId, setAdventureId] = useState("");
  const [slotDate, setSlotDate] = useState<string | undefined>(undefined);
  const [slotTime, setSlotTime] = useState<string | undefined>(undefined);
  const [slotId, setSlotId] = useState<string | undefined>(undefined);
  const [seats, setSeats] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [bookingId, setBookingId] = useState<string | undefined>(undefined);
  const [searchItem, setSearchItem] = useState<string | undefined>("");

  return (
    <AppContext.Provider
      value={{
        adventureId,
        setAdventureId,
        slotDate,
        setSlotDate,
        slotTime,
        setSlotTime,
        seats,
        setSeats,
        slotId,
        setSlotId,
        totalAmount,
        setTotalAmount,
        bookingId,
        setBookingId,
        setSearchItem,
        searchItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
