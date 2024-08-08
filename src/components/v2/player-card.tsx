import { cn } from ":)/utils";
import { api } from ":)/utils/api";
import { Player } from "@prisma/client";
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

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          className={cn(
            `flex cursor-pointer justify-between rounded bg-slate-500 bg-opacity-10 p-2 py-5 transition-all hover:bg-opacity-25`,
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
            {player.position === "DEF" ? (
              <Image
                src={`https://sleepercdn.com/images/team_logos/nfl/${player.player_id?.toLowerCase()}.png`}
                alt={`${player.first_name} ${player.last_name}`}
                width={50}
                height={50}
                className="h-16 w-16 rounded-full"
                style={{ height: "auto", width: "auto" }}
              />
            ) : (
              <Image
                src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
                alt={`${player.first_name} ${player.last_name}`}
                width={50}
                className="h-16 w-16 rounded-full"
                height={50}
                style={{ height: "auto", width: "auto" }}
              />
            )}
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
