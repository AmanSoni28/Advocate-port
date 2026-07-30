import { cache } from "react";
import { cookies } from "next/headers";
import { decryptSession, SESSION_COOKIE_NAME } from "./session";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await decryptSession(token);

  if (!payload?.adminId) {
    return { isAuth: false, adminId: null, email: null };
  }

  return { isAuth: true, adminId: payload.adminId, email: payload.email || null };
});
