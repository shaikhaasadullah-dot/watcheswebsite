import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  tagline: varchar("tagline", { length: 200 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  collectionId: integer("collection_id")
    .notNull()
    .references(() => collections.id),
  shortDescription: varchar("short_description", { length: 240 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // cents
  compareAtPrice: integer("compare_at_price"), // cents
  images: jsonb("images").$type<string[]>().notNull(),
  gender: varchar("gender", { length: 20 }).notNull(), // men | women | unisex
  style: varchar("style", { length: 40 }).notNull(), // dress | sport | minimal | smart
  movement: varchar("movement", { length: 60 }).notNull(),
  caseSize: varchar("case_size", { length: 20 }).notNull(),
  caseMaterial: varchar("case_material", { length: 80 }).notNull(),
  strapMaterial: varchar("strap_material", { length: 80 }).notNull(),
  waterResistance: varchar("water_resistance", { length: 40 }).notNull(),
  dialColor: varchar("dial_color", { length: 40 }).notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  stock: integer("stock").notNull().default(25),
  featured: boolean("featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  author: varchar("author", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 24 }).notNull().unique(),
  email: varchar("email", { length: 200 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  address1: varchar("address1", { length: 200 }).notNull(),
  address2: varchar("address2", { length: 200 }),
  city: varchar("city", { length: 120 }).notNull(),
  region: varchar("region", { length: 120 }).notNull(),
  postalCode: varchar("postal_code", { length: 30 }).notNull(),
  country: varchar("country", { length: 80 }).notNull(),
  shippingMethod: varchar("shipping_method", { length: 40 }).notNull(),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull(),
  tax: integer("tax").notNull(),
  total: integer("total").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull(),
  image: text("image").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export type Collection = typeof collections.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
