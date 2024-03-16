import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database...");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin",
    salt
  );

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      is_admin: true,
    },
  });

  console.log("Seeded!!");
};

await main()
  .catch((e) => console.error(e))
  .then(() => prisma.$disconnect());
