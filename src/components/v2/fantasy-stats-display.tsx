import { PlayerGameStats } from ":)/server/types";
import { api } from ":)/utils/api";
import FantasyStatsGraph from "./fantasy-stats-graph";
import { PlayerWithStats } from "./player-card";

export default function FantasyStatsDisplay({ player }: PlayerWithStats) {
  if (!player) {
    return <p>No player data found.</p>;
  }

  if (player === null) {
    return <p>No fantasy stats found.</p>;
  }

  let statsArray: [string, PlayerGameStats][] = [];

  if (typeof player?.fantasy_stats === "string") {
    try {
      const parsedStats = JSON.parse(player.fantasy_stats) as Record<
        string,
        PlayerGameStats
      >;
      statsArray = Object.entries(parsedStats);
    } catch (error) {
      console.log("Failed to parse fantasy_stats:", error);
      return;
    }
  } else {
    console.log("fantasy_stats is not a valid string");
    return;
  }

  return (
    <>
      <div className="h-full max-h-[100%] w-full">
        <FantasyStatsGraph
          stats={statsArray}
          teamAbbr={player.team_abbr ?? ""}
        />
        <ul className="p-4">
          {statsArray.map((game) => {
            const gameId = game[0];
            const gameStats = game[1];

            const getGameDate = (gameId: string) => {
              const dateString = gameId.split("_")[0];
              if (!dateString) return;

              const year = dateString.slice(0, 4);
              const month = dateString.slice(4, 6);
              const day = dateString.slice(6, 8);

              return `${year}-${month}-${day}`;
            };

            const getGameMatchup = (gameId: string) => {
              const matchup = gameId.split("_")[1];
              if (!matchup) return;

              return matchup;
            };

            return (
              <li key={gameId} className="my-5 divide-y-2 ">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold">{`${getGameMatchup(gameId)}`}</h3>
                  <p className="text-xs text-slate-500">{`${getGameDate(
                    gameId
                  )}`}</p>
                </div>
                <ul>
                  <li className="max-w-[250px]">
                    <p>
                      Fantasy Points:{" "}
                      {`${
                        typeof gameStats?.fantasyPoints === "string"
                          ? gameStats?.fantasyPoints
                          : "0"
                      }`}
                    </p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Last updated info */}
      <div className="absolute bottom-1 right-2 flex items-center gap-2 text-xs text-slate-300">
        <p>Player ID: {player.player_id ? player.player_id : "N/A"}</p>
        <div className="h-1 w-1 rounded-full bg-slate-300" />
        <p>Player ESPN ID: {player.espn_id ? player.espn_id : "N/A"}</p>
        <div className="h-1 w-1 rounded-full bg-slate-300" />
        <p>
          {/* Last updated: {player.updated_at?.getMonth() + 1}/ */}
          {player.updated_at?.getDate()}/{player.updated_at?.getFullYear()}
        </p>
      </div>
    </>
  );
}
