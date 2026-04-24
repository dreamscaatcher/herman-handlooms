import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/razorpay";

export const runtime = "edge";

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
  const body: VerifyBody = await req.json();
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

  const valid = await verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    process.env.RAZORPAY_KEY_SECRET!
  );

  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const orderId = `ORD-${Date.now()}`;
  return NextResponse.json({ orderId });
}
