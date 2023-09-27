// Import necessary libraries and Prisma client
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a function to fetch and save Sleeper player data
async function main() {
  console.log("Syncing Sleeper player data...");
  try {
    const sleeperPlayerData = await axios.get(
      "https://api.sleeper.app/v1/players/nfl"
    );

    const filePath = "./data/sleeperPlayerData.json";

    await Bun.write(filePath, sleeperPlayerData.data);

    // Save data to the database using Prisma (adjust this based on your schema)
    // const createdPlayer = await prisma.player.create({
    //     data: {

    //     }
    // });

    // console.log("Sleeper player data synced:", createdPlayer);
  } catch (error) {
    console.error("Error syncing Sleeper player data:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// Schedule the job using node-cron (runs every day at midnight, adjust as needed)
// const cron = require("node-cron");
// cron.schedule("0 0 * * *", syncSleeperPlayerData);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
