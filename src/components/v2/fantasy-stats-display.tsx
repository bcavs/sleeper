import { PlayerFantasyStatsBody } from ":)/server/types";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";

export default function FantasyStatsDisplay({
  fantasy_stats,
}: {
  fantasy_stats: string | number | true | JsonObject | JsonArray;
}) {
  const stats = JSON.parse(fantasy_stats as string) as PlayerFantasyStatsBody;

  // turn object into array
  const statsArray = Object.entries(stats);
  console.log("Fantasy stats display... ", statsArray);

  return (
    <div className="h-full max-h-[500px] w-full overflow-scroll">
      <ul>
        {statsArray.map((game) => {
          const gameId = game[0];
          const gameStats = game[1];

          return (
            <li key={gameId} className="my-5 divide-y-2">
              <h3>Game ID: {gameId}</h3>
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
