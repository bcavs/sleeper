import { cn } from ":)/utils";
import { api } from ":)/utils/api";
import { player } from "@prisma/client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ":)/components/ui/dialog";

export default function PlayerCard({ player }: { player: player }) {
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
      <DialogContent className="max-w-lg">
        <PlayerDialogCard player={player} />
      </DialogContent>
    </Dialog>
  );
}

const PlayerDialogCard = ({ player }: { player: player }) => {
  return (
    <div className="flex items-center gap-4">
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
        <h3 className="text-lg font-semibold leading-7 tracking-tight">
          {player.first_name} {player.last_name}
        </h3>
        <p className="text-sm font-semibold leading-6 ">{player.position}</p>
        <p className="text-sm font-semibold leading-6 ">{player.team_abbr}</p>
      </div>
    </div>
  );
};
