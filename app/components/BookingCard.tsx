"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useAppContext } from "../AppContext";
import { set } from "react-hook-form";
interface AdventureBookingCardProps {
  image: string;
  adventureName: string;
  discription: string;
  about: string;
  slots: {
    _id: string;
    adventureId: string;
    date: string;
    time: string;
    availableSeats: number;
    capacity: number;
    bookedSeats: number;
  }[];
}

export default function AdventureBookingCard({
  image,
  adventureName,
  discription,
  about,
  slots,
}: AdventureBookingCardProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const { setSlotDate, setSlotTime, setSlotId } = useAppContext();

  const dates: string[] = [];
  const today = dayjs();
  const maxDate = today.add(2, "month");
  let current = today;

  while (current.isBefore(maxDate) || current.isSame(maxDate, "day")) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  useEffect(() => {
    const unavailable = slots
      .filter((s) => s.availableSeats <= 0)
      .map((s) => `${s.date}-${new Date(s.time).toISOString().slice(11, 16)}`);
    setUnavailableSlots(unavailable);
  }, [slots]);

  const isSlotUnavailable = (date: string, time: string) =>
    unavailableSlots.includes(`${date}-${time}`);

  const slotTimesById: Record<string, string> = {};
  slots.forEach((slot) => {
    slotTimesById[slot._id] = `${slot.date} ${new Date(slot.time)
      .toISOString()
      .slice(11, 16)}`;
  });

  const timeSlots: string[] = Array.from(
    new Set(
      slots
        .filter((s) => (selectedDate ? s.date === selectedDate : true))
        .map((s) => new Date(s.time).toISOString().slice(11, 16))
    )
  ).sort();

  const slotAvailability: Record<string, number> = {};
  slots.forEach((slot) => {
    const key = `${slot.date}-${new Date(slot.time)
      .toISOString()
      .slice(11, 16)}`;
    slotAvailability[key] = slot.availableSeats;
  });
  const capacity = slots.length > 0 ? slots[0].capacity : 0;

  return (
    <div className="w-full max-w-3xl mx-auto overflow-hidden">
      <div className="relative w-full h-56 sm:h-72 md:h-80">
        {image ? (
          <Image
            src={image}
            alt={adventureName}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-2xl text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-4">
        <div className="space-y-2 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-semibold text-gray-800 text-lg sm:text-xl">
              {adventureName}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-gray-700 text-sm sm:text-base">
              {discription}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Choose Date</p>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {dates.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <Button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSlotDate(date);
                  }}
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

        <div>
          <p className="text-sm font-medium mb-2">Choose Time</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isUnavailable =
                selectedDate && isSlotUnavailable(selectedDate, time);
              const isSelected = selectedTime === time;

              const key = `${selectedDate}-${time}`;
              const seatsLeft = slotAvailability[key] ?? capacity;

              return (
                <Button
                  key={time}
                  onClick={() => {
                    if (!isUnavailable && selectedDate) {
                      const matchingSlot = slots.find(
                        (s) =>
                          s.date === selectedDate &&
                          new Date(s.time).toISOString().slice(11, 16) === time
                      );

                      if (matchingSlot) {
                        setSelectedTime(time);
                        setSlotTime(time);
                        setSlotId(matchingSlot._id); 
                      }
                    }
                  }}
                  disabled={!!isUnavailable}
                  className={`px-3 py-2 rounded-md border text-xs sm:text-sm flex flex-col items-center${
                    isUnavailable
                      ? "bg-red-100 text-red-600 border-red-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-200 text-gray-800 border-gray-300"
                  }`}
                >
                  <span>{time}</span>
                  {seatsLeft < 5 && seatsLeft > 0 && (
                    <span className="text-red-600 text-[10px] font-bold">
                      {seatsLeft} seats left
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-gray-700 text-sm sm:text-base">{about}</p>
        </div>
      </div>
    </div>
  );
}
