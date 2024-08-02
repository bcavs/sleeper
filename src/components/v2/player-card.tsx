import { api } from ":)/utils/api";
import { Player } from "@prisma/client";
import Image from "next/image";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            leslie.alexander@example.com
          </p> */}
          {/* <p className="text-sm font-semibold leading-6 text-white">
            {player.first_name} {player.last_name}
          </p> */}

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
              <h3 className="text-base font-semibold leading-7 tracking-tight text-slate-100">
                {player.first_name} {player.last_name}
              </h3>
              <p className="text-sm font-semibold leading-6 text-slate-500">
                {player.position}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end"></div>
    </li>
  );
}
