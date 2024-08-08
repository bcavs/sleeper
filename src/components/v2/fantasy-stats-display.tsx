import { PlayerGameStats } from ":)/server/types";
import { api } from ":)/utils/api";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FantasyStatsGraph from "./fantasy-stats-graph";

export default function FantasyStatsDisplay({
  player_id,
}: {
  player_id: string;
}) {
  const [isStale, setIsStale] = useState(false);

  const { mutate: syncPlayerData } =
    api.players.syncPlayerFantasyStatsById.useMutation({
      onSuccess: async () => {
        setIsStale(false);
        console.log("🌟 Player data synced.");
        await refetch();
      },
      onError: (error) => {
        console.log("Failed to sync player data:", error);
      },
    });

  const {
    data: playerData,
    refetch,
    isLoading,
  } = api.players.getPlayerById.useQuery({
    player_id: player_id,
  });

  // if the playerData.updated_at is more than 2 days, add refresh button
  if (playerData?.updated_at) {
    const updated = new Date(playerData?.updated_at);
    const today = new Date();

    //!!: DEBUG SET DATE 3 DAYS IN FUTURE
    // today.setDate(today.getDate() + 3);

    const diff = today.getTime() - updated.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 2) {
      console.log("Warning: Player data is more than 2 days old.");
      if (!isStale) setIsStale(true);
    }
  } else {
    console.log("Warning: Player data is more than 2 days old.");
    if (!isStale) setIsStale(true);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!playerData) {
    return <p>No player data found.</p>;
  }

  // Check if fantasy_stats
  if (playerData.fantasy_stats === null) {
    return <p>No fantasy stats found.</p>;
  }

  let statsArray: [string, PlayerGameStats][] = [];

  // Check if fantasy_stats is a string and try to parse it
  if (typeof playerData?.fantasy_stats === "string") {
    try {
      const parsedStats = JSON.parse(playerData.fantasy_stats) as Record<
        string,
        PlayerGameStats
      >;

      statsArray = Object.entries(parsedStats);
    } catch (error) {
      console.log("Failed to parse fantasy_stats:", error);
      return;
    }
  } else {
    // If fantasy_stats is not a string, log an error
    console.log("fantasy_stats is not a valid string");
    return (
      <div>
        {isStale && (
          <>
            <button
              onClick={() => {
                if (!playerData.espn_id) {
                  toast.error("Player ESPN ID is missing.");
                  return;
                }

                syncPlayerData({ espn_id: playerData.espn_id });
              }}
              className="flex items-center gap-1 text-xs text-red-500"
            >
              Refresh <RefreshCw size={12} />
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="h-full max-h-[100%] w-full">
        <FantasyStatsGraph
          stats={statsArray}
          teamAbbr={playerData.team_abbr ?? ""}
        />
        <ul className="p-4">
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
        <p>{playerData.player_id ? playerData.player_id : "N/A"}</p>
        <div className="h-1 w-1 rounded-full bg-slate-300" />
        <p>{playerData.espn_id ? playerData.espn_id : "N/A"}</p>
        <div className="h-1 w-1 rounded-full bg-slate-300" />
        <p>
          Last updated: {playerData.updated_at?.getMonth()}/
          {playerData.updated_at?.getDate()}/
          {playerData.updated_at?.getFullYear()}
        </p>
      </div>
    </>
  );
}
