import LeaderboardRosterCard from ":)/components/ui/LeaderboardRosterCard";
import type { LeagueUserData } from ":)/server/types";
import { api } from ":)/utils/api";
import ScoringSettingsTable from ":)/components/v2/scoring-settings-table";

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
    return <div>Loading...</div>;
  }

  if (isError || leagueIsError || leagueUsersIsError) {
    return <div>Error</div>;
  }

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

  const getUserData = (userId: string) => {
    const userData = leagueUsers.find((user) => {
      return user?.user_id === userId;
    });

    const user = userData as LeagueUserData;

    return user;
  };

  return (
    <>
      <section className="flex w-full flex-col">
        <h3 className="pb-6 text-2xl font-bold text-indigo-400">
          {leagueData.name}
        </h3>
        <ul className="flex w-full flex-col gap-4">
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
        <section className="mt-16">
          <ScoringSettingsTable
            leagueScoringSettings={leagueData.scoring_settings}
          />
        </section>
      </section>
    </>
  );
}
