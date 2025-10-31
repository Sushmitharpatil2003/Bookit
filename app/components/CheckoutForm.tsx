"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn, Controller } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  promo: string;
  agree: boolean;
  isValidPromo?: boolean;
  discount?: number;
  isFinalCheckout?:boolean
}

interface CheckOutFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export default function CheckOutForm({ form, onSubmit }: CheckOutFormProps) {
  const { register, handleSubmit, control, watch } = form;
  const agree = watch("agree");

  const handleApply = async (data: FormValues) => {
    if (!data.agree) {
      alert("Please agree to the Terms and Safety Policy first.");
      return;
    }

    if (data.promo.trim() === "") {
      alert("Please enter a promo code.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/validate-promo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promo: data.promo }),
        }
      );
      const result = await res.json();
      form.setValue("isValidPromo", result.isValid);
      form.setValue("discount", result.discount || 0);
    } catch (error) {
      console.error("Error applying promo:", error);
    }

    onSubmit(data);
  };

  return (
    <form>
      <div className="flex justify-center items-center">
        <div className="bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Enter Your Details
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
                {...register("name", { required: true })}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label htmlFor="promo" className="text-gray-700 font-medium mb-1">
                Promo Code
              </label>
              <Input
                id="promo"
                placeholder="Enter Promo Code"
                className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
                {...register("promo")}
              />
            </div>
            <Button
              type="button"
              onClick={handleSubmit(handleApply)}
              className="bg-black text-white hover:bg-black-300 font-semibold px-8 h-[45px] rounded-lg mt-6 md:mt-auto md:w-auto w-full"
            >
              Apply
            </Button>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Controller
              control={control}
              name="agree"
              render={({ field }) => (
                <Checkbox
                  id="agree"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-black"
                />
              )}
            />
            <label
              htmlFor="agree"
              className="text-gray-700 text-sm leading-tight"
            >
              I agree to the{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Safety Policy
              </span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
