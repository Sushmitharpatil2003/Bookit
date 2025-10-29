"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

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
    <div className="w-full max-w-3xl mx-auto overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-56 sm:h-72 md:h-80">
        <Image
          src={image}
          alt={adventureName}
          fill
          className="object-cover rounded-2xl"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 md:p-8 space-y-4">
        {/* Title and Description */}
        <div className="space-y-2 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-semibold text-gray-800 bold text-lg sm:text-xl">
              {adventureName}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-600">Description:</span>
            <span className="text-gray-700 text-sm sm:text-base">
              {description}
            </span>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <p className="text-sm font-medium mb-2">Choose Date</p>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {dates.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <Button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-3 py-2 rounded-md border text-xs sm:text-sm
                    ${
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

        {/* Time Selection */}
        <div>
          <p className="text-sm font-medium mb-2">Choose Time</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isUnavailable =
                selectedDate && isSlotUnavailable(selectedDate, time);
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => !isUnavailable && setSelectedTime(time)}
                  disabled={!!isUnavailable}
                  className={`px-3 py-2 rounded-md border text-xs sm:text-sm
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

        {/* About Section */}
        <div>
          <p className="text-gray-700 text-sm sm:text-base">{about}</p>
        </div>
      </div>
    </div>
  );
}
