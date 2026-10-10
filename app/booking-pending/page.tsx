"use client";

import { Suspense } from "react";
import BookingResultPage from "@/app/components/BookingResultPage";

export default function BookingPendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookingResultPage isConfirmed={false} />
    </Suspense>
  );
}
