import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/razorpay";

export const runtime = "nodejs";

interface VerifyBody {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  order: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    total: number;
    items: string;
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json() as VerifyBody;
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, order } = body;

  const valid = verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    process.env.RAZORPAY_KEY_SECRET!
  );

  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  // In prod, persist to D1 via Cloudflare binding.
  // For now, return a synthetic order ID so checkout flow works.
  const orderId = `ORD-${Date.now()}`;

  return NextResponse.json({ orderId });
}
