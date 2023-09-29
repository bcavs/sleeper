import LeaderboardRosterCard from ":)/components/ui/LeaderboardRosterCard";
import type { LeagueUserData } from ":)/server/types";
import { api } from ":)/utils/api";

export default function PlayerCard(props: { playerId: string }) {
  const { data, isLoading, isError } = api.players.getPlayerById.useQuery({
    player_id: props.playerId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Error</div>;
  }

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">
            {data.first_name} {data.last_name}
          </p>
          {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            leslie.alexander@example.com
          </p> */}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end">
        <p className="text-sm leading-6 text-slate-400">{data.position}</p>
        {/* <p className="mt-1 text-xs leading-5 text-gray-500">{props.playerId}</p> */}
      </div>
    </li>
  );
}
