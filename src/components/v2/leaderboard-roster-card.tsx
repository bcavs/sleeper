/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { api } from ":)/utils/api";
import type { LeagueUserData } from ":)/server/types";
import { ClipboardList } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ":)/components/ui/tooltip";
import Link from "next/link";
import { Skeleton } from ":)/components/ui/skeleton";

interface Props {
  // Define component props here
  roster: {
    starters: string[];
    settings: {
      wins: number;
      waiver_position: number;
      waiver_budget_used: number;
      total_moves: number;
      ties: number;
      losses: number;
      fpts_decimal: number;
      fpts_against_decimal: number;
      fpts_against: number;
      fpts: number;
    };
    roster_id: number;
    reserve: string[];
    players: string[];
    owner_id: string;
    league_id: string;
    metadata: {
      streak: string | null;
      record: string | null;
    };
  };
  userData: LeagueUserData;
}

const LeaderboardRosterCard: React.FC<Props> = (props) => {
  const { roster, userData } = props;

  // fetch the user data for the owner of the roster
  const { data, isLoading, isError } = api.sleeper.getUser.useQuery({
    userId: roster.owner_id,
  });

  const streak = roster?.metadata?.streak ?? "";

  if (isLoading) {
    return <RosterLoader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <li key={roster.roster_id} className="my-2 flex flex-col">
      <div className="flex flex-row justify-between gap-4 md:mb-2">
        <div className="flex flex-row items-center md:gap-4">
          <div className="flex flex-col">
            <h2 className="hidden whitespace-nowrap text-xs font-bold text-white md:block">
              {roster.settings.wins} - {roster.settings.losses}
            </h2>
            <p
              className={`${
                streak.includes("L") ? "text-red-500" : "text-green-500"
              } hidden text-center text-xs md:block`}
            >
              {roster?.metadata?.streak}
            </p>
          </div>
          <div className="flex flex-col">
            <Link href={`${roster.league_id}/${roster.owner_id}/roster`}>
              <h3 className="whitespace-nowrap text-sm font-bold text-white hover:text-orange-400 md:text-lg">
                {userData?.metadata.team_name ?? `Team ${data.username}`}
              </h3>
            </Link>
            <h3 className="hidden text-sm text-slate-400 md:block">
              {data.username}
            </h3>
            {/* <div className="text-xs text-slate-500">{roster.owner_id}</div> */}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className="whitespace-nowrap text-xs font-bold text-white md:hidden">
          {roster.settings.wins} - {roster.settings.losses}
        </h2>
        {roster.settings.fpts > 0 && (
          <p className="hidden text-xs text-slate-500 md:block">
            PF: {roster.settings.fpts}.{roster.settings.fpts_decimal}
          </p>
        )}
        {roster.settings.fpts_against > 0 && (
          <p className="hidden text-xs text-slate-500 md:block">
            PA: {roster.settings.fpts_against}.
            {roster.settings.fpts_against_decimal}
          </p>
        )}
      </div>
    </li>
  );
};

export default LeaderboardRosterCard;

export const RosterLoader = () => (
  <li className="my-2 flex flex-col">
    <div className="mb-2 flex flex-row justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <Skeleton className="h-4 w-20" /> {/* Skeleton for wins-losses */}
          <Skeleton className="mt-2 h-3 w-10" /> {/* Skeleton for streak */}
        </div>
        <div className="flex flex-col">
          <Skeleton className="h-6 w-40" /> {/* Skeleton for team name */}
          <Skeleton className="mt-2 h-4 w-24" /> {/* Skeleton for username */}
        </div>
      </div>
    </div>
    <div className="flex gap-4">
      <Skeleton className="h-4 w-20" /> {/* Skeleton for PF */}
      <Skeleton className="h-4 w-20" /> {/* Skeleton for PA */}
    </div>
  </li>
);
