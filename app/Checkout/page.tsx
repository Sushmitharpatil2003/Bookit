"use client";

import CheckOutForm from "../components/CheckoutForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartCard from "../components/Billing";
import { useAppContext } from "../AppContext";
import { useForm } from "react-hook-form";


interface FormValues {
  name: string;
  email: string;
  promo: string;
  agree: boolean;
  isValidPromo?: boolean;
  discount?: number;
}

export default function Home() {
  const router = useRouter();


  const { adventureId } = useAppContext();
  const handleCheckoutBack = () => {
    router.push(`/Details?id=${adventureId}`);
  };

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      promo: "",
      agree: false,
      isValidPromo: false,
      discount: 0,
    },
  });
  const onSubmit = (data: FormValues) => {

    const promoCode = form?.watch("promo") || "";

  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 md:p-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold"
          onClick={() => {
            handleCheckoutBack();
          }}
        >
          <ArrowLeft /> Checkout
        </Button>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row md:gap-8 md:p-8">
        <div className="w-full md:w-2/3 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-lg">
            <CheckOutForm form={form} onSubmit={onSubmit} />
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-full md:w-1/3 p-4 md:p-0 flex justify-center">
          <div className="w-full max-w-md h-auto md:h-[80vh]">
            <CartCard
              startingAmount={4999}
              initialQuantity={1}
              form={form}
              onCheckout={() => router.push("/Confirmed")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
