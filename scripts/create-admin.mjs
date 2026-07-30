import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { dbConnect } from "../src/lib/mongodb.js";
import AdminUser from "../src/models/AdminUser.js";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !username || !password) {
    console.error(
      "ADMIN_EMAIL, ADMIN_USERNAME and ADMIN_PASSWORD must be set (e.g. in .env.local) before running this script."
    );
    process.exit(1);
  }

  await dbConnect();

  const existing = await AdminUser.findOne({});
  if (existing) {
    console.log(
      `An admin user already exists (${existing.email}). Refusing to create another. Delete it manually first if you really want to replace it.`
    );
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await AdminUser.create({ email, username, passwordHash });
  console.log(`Admin user created: ${admin.email} (${admin.username})`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
