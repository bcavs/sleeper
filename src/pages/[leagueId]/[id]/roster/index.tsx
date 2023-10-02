import PlayerCard from ":)/components/ui/PlayerCard";
import { api } from ":)/utils/api";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

interface RosterPageProps {
  id: string;
  leagueId: string;
}

const RosterPage: NextPage<{ id: string; leagueId: string }> = ({
  id,
  leagueId,
}) => {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
  } = api.sleeper.getUser.useQuery({
    userId: id,
  });

  const {
    data: allRosters,
    isLoading: isLoadingAllRosters,
    isError: isErrorAllRosters,
  } = api.sleeper.getRosters.useQuery({
    leagueId: leagueId,
  });

  const {
    data: leagueData,
    isLoading: isLoadingLeagueData,
    isError: isErrorLeagueData,
  } = api.sleeper.getLeagueUsers.useQuery({
    leagueId: leagueId,
  });

  console.log("userData: ", userData);
  console.log("allRosters: ", allRosters);
  console.log("leagueData: ", leagueData);

  const pageRoster = allRosters?.find((roster) => roster.owner_id === id);
  const pageUserData = leagueData?.find(
    (roster) => roster?.user_id === pageRoster?.owner_id
  );
  return (
    <main className="flex min-h-screen flex-col bg-slate-800 p-6">
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          {pageUserData?.metadata.team_name ?? `Team ${userData?.username}`}
        </h1>
        <h4 className="text-sm text-slate-500">{userData?.username}</h4>
      </section>
      <ul
        role="list"
        className="flex w-full max-w-2xl flex-grow flex-col divide-y divide-slate-600"
      >
        {pageRoster?.players.map((player) => {
          return <PlayerCard key={player} playerId={player} />;
        })}
      </ul>
    </main>
  );
};

export default RosterPage;

export const getServerSideProps: GetServerSideProps<RosterPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id, leagueId } = context.query;

  // empty await to prevent error
  await Promise.resolve();

  // Pass data to the page via props
  return { props: { id: id as string, leagueId: leagueId as string } };
};
