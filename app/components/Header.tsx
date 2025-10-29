"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", search);
    // Add your search functionality here
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-4 md:px-6 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
        <Image
          src={logo}
          alt="Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Search bar + button */}
      <div className="flex w-full md:w-auto flex-col md:flex-row items-stretch md:items-center gap-2">
        <Input
          type="text"
          placeholder="Search adventures..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 md:w-64"
        />
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto"
        >
          Search
        </Button>
      </div>
    </header>
  );
}
