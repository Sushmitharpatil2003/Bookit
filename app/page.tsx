import Image from "next/image";
import AdventureGrid from "./components/Adventure";
import Header from "./components/Header";
import CartCard from "./components/Billing";
import AdventureBookingCard from "./components/BookingCard";
import CheckOut from "./components/CheckoutForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdventureGrid />
    </div>
  );
}
