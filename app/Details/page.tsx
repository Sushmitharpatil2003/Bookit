"use client";

import AdventureBookingCard from "@/app/components/BookingCard";
import CartCard from "../components/Billing";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 bold absolute py-8 px-10"
        onClick={() => router.push("/")}
      >
        <ArrowLeft /> Adventure
      </Button>
      <div className="w-1/2 min-h-screen">
        <AdventureBookingCard
          image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
          adventureName="Scuba Diving"
          description="Dive into the ocean and explore amazing marine life."
          about="This adventure includes guided scuba diving sessions, safety training, and all necessary equipment."
          unavailableSlots={["2025-10-29-09:00", "2025-10-30-11:00"]}
        />
      </div>

      {/* Right Half - Cart Section */}
      <div className="w-1/2 h-screen py-20">
        <div className="w-full h-full overflow-hidden px-10 py-10">
          <CartCard startingAmount={4999} initialQuantity={1} />
        </div>
      </div>
    </div>
  );
}
