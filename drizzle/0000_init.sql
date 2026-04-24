CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price REAL NOT NULL,
  images TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  pincode TEXT,
  total REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_id TEXT,
  razorpay_order_id TEXT,
  items TEXT,
  created_at TEXT
);
