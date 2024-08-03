import { Player } from "@prisma/client";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from ":)/utils";
import { api } from ":)/utils/api";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

const PlayerCardDialog = ({ player }: { player: Player }) => {
  const [isStale, setIsStale] = useState(false);
  console.log(player);

  const { data, isLoading, isError, refetch } =
    api.players.getPlayerFantasyStatsById.useQuery(
      {
        espn_id: player.espn_id ?? 0,
      },
      {
        enabled: false,
      }
    );

  console.log("data: ", data);

  //if the player.updated_at is more than 2 days, show a warning
  if (player.updated_at) {
    const updated = new Date(player.updated_at);
    const today = new Date();

    //!!: DEBUG SET DATE 3 DAYS IN FUTURE
    today.setDate(today.getDate() + 3);

    const diff = today.getTime() - updated.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 2) {
      console.log("Warning: Player data is more than 2 days old.");
      if (!isStale) setIsStale(true);
      // TODO: Fetch the data from the RapidAPI endpoint then update the player data in Supabase
    }
  }

  return (
    <div className="flex items-center gap-4">
      {player.position === "DEF" ? (
        <Image
          src={`https://sleepercdn.com/images/team_logos/nfl/${player.player_id?.toLowerCase()}.png`}
          alt={`${player.first_name} ${player.last_name}`}
          width={100}
          height={66}
          className="rounded-full"
          style={{ height: "auto", width: "auto" }}
        />
      ) : (
        <Image
          src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
          alt={`${player.first_name} ${player.last_name}`}
          width={100}
          height={66}
          className="rounded-full"
          style={{ height: "auto", width: "auto" }}
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-semibold">
            {player.first_name} {player.last_name}
          </h3>
          <p className="text-xs text-slate-400">{player.number}</p>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <Skeleton
            className={cn("h-2 w-2", {
              "bg-red-500": player.position === "QB",
              "bg-blue-500": player.position === "WR",
              "bg-green-500": player.position === "RB",
              "bg-orange-500": player.position === "TE",
              "bg-purple-500": player.position === "K",
              "bg-amber-900": player.position === "DEF",
            })}
          />
          <p className="text-sm font-semibold leading-6 ">{player.position}</p>{" "}
          -
          <p className="text-sm font-semibold leading-6 ">{player.team_abbr}</p>
        </div>
      </div>
      <div className="absolute bottom-1 right-2 flex items-center gap-2 text-xs text-slate-300">
        <p>
          Last updated: {player.updated_at?.getMonth()}/
          {player.updated_at?.getDate()}/{player.updated_at?.getFullYear()}
        </p>
        <div className="h-1 w-1 rounded-full bg-slate-300" />
        {isStale && (
          <button
            onClick={() => {
              refetch();
            }}
            className="flex items-center gap-1 text-xs text-red-500"
          >
            Refresh <RefreshCw size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerCardDialog;
