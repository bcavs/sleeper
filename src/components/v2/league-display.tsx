import LeaderboardRosterCard, {
  RosterLoader,
} from ":)/components/v2/leaderboard-roster-card";
import type { LeagueUserData } from ":)/server/types";
import { api } from ":)/utils/api";
import { Skeleton } from ":)/components/ui/skeleton";
import Link from "next/link";

export default function LeagueDisplay(props: { leagueId: string }) {
  const { leagueId } = props;
  const { data, isLoading, isError } = api.sleeper.getRosters.useQuery({
    leagueId,
  });

  const {
    data: leagueData,
    isLoading: leagueIsLoading,
    isError: leagueIsError,
  } = api.sleeper.getLeague.useQuery({
    leagueId,
  });

  const {
    data: leagueUsers,
    isLoading: leagueUsersIsLoading,
    isError: leagueUsersIsError,
  } = api.sleeper.getLeagueUsers.useQuery({
    leagueId,
  });

  if (isLoading || leagueIsLoading || leagueUsersIsLoading) {
    return <SectionLoader />;
  }

  if (isError || leagueIsError || leagueUsersIsError) {
    return <div>Error</div>;
  }

  const getUserData = (userId: string) => {
    const userData = leagueUsers.find((user) => {
      return user?.user_id === userId;
    });

    const user = userData as LeagueUserData;

    return user;
  };

  // sort the order of the rosters by the owners' amount of wins
  const sortedRosters = data.sort((a, b) => {
    // if the wins are the same, sort by points for
    if (a.settings?.wins === b.settings?.wins) {
      return (
        b.settings?.fpts +
        b.settings?.fpts_decimal -
        (a.settings?.fpts + a.settings?.fpts_decimal)
      );
    }

    // otherwise, sort by wins
    return b.settings?.wins - a.settings?.wins;
  });

  return (
    <>
      <section className="flex w-full flex-col">
        <Link href={`/${leagueData.league_id}`}>
          <h3 className="pb-2 font-bold text-indigo-400 md:pb-6 md:text-2xl">
            {leagueData.name}
          </h3>
        </Link>
        <ul className="flex w-full flex-col md:gap-4">
          {sortedRosters.map((roster) => {
            return (
              <LeaderboardRosterCard
                key={roster.roster_id}
                roster={roster}
                userData={getUserData(roster.owner_id)}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

const SectionLoader = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-4 w-20 bg-indigo-400 pb-6" />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
      <RosterLoader />
    </div>
  );
};
