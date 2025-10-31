"use client";

import React from "react";
import BookingConfirmed from "../components/status";
import { useRouter } from "next/navigation";

export default function BookingStatusPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <BookingConfirmed />
    </main>
  );
}
