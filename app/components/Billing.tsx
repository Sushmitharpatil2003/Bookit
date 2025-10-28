"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const subtotal = startingAmount * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  const handleConfirm = () => {
    setLoading(true);
    router.push("/Checkout");
  };

  return (
    <Card className="bg-white overflow-hidden rounded-2xl shadow-lg">
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Starts at</span>
          <span>₹{startingAmount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              className="w-8 h-8 p-0 bg-gray-200 text-black text-lg font-bold"
              onClick={handleDecrease}
            >
              -
            </Button>
            <span className="text-base font-medium">{quantity}</span>
            <Button
              className="w-8 h-8 p-0 bg-gray-200 text-black text-lg font-bold"
              onClick={handleIncrease}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full" onClick={handleConfirm} disabled={loading}>
          {loading ? "Redirecting..." : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
}
