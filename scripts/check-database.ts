import "dotenv/config";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { getPrisma } from "../src/lib/prisma";

if (process.env.DATABASE_TEST_ALLOW_WRITE !== "true") {
  throw new Error("Set DATABASE_TEST_ALLOW_WRITE=true only for an isolated test database.");
}

const prisma = getPrisma();
try {
  await prisma.$transaction(async (transaction) => {
    const email = `database-check-${randomUUID()}@example.invalid`;
    const created = await transaction.contact.create({
      data: {
        firstName: "Database",
        lastName: "Check",
        email,
        service: "PostgreSQL verification",
        message: "Long inquiry content. ".repeat(30),
        terms: true,
      },
    });
    assert.ok(created.id > 0);
    assert.ok(created.createdAt instanceof Date);
    assert.equal(created.phone, null);
    const stored = await transaction.contact.findUniqueOrThrow({ where: { id: created.id } });
    assert.equal(stored.email, email);
    assert.ok(stored.message.length > 191);
    const updated = await transaction.contact.update({
      where: { id: created.id },
      data: { company: "Updated company" },
    });
    assert.equal(updated.company, "Updated company");
    await transaction.contact.delete({ where: { id: created.id } });
    assert.equal(await transaction.contact.count({ where: { email } }), 0);
  });
  console.log("PostgreSQL Prisma create/read/update/delete, defaults, and long text verified.");
} finally {
  await prisma.$disconnect();
}
