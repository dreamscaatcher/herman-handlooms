import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { amount } = await req.json() as { amount: number };

  if (!amount || amount < 100) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // paise
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });

  return NextResponse.json({ orderId: order.id, amount: order.amount });
}
