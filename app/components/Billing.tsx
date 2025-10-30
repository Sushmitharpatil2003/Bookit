"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";


interface CartItemProps {
  startingAmount: number;
  initialQuantity?: number;
}

export default function CartCard({
  startingAmount,
  initialQuantity = 1,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const { slotId,slotDate,slotTime,setSeats,adventureId} = useAppContext();
  const router = useRouter();

  const handleIncrease = () => {setQuantity((q) => q + 1)
    setSeats(quantity + 1);
  };
  const handleDecrease = () => {setQuantity((q) => (q > 1 ? q - 1 : 1))
    setSeats(quantity > 1 ? quantity - 1 : 1);
  };


  const subtotal = startingAmount * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

const handleConfirm = async () => {
  setLoading(true);

  try {
    const bookingData = {
      slotId,
      slotDate,
      slotTime,
      quantity,
      total,
      subtotal,
      taxes,
      adventureId
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      throw new Error("Failed to create booking");
    }

    const result = await res.json();
    console.log("Booking created:", result);

    router.push("/Checkout");
  } catch (error) {
    console.error("Error creating booking:", error);
    alert("Something went wrong while booking. Try again!");
  } finally {
    setLoading(false);
  }
};


  return (
    <Card className="bg-gray-200 overflow-hidden rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <CardContent className="space-y-2 p-4 sm:p-6">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Starts at</span>
          <span>₹{startingAmount}</span>
        </div>

        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              className="w-6 h-6 sm:w-8 sm:h-8 p-0 bg-gray-200 text-black text-base sm:text-lg font-bold"
              onClick={handleDecrease}
            >
              -
            </Button>
            <span className="text-base sm:text-lg font-medium">{quantity}</span>
            <Button
              className="w-6 h-6 sm:w-8 sm:h-8 p-0 bg-gray-200 text-black text-base sm:text-lg font-bold"
              onClick={handleIncrease}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between text-base sm:text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full text-sm sm:text-base"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
}
