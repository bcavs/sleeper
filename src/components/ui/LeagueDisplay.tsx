import LeaderboardRosterCard from ":)/components/ui/LeaderboardRosterCard";
import { api } from ":)/utils/api";

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

  if (isLoading || leagueIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || leagueIsError) {
    return <div>Error</div>;
  }

  console.log("leagueData: ", leagueData);

  // sort the order of the rosters by the owners amount of wins
  const sortedRosters = data.sort((a, b) => {
    // if the wins are the same, sort by points for
    if (a.settings.wins === b.settings.wins) {
      return b.settings.fpts - a.settings.fpts;
    }

    // otherwise, sort by wins
    return b.settings.wins - a.settings.wins;
  });

  console.log("sortedRosters: ", sortedRosters);
  return (
    <>
      <section className="flex w-full flex-col">
        <h3 className="pb-6 text-4xl font-bold text-white">
          {leagueData.name}
        </h3>
        <ul className="flex w-full flex-col gap-4">
          {sortedRosters.map((roster) => {
            return (
              <LeaderboardRosterCard key={roster.roster_id} roster={roster} />
            );
          })}
        </ul>
      </section>
    </>
  );
}