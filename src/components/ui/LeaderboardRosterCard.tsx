import React from "react";
import { Button } from "./button";
import { api } from ":)/utils/api";

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
  };
}

const LeaderboardRosterCard: React.FC<Props> = (props) => {
  const { roster } = props;

  // fetch the user data for the owner of the roster
  const { data, isLoading, isError } = api.sleeper.getUser.useQuery({
    userId: roster.owner_id,
  });

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
    <li key={roster.roster_id} className="flex flex-col">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-white">
              {roster.settings.wins} - {roster.settings.losses}
            </h2>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">{data.username}</h3>
            {/* <div className="text-xs text-slate-500">{roster.owner_id}</div> */}
          </div>
        </div>
        <Button
          className="bg-slate-500 text-white hover:bg-slate-600"
          onClick={() => {
            alert("Coming soon");
          }}
        >
          View Roster
        </Button>
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
