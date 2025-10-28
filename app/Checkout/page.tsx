"use client";
import CheckOut from "../components/CheckoutForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartCard from "../components/Billing";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
    <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 bold absolute py-8 px-10"
        onClick={() => router.push("/Details")}
      >
        <ArrowLeft /> CheckOut
      </Button>
      <CheckOut />
          <CartCard startingAmount={4999} initialQuantity={1} />
    </div>
  );
}
