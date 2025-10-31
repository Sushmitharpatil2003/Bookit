"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppContext } from "../AppContext";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";

interface FormValues {
  name: string;
  email: string;
  promo: string;
  agree: boolean;
  isValidPromo?: boolean;
  discount?: number;
}

interface CartItemProps {
  startingAmount: number;
  initialQuantity?: number;
  form?: UseFormReturn<FormValues>;
  onCheckout?: () => void;
  steps?: string;
}

export default function CartCard({
  startingAmount,
  initialQuantity = 1,
  form,
  onCheckout,
  steps,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState<string>(steps || "slot");

  const { slotId, slotDate, slotTime, setSeats, adventureId, setTotalAmount } =
    useAppContext();

  const subtotal = startingAmount * quantity;
  const taxes = 59;
  const totalAfterDiscount = subtotal + taxes - discount;

  useEffect(() => {
    setTotalAmount?.(totalAfterDiscount);
  }, [totalAfterDiscount, setTotalAmount]);

  const promoCode = form?.watch("promo") || "";
  const isValidPromo = form?.watch("isValidPromo");
  const discountFromForm = form?.watch("discount") || 0;

  useEffect(() => {
    if (!promoCode.trim()) {
      setDiscount(0);
      return;
    }

    if (isValidPromo) {
      setDiscount(discountFromForm);
    } else {
      setDiscount(0);
    }
  }, [promoCode, isValidPromo, discountFromForm]);

  const handleIncrease = () => {
    setQuantity((q) => {
      const newQ = q + 1;
      setSeats?.(newQ);
      return newQ;
    });
  };

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleConfirm = async () => {
    if (step === "slot") {
      if (!slotDate || !slotTime) {
        toast.error("Please select a date and time");
        return;
      }
      setStep("checkout");
      onCheckout?.();
      return;
    }

    if (step === "checkout") {
      const name = form?.watch("name") || "";
      const email = form?.watch("email") || "";

      if (!name.trim() || !email.trim()) {
        toast.error("Please enter your name and email to complete booking");
        return;
      }

      try {
        setLoading(true);

        const bookingData = {
          slotId,
          slotDate,
          slotTime,
          quantity,
          subtotal,
          taxes,
          totalAmount: totalAfterDiscount,
          adventureId,
          promoCode: promoCode || null,
          discount,
          name,
          email,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (!res.ok) throw new Error("Failed to create booking");
        const result = await res.json();

        toast.success("Booking successful!");
        onCheckout?.();
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again!");
      } finally {
        setLoading(false);
      }
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
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Time</span>
          <span>{slotTime}</span>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Taxes</span>
          <span>₹{taxes}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm sm:text-base text-green-700">
            <span className="font-medium">Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between text-base sm:text-lg font-bold">
          <span>Total</span>
          <span>₹{totalAfterDiscount}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button onClick={handleConfirm} disabled={loading} className="w-full">
          {loading ? "Processing..." : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
}
