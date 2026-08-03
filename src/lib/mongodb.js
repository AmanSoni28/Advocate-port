import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL environment variable is not set");
}

let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(DB_URL, {
        dbName: "advo",
        bufferCommands: false,
        serverSelectionTimeoutMS: 10_000,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        // Permit a later request to retry after a transient connection failure.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
