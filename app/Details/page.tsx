"use client";

import AdventureBookingCard from "@/app/components/BookingCard";
import CartCard from "../components/Billing";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Slot {
  _id: string;
  adventureId: string;
  date: string;
  time: string;
  availableSeats: number;
  capacity: number;
  bookedSeats: number;
}

interface Adventure {
  _id: string;
  adventure: string;
  places: string;
  amount: number;
  imageUrl: string;
  discription: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const experienceId = searchParams.get("id");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const router = useRouter();



  useEffect(() => {
    if (!experienceId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/details?experienceId=${experienceId}`
    )
      .then((res) => res.json())
      .then((data: { slots: Slot[]; adventure: Adventure[] }) => {
        setSlots(Array.isArray(data.slots) ? data.slots : [data.slots]);
        setAdventures(
          Array.isArray(data.adventure) ? data.adventure : [data.adventure]
        );
      })
      .catch((err) => console.error("Error fetching details:", err));

  }, [experienceId]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 md:p-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold"
          onClick={() => router.push("/")}
        >
          <ArrowLeft /> Adventure
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:gap-6 md:p-8">
        <div className="w-full md:w-1/2 p-4 md:p-0 flex justify-center">
          <AdventureBookingCard
            image={adventures[0]?.imageUrl || ""}
            adventureName={adventures[0]?.adventure || "Adventure"}
            discription={adventures[0]?.discription || ""}
            about="This adventure includes guided scuba diving sessions, safety training, and all necessary equipment."
            slots={slots}
          />
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-md h-auto md:h-[80vh]">
            <CartCard
              startingAmount={adventures[0]?.amount || 4999}
              initialQuantity={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
