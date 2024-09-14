import { Player } from "@prisma/client";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from ":)/utils";
import FantasyStatsDisplay from "./fantasy-stats-display";
import { PlayerWithStats } from "./player-card";

const PlayerCardDialog = ({ player }: PlayerWithStats) => {
  return (
    <div className="flex h-full  flex-col items-center gap-4 overflow-hidden">
      <div className="flex w-full items-center p-4">
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
            <p className="text-sm font-semibold leading-6 ">
              {player.position}
            </p>{" "}
            -
            <p className="text-sm font-semibold leading-6 ">
              {player.team_abbr}
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid h-full w-full grid-cols-1 overflow-hidden">
        <FantasyStatsDisplay player={player} />
      </div>
    </div>
  );
};

export default PlayerCardDialog;
