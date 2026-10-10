import { apiClient } from "@/app/lib/api/client";

export interface PaymentOrderItemInput {
  durationInMonths: number;
  billboardId: string;
  startDate: string; // YYYY-MM-DD
}

export interface InitializePaymentRequest {
  orderItems: PaymentOrderItemInput[];
  couponCode?: string;
  brandName?: string;
  location?: string;
  industry?: string;
  objective?: string;
  additionalInfo?: string;
  artworkUrl?: string;
}

export interface OrderItem {
  billboard: string;
  startDate: string;
  durationInMonths: number;
  _id: string;
}

export interface InitializePaymentResponse {
  userId: string;
  orderItems: OrderItem[];
  status: string;
  _id: string;
  reference: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  authorizationUrl?: string;
  paymentUrl?: string;
}

export class PaymentService {
  private readonly basePath = "/orders";

  async initializePayment(
    data: InitializePaymentRequest
  ): Promise<InitializePaymentResponse> {
    return apiClient.post<InitializePaymentResponse>(
      `${this.basePath}/initiate-payments`,
      data
    );
  }

}

export const paymentService = new PaymentService();

export function isSuccessfulPaymentStatus(status?: string): boolean {
  return ["paid", "success", "successful", "completed", "confirmed", "succeeded", "settled"].includes(
    status?.trim().toLowerCase() ?? "",
  );
}

export function isFailedPaymentStatus(status?: string): boolean {
  const normalizedStatus = status?.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return [
    "failed",
    "failure",
    "payment_failed",
    "unsuccessful",
    "declined",
    "cancelled",
    "canceled",
    "rejected",
    "expired",
    "error",
  ].includes(normalizedStatus ?? "");
}
