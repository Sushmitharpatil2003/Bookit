"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Adventure {
  id: number;
  image: string;
  adventureName: string;
  place: string;
  description: string;
  price: string;
}

const adventures: Adventure[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    adventureName: "Scuba Diving",
    place: "Goa",
    description:
      "Explore the vibrant underwater world with expert divers and experience the thrill of marine life.",
    price: "₹4999",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    adventureName: "Mountain Trekking",
    place: "Himachal Pradesh",
    description:
      "Challenge yourself with a mountain adventure and witness breathtaking views from the peaks.",
    price: "₹6999",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800",
    adventureName: "Paragliding",
    place: "Bir Billing",
    description:
      "Soar through the skies and enjoy panoramic views of the mountains with our professional pilots.",
    price: "₹5499",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516569422758-3f8e00efb477?w=800",
    adventureName: "Desert Safari",
    place: "Rajasthan",
    description:
      "Experience an exhilarating ride through the sand dunes and enjoy the golden sunset of the desert.",
    price: "₹3999",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    adventureName: "River Rafting",
    place: "Rishikesh",
    description:
      "Feel the adrenaline rush as you navigate through the rapids of the mighty Ganges river.",
    price: "₹4499",
  },
];

export default function AdventureGrid() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Adventure Packages
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adventures.map((adv) => (
          <Card
            key={adv.id}
            className="overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-60 w-full">
              <Image
                src={adv.image}
                alt={adv.adventureName}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{adv.adventureName}</h2>
                <p className="text-sm text-black-600 bg-gray-300 rounded-md px-3 py-1">
                  {adv.place}
                </p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {adv.description}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <div className="text-base font-semibold">
                From <span className="text-green-600 ml-1">{adv.price}</span>
              </div>
              <Button onClick={() => router.push("/Details")}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
