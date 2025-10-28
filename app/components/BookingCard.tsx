"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdventureBookingCardProps {
  image: string;
  adventureName: string;
  description: string;
  about: string;
  unavailableSlots?: string[];
}

export default function AdventureBookingCard({
  image,
  adventureName,
  description,
  about,
  unavailableSlots = [],
}: AdventureBookingCardProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate dates for next 2 months
  const dates: string[] = [];
  const today = dayjs();
  const maxDate = today.add(2, "month");
  let current = today;

  while (current.isBefore(maxDate) || current.isSame(maxDate, "day")) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  const timeSlots = ["07:00", "09:00", "11:00", "13:00"];

  const isSlotUnavailable = (date: string, time: string): boolean =>
    unavailableSlots.includes(`${date}-${time}`);

  return (
    <div className="w-full h-full overflow-hidden px-10 py-20">
      <div className="relative h-100 w-full rounded-2xl overflow-hidden shadow-md">
        <Image src={image} alt={adventureName} fill className="object-cover" />
      </div>

      <div className="p-10 space-y-4">
        {/* Adventure details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Adventure:</span>
            <span className="font-semibold text-gray-800">{adventureName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Description:</span>
            <span className="text-gray-700 text-sm">{description}</span>
          </div>
        </div>

        {/* Date picker */}
        <div>
          <p className="text-sm font-medium mb-2">Choose Date</p>
          <div className="flex overflow-x-auto gap-2">
            {dates.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <Button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-3 py-2 rounded-md border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-200 text-gray-800 border-gray-300"
                  }`}
                >
                  {dayjs(date).format("DD MMM")}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Choose Time</p>
          <div className="flex gap-2 flex-wrap">
            {timeSlots.map((time) => {
              const isUnavailable =
                selectedDate && isSlotUnavailable(selectedDate, time);
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => !isUnavailable && setSelectedTime(time)}
                  disabled={!!isUnavailable}
                  className={`px-3 py-2 rounded-md border flex-shrink-0
                    ${
                      isUnavailable
                        ? "bg-red-100 text-red-600 border-red-300 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-200 text-gray-800 border-gray-300"
                    }
                  `}
                >
                  {time} {!!isUnavailable && "- No slots left"}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-gray-700 text-sm">{about}</p>
        </div>
      </div>
    </div>
  );
}
