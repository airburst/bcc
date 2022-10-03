const { PrismaClient } = require("@prisma/client");
const { rides } = require("./data.js");
const prisma = new PrismaClient();

const load = async () => {
  try {
    // Clean up tables
    await prisma.ride.deleteMany();
    console.log("Deleted records in Ride table");

    // Add seed data
    await prisma.ride.createMany({
      data: rides,
    });

    // Alter tables
    // await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    console.log("Added Ride data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();
