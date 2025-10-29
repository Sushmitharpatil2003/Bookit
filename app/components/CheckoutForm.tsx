"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckOut() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);

  const handlePromoApply = () => {
    if (!agree) {
      alert("Please agree to the Terms and Safety Policy first.");
      return;
    }
    if (promo.trim() === "") {
      alert("Please enter a promo code.");
      return;
    }
    console.log("Promo applied:", { name, email, promo });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Enter Your Details
        </h2>

        {/* Name + Email */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
              required
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
              required
            />
          </div>
        </div>

        {/* Promo + Apply Button */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="promo" className="text-gray-700 font-medium mb-1">
              Promo Code
            </label>
            <Input
              id="promo"
              type="text"
              placeholder="Enter Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="bg-gray-200 text-gray-900 h-[45px] rounded-lg"
            />
          </div>
          <Button
            type="button"
            onClick={handlePromoApply}
            className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold px-8 h-[45px] rounded-lg mt-6 md:mt-auto md:w-auto w-full"
          >
            Apply
          </Button>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={(checked) => setAgree(!!checked)}
            required
          />
          <label htmlFor="agree" className="text-gray-700 text-sm leading-tight">
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
  );
}
