import { SignJWT, jwtVerify } from "jose";

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not set");
}

const encodedKey = new TextEncoder().encode(SESSION_SECRET);

export const SESSION_COOKIE_NAME = "session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export async function encryptSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(encodedKey);
}

export async function decryptSession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}
