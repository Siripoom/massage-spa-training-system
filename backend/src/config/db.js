const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "error", "warn"], // This will help us see database queries in the console
});

// Handle connection errors
prisma
  .$connect()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });

module.exports = prisma;
