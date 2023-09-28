// Import necessary libraries and Prisma client
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import type { PlayerData } from ":)/server/types";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Sleeper player data...");
  try {
    const playerData = await fetchPlayerDataFile();
    console.log("🟢 Syncing player data to Prisma...");

    if (!playerData || playerData.length === 0) {
      console.log("🟡 No player data to sync...");
      return;
    }

    // loop through player data and create/update players in Prisma
    playerData.map((player) => {
      console.log("🟢 Syncing player: ", player.player_id);
    });

    console.log(playerData[1]);
    // const players: PlayerData[] = JSON.parse(playerData);
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

      const file: PlayerData[] = await Bun.file(filePath).json();

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
