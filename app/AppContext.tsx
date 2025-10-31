"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  age: number;
}

interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  user: User;
  setUser: (user: User) => void;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");
  const [user, setUser] = useState<User>({ name: "Guest", age: 20 });
  const [adventureId, setAdventureId] = useState("");
  const [slotDate, setSlotDate] = useState<string | undefined>(undefined);
  const [slotTime, setSlotTime] = useState<string | undefined>(undefined);
  const [slotId, setSlotId] = useState<string | undefined>(undefined);
  const [seats, setSeats] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [bookingId, setBookingId] = useState<string | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        user,
        setUser,
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
