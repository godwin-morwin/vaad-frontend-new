/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/contexts/toast-context";
import { useAuthContext } from "@/app/contexts/auth-context";
import { useCartContext } from "@/app/contexts/cart-context";
import {
  paymentService,
  InitializePaymentRequest,
  InitializePaymentResponse,
  isFailedPaymentStatus,
  isSuccessfulPaymentStatus,
} from "@/app/lib/payment/payment-service";
import {
  BookingDetails,
  saveBookingDetails,
} from "@/app/lib/payment/booking-details";

interface UsePaymentReturn {
  isPaying: boolean;
  error: string | null;
  lastOrder: InitializePaymentResponse | null;
  initializePayment: (
    data: InitializePaymentRequest,
    details?: Omit<BookingDetails, "orderId" | "reference" | "amount"> & {
      amount?: number;
    },
  ) => Promise<InitializePaymentResponse | null>;
  clearError: () => void;
}

export function usePayment(): UsePaymentReturn {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastOrder, setLastOrder] =
    useState<InitializePaymentResponse | null>(null);

  const { isAuthenticated } = useAuthContext();
  const { clearCart } = useCartContext();
  const { showToast } = useToast();
  const router = useRouter();

  const clearError = useCallback(() => setError(null), []);

  const initializePayment = useCallback(
    async (
      data: InitializePaymentRequest,
      details?: Omit<BookingDetails, "orderId" | "reference" | "amount"> & {
        amount?: number;
      },
    ) => {
      if (!isAuthenticated) {
        showToast?.({
          type: "warning",
          message: "Please log in to continue to payment",
          duration: 3000,
        });
        return null;
      }

      if (!data?.orderItems?.length) {
        showToast?.({
          type: "warning",
          message: "Your cart is empty",
          duration: 3000,
        });
        return null;
      }

      setIsPaying(true);
      setError(null);

      try {
        const order = await paymentService.initializePayment(data);
        setLastOrder(order);
        if (details) saveBookingDetails(order, details);

        if (isSuccessfulPaymentStatus(order.status)) {
          try {
            await clearCart();
          } catch (clearError) {
            console.error("Failed to clear cart after confirmed payment:", clearError);
          }
          router.replace(
            `/booking-confirmed?orderId=${encodeURIComponent(order._id)}&reference=${encodeURIComponent(order.reference)}`,
          );
          return order;
        }

        if (isFailedPaymentStatus(order.status)) {
          const message = `Payment initialization failed (${order.status}).`;
          setError(message);
          showToast?.({ type: "error", message, duration: 4000 });
          router.replace(`/payment/error?message=${encodeURIComponent(message)}`);
          return null;
        }

        const payUrl = order.authorizationUrl || order.paymentUrl;
        if (payUrl) {
          window.location.href = payUrl;
          return order;
        }

        const message = order.status
          ? `Payment was not started. The payment service returned "${order.status}" without a checkout link.`
          : "Payment was not started. The payment service did not return a payment status or checkout link.";
        setError(message);
        showToast?.({ type: "error", message, duration: 4000 });
        router.replace(`/payment/error?message=${encodeURIComponent(message)}`);

        return null;
      } catch (err: any) {
        const raw =
          err?.message ||
          err?.data?.message ||
          "Failed to initialize payment";
        const msg = Array.isArray(raw) ? raw.join(", ") : String(raw);

        setError(msg);
        showToast?.({
          type: "error",
          message: msg,
          duration: 4000,
        });

        router.push(`/payment/error?message=${encodeURIComponent(msg)}`);
        return null;
      } finally {
        setIsPaying(false);
      }
    },
    [isAuthenticated, clearCart, router, showToast]
  );

  return {
    isPaying,
    error,
    lastOrder,
    initializePayment,
    clearError,
  };
}