import { cn } from ":)/utils";
import { api } from ":)/utils/api";
import { Player, PlayerStatline } from "@prisma/client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ":)/components/ui/dialog";
import PlayerCardDialog from ":)/components/v2/player-card-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState, useEffect } from "react";

export interface PlayerWithStats {
  // make the player prop ben the Player with PlayerStatline
  player: Player & { PlayerStatline: PlayerStatline[] };
}

interface PlayerCardProps extends PlayerWithStats {
  fantasy_points: number;
}

export default function PlayerCard({
  player,
  fantasy_points,
}: PlayerCardProps) {
  const [isStale, setIsStale] = useState(false);
  const ctx = api.useContext();

  const { mutate: syncPlayerData } =
    api.players.syncPlayerFantasyStatsById.useMutation({
      onSuccess: () => {
        console.log("🌟 Player data synced.");
        setIsStale(false);
        void ctx.players.getRosterPlayers.invalidate();
      },
      onError: (error) => {
        console.log("Failed to sync player data:", error);
      },
    });

  useEffect(() => {
    if (player.updated_at) {
      const updated = new Date(player.updated_at);
      const today = new Date();
      const diff = today.getTime() - updated.getTime();
      const days = diff / (1000 * 60 * 60 * 24);

      if (days > 2 && !isStale) {
        console.log(
          `Warning: Player data: ${player.full_name} is more than 2 days old.`
        );
        setIsStale(true);
      }
    }
  }, [player.updated_at, isStale]);

  // Trigger data sync only when `isStale` becomes `true`
  useEffect(() => {
    if (isStale) {
      // TODO: Figure out defense player_id syncing
      if (player.position === "DEF") {
        return;
      }
      syncPlayerData({
        player_id: player.player_id,
        espn_id: player.espn_id ?? 0,
      });
    }
  }, [isStale, syncPlayerData, player.player_id, player.espn_id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          className={cn(
            `flex cursor-pointer justify-between rounded bg-slate-500 bg-opacity-10 py-5 pl-2 pr-8 transition-all hover:bg-opacity-25`,
            {
              "bg-red-500": player.position === "QB",
              "bg-blue-500": player.position === "WR",
              "bg-green-500": player.position === "RB",
              "bg-orange-500": player.position === "TE",
              "bg-purple-500": player.position === "K",
              "bg-amber-900": player.position === "DEF",
            }
          )}
        >
          <div className="flex items-center gap-x-6">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full md:h-16 md:w-16 ">
              {player.position === "DEF" ? (
                <Image
                  src={`https://sleepercdn.com/images/team_logos/nfl/${player.player_id?.toLowerCase()}.png`}
                  alt={`${player.first_name} ${player.last_name}`}
                  width={50}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
                  alt={`${player.first_name} ${player.last_name}`}
                  width={50}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                />
              )}
            </div>
            <div>
              <h3
                className={cn(
                  "text-base font-semibold leading-7 tracking-tight text-slate-100"
                )}
              >
                {player.first_name} {player.last_name}
              </h3>

              <p
                className={cn(
                  "text-sm font-semibold leading-6 text-slate-500",
                  {
                    "text-red-500": player.position === "QB",
                    "text-blue-500": player.position === "WR",
                    "text-green-500": player.position === "RB",
                    "text-orange-500": player.position === "TE",
                    "text-purple-500": player.position === "K",
                    "text-amber-900": player.position === "DEF",
                  }
                )}
              >
                {player.position}
              </p>
            </div>
          </div>
          <div className="space-y-1 text-center">
            <p className={cn("text-[12px] text-slate-300")}>
              <span className="hidden md:block">Fantasy Points</span>
              <span className="md:hidden">FPTS</span>
            </p>
            <p className={cn("text-[18px] text-white")}>{fantasy_points}</p>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-scroll p-0">
        <DialogHeader>
          {/* This VisuallyHidden section is needed for the Dialog to work properly */}
          <VisuallyHidden.Root>
            <DialogTitle>{player.full_name}</DialogTitle>
            <DialogDescription>
              {player.full_name}&apos;s Statsheet
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <PlayerCardDialog player={player} />
      </DialogContent>
    </Dialog>
  );
}
