"use client";

import CheckOut from "../components/CheckoutForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartCard from "../components/Billing";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 md:p-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold"
          onClick={() => router.push("/Details")}
        >
          <ArrowLeft /> Checkout
        </Button>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row md:gap-8 md:p-8">
        <div className="w-full md:w-2/3 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-lg">
            <CheckOut />
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-full md:w-1/3 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-md h-auto md:h-[80vh]">
            <CartCard startingAmount={4999} initialQuantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
