import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { verifyPassword } from "@/lib/auth/password";
import {
  encryptSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const identifier = body?.identifier?.trim();
  const password = body?.password;

  if (!identifier || !password) {
    return Response.json({ error: "Missing credentials" }, { status: 400 });
  }

  await dbConnect();

  const admin = await AdminUser.findOne({
    $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
  });

  if (!admin) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await encryptSession({
    adminId: admin._id.toString(),
    email: admin.email,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return Response.json({ success: true });
}
