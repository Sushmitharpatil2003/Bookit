"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", search);
    // Add your search functionality here
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png" 
          alt="Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Search bar + button */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search adventures..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Button
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </header>
  );
}
