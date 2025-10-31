"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";
import { set } from "react-hook-form";
interface Adventure {
  _id: string;
  adventure: string;
  places: string;
  amount: number;
  imageUrl: string;
  discription?: string; 
}
export default function AdventureGrid() {
  const router = useRouter();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { adventureId, setAdventureId, searchItem } = useAppContext();

const filteredAdventures =
  searchItem && searchItem.trim() !== ""
    ? adventures.filter((adv) =>
        adv.adventure.toLowerCase().includes(searchItem.toLowerCase())
      )
    : adventures;


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adventures`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Adventure[]) => {
        setAdventures(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  const handleDetailPush = (id: string) => {
    router.push(`/Details?id=${id}`);
    setAdventureId(id);
  };

  if (loading) {
    return <p className="text-center text-lg">Loading adventures...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAdventures.map((adv) => (
          <Card
            key={adv._id}
            className="overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-60 w-full">
              <Image
                src={adv.imageUrl}
                alt={adv.adventure}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{adv.adventure}</h2>
                <p className="text-sm text-black bg-gray-200 rounded-md px-3 py-1">
                  {adv.places}
                </p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {adv.discription || "No description available."}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <div className="text-base font-semibold">
                From <span className="text-green-600 ml-1">₹{adv.amount}</span>
              </div>
              <Button
                onClick={() => {
                  handleDetailPush(adv._id);
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
