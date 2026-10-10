"use client";

import { Suspense } from "react";
import BookingResultPage from "@/app/components/BookingResultPage";

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookingResultPage isConfirmed />
    </Suspense>
  );
}
