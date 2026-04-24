import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: real("price").notNull(),
  images: text("images"), // JSON array of Cloudinary URLs
  category: text("category"), // "Handloom" | "Decor" | "Bedding"
  stock: integer("stock").default(0),
  featured: integer("featured").default(0),
  createdAt: text("created_at"),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city"),
  pincode: text("pincode"),
  total: real("total").notNull(),
  status: text("status").default("pending"),
  paymentId: text("payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
  items: text("items"), // JSON snapshot of cart
  createdAt: text("created_at"),
});

export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
