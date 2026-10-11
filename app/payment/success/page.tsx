"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useCartContext } from "@/app/contexts/cart-context";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartContext();
  const reference = searchParams.get("reference");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!reference) return;

    const query = new URLSearchParams({ reference });
    if (orderId) query.set("orderId", orderId);

    void clearCart()
      .catch(() => false)
      .finally(() => router.replace(`/booking-confirmed?${query.toString()}`));
  }, [clearCart, orderId, reference, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-4">
      <div className="text-center" role="status" aria-live="polite">
        <LoaderCircle
          className="mx-auto animate-spin text-[#0177AB]"
          size={36}
        />
        <h1 className="mt-4 text-lg font-semibold text-[#101928]">
          {reference ? "Confirming your booking" : "Payment reference missing"}
        </h1>
        <p className="mt-1 text-sm text-[#667185]">
          {reference
            ? "Taking you to your booking details..."
            : "We could not match this payment to an order."}
        </p>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC]">
          <LoaderCircle className="animate-spin text-[#0177AB]" size={36} />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
