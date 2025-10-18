import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function initDB() {
  if (!db) {
    await client.connect();
    db = client.db(); 
    console.log("Connected to MongoDB");
  }
  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}
