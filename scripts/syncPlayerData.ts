// Import necessary libraries and Prisma client
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import type { PlayerData } from ":)/server/types";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Sleeper player data...");
  try {
    const playerDataObject = await fetchPlayerDataFile();
    console.log("2️⃣ Syncing player data to Prisma...");

    if (!playerDataObject || Object.keys(playerDataObject).length === 0) {
      console.log("🟡 No player data to sync...");
      return;
    }

    const playerDataArray = Object.values(playerDataObject);

    // Loop through player data array and create/update players in Prisma
    for (const p of playerDataArray) {
      const player = p as PlayerData;

      await prisma.player.upsert({
        where: { player_id: player.player_id },
        update: player,
        create: player,
      });
    }
  } catch (error) {
    console.error("Error syncing Sleeper player data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const fetchPlayerDataFile = async () => {
  console.log("1️⃣ Fetching Sleeper player data...");
  try {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const filePath = `./data/playerData/${dateString}.json`;

    const exists = await Bun.file(filePath).exists();

    if (exists) {
      console.log("🟡 File exists...");

      const file: PlayerData = await Bun.file(filePath).json();

      return file;
    }

    const sleeperPlayerData = await axios.get(
      "https://api.sleeper.app/v1/players/nfl"
    );

    console.log("🟢 Writing file...");

    await Bun.write(filePath, JSON.stringify(sleeperPlayerData.data))
      .catch((e) => console.log("🔴 Error writing file: ", e))
      .then(() => {
        console.log("✅ File written!");
      });

    return sleeperPlayerData.data as PlayerData[];
  } catch (error) {
    console.error("🔴 Error fetching Sleeper player data: ", error);
  }
};

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
