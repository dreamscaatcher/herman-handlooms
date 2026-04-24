import crypto from "crypto";

export function createHmac(orderId: string, paymentId: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

export function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac(orderId, paymentId, secret);
  return expected === signature;
}
