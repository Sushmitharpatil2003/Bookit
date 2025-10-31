"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BookingConfirmed() {
  const router = useRouter();

  const [reference, setReference] = useState("");
  useEffect(() => {
    const generateReference = () => {
      const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `Ref ID ${part1}${part2}`;
    };
    setReference(generateReference());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          backgroundColor: "#24AC39",
          width: "100px",
          height: "100px",
        }}
      >
        <Check size={48} color="white" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-800">
        Booking Confirmed
      </h1>

      <p
        className="mt-2 text-gray-600 font-mono"
        style={{ fontFamily: "Inter, Regular" }}
      >
        {reference}
      </p>

      <Button
        variant="ghost"
        className="flex items-center gap-2 font-bold bg-gray-300"
        onClick={() => router.push("/")}
      >
        Back To Home
      </Button>
    </div>
  );
}
