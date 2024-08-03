import { PlayerFantasyStatsBody } from ":)/server/types";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";

export default function FantasyStatsDisplay({
  fantasy_stats,
}: {
  fantasy_stats: string | number | true | JsonObject | JsonArray;
}) {
  let stats: PlayerFantasyStatsBody | null = null;

  // Check if fantasy_stats is a string and try to parse it
  if (typeof fantasy_stats === "string") {
    try {
      stats = JSON.parse(fantasy_stats) as PlayerFantasyStatsBody;
    } catch (error) {
      console.error("Failed to parse fantasy_stats:", error);
      return;
    }
  } else {
    // If fantasy_stats is not a string, log an error
    console.error("fantasy_stats is not a valid string");
    return;
  }

  // Verify that the parsed stats object is not null and is a valid object
  if (!stats || typeof stats !== "object") {
    console.error("Parsed stats is not a valid object");
    return;
  }

  // turn object into array
  const statsArray = Object.entries(stats);

  return (
    <div className="h-full max-h-[500px] w-full overflow-scroll">
      <ul>
        {statsArray.map((game) => {
          const gameId = game[0];
          const gameStats = game[1];

          const getGameDate = (gameId: string) => {
            const dateString = gameId.split("_")[0];
            if (!dateString) {
              return;
            }

            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const day = dateString.slice(6, 8);

            return `${year}-${month}-${day}`;
          };

          const getGameMatchup = (gameId: string) => {
            const matchup = gameId.split("_")[1];
            if (!matchup) {
              return;
            }

            return matchup;
          };

          return (
            <li key={gameId} className="my-5 divide-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold">{`${getGameMatchup(gameId)}`}</h3>
                <p className="text-xs text-slate-500">{`${getGameDate(
                  gameId
                )}`}</p>
              </div>
              <ul>
                <li className="max-w-[250px]">
                  <p>Fantasy Points: {gameStats.fantasyPoints}</p>
                </li>
                {/* {Object.entries(gameStats).map((stat) => {
                  const statName = stat[0];
                  const statValue = stat[1];

                  return (
                    <li key={statName.toString()} className="max-w-[250px]">
                      <p>
                        {statName.toString()}: {JSON.stringify(statValue)}
                      </p>
                    </li>
                  );
                })} */}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
