export interface BookingDetailItem {
  id: string;
  name: string;
  location: string;
  durationInMonths: number;
  startDate: string;
  unitPrice: number;
  total: number;
}

export interface BookingDetails {
  orderId?: string;
  reference?: string;
  amount: number;
  items: BookingDetailItem[];
  brandName: string;
  location: string;
  industry: string;
  objective: string;
  additionalInfo: string;
  artworkUrl: string;
}

const bookingStoragePrefix = "vaad:booking:";

export function saveBookingDetails(
  order: { _id?: string; reference?: string; amount?: number },
  details: Omit<BookingDetails, "orderId" | "reference" | "amount"> & {
    amount?: number;
  },
) {
  const booking: BookingDetails = {
    ...details,
    orderId: order._id,
    reference: order.reference,
    amount: order.amount ?? details.amount ?? 0,
  };
  const serialized = JSON.stringify(booking);

  if (booking.orderId) {
    localStorage.setItem(`${bookingStoragePrefix}${booking.orderId}`, serialized);
  }
  if (booking.reference) {
    localStorage.setItem(`${bookingStoragePrefix}${booking.reference}`, serialized);
  }
}

export function getBookingDetails(
  orderId: string | null,
  reference: string | null,
): BookingDetails | null {
  for (const identifier of [reference, orderId]) {
    if (!identifier) continue;

    try {
      const saved = localStorage.getItem(`${bookingStoragePrefix}${identifier}`);
      if (saved) return JSON.parse(saved) as BookingDetails;
    } catch {
      return null;
    }
  }

  return null;
}