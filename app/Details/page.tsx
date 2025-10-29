"use client";

import AdventureBookingCard from "@/app/components/BookingCard";
import CartCard from "../components/Billing";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="p-4 md:p-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold"
          onClick={() => router.push("/")}
        >
          <ArrowLeft /> Adventure
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row md:gap-6 md:p-8">
        {/* Left Section - Adventure */}
        <div className="w-full md:w-1/2 p-4 md:p-0 flex justify-center">
          <AdventureBookingCard
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
            adventureName="Scuba Diving"
            description="Dive into the ocean and explore amazing marine life."
            about="This adventure includes guided scuba diving sessions, safety training, and all necessary equipment."
            unavailableSlots={["2025-10-29-09:00", "2025-10-30-11:00"]}
          />
        </div>

        {/* Right Section - Cart */}
        <div className="w-full md:w-1/2 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-md h-auto md:h-[80vh]">
            <CartCard startingAmount={4999} initialQuantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
