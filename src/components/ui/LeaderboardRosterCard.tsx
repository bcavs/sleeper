/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { api } from ":)/utils/api";
import type { LeagueUserData } from ":)/server/types";
import { ClipboardList } from "lucide-react";
import { Button } from ":)/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from ":)/components/ui/tooltip";

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

  const streak = roster.metadata.streak ?? "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <li key={roster.roster_id} className="my-2 flex flex-col">
      <div className="mb-2 flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-white">
              {roster.settings.wins} - {roster.settings.losses}
            </h2>
            <p
              className={`${
                streak.includes("L") ? "text-red-500" : "text-green-500"
              } text-center text-xs`}
            >
              {roster.metadata.streak}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="whitespace-nowrap text-lg font-bold text-white">
              {userData?.metadata.team_name ?? `Team ${data.username}`}
            </h3>
            <h3 className="text-sm text-slate-400">{data.username}</h3>
            {/* <div className="text-xs text-slate-500">{roster.owner_id}</div> */}
          </div>
        </div>
        <TooltipProvider delayDuration={0} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => {
                  alert("Coming soon");
                }}
                variant={"link"}
              >
                <ClipboardList className="h-6 w-6 text-slate-400 hover:text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="flex flex-col gap-2">
                <p className="whitespace-nowrap text-xs text-slate-500">
                  View Roster
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2">
        <p className="text-xs text-slate-500">
          PF: {roster.settings.fpts}.{roster.settings.fpts_decimal}
        </p>
        <p className="text-xs text-slate-500">
          PA: {roster.settings.fpts_against}.
          {roster.settings.fpts_against_decimal}
        </p>
      </div>
    </li>
  );
};

export default LeaderboardRosterCard;
