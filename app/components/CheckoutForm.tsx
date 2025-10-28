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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the Terms and Safety Policy.");
      return;
    }
    console.log("Form Submitted:", { name, email, promo, agree });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Enter Your Details
        </h2>

        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="promo" className="text-gray-700 font-medium">
            Promo Code
          </label>
          <Input
            id="promo"
            type="text"
            placeholder="Enter Promo Code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="bg-gray-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={(checked) => setAgree(!!checked)}
            required
          />
          <label htmlFor="agree" className="text-gray-700 text-sm">
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

        <Button
          type="submit"
          className="w-full bg-yellow-400 text-black hover:bg-yellow-300 mt-2"
          disabled={!agree} // optionally disable until checked
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
