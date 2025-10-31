"use client";

import { Suspense } from "react";
import DetailsPage from "./DetailsPage";

export default function DetailsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPage />
    </Suspense>
  );
}
