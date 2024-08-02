import PlayerCard from ":)/components/v2/player-card";
import { api } from ":)/utils/api";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";

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

  const pageRoster = allRosters?.find((roster) => roster.owner_id === id);
  const pageUserData = leagueData?.find(
    (roster) => roster?.user_id === pageRoster?.owner_id
  );

  const {
    data: rosterPlayers,
    isLoading: isLoadingRosterPlayers,
    isError: isErrorRosterPlayers,
  } = api.players.getRosterPlayers.useQuery(
    {
      player_ids: pageRoster?.players ?? [],
    },
    {
      enabled: !!pageRoster?.players,
    }
  );

  // sort the players by position
  // Order them in this order: QB, WR, RB, TE, K, DEF
  const sortedPlayers = rosterPlayers?.sort((a, b) => {
    const positions = ["QB", "WR", "RB", "TE", "K", "DEF"];
    return (
      positions.indexOf(a.position ?? "") - positions.indexOf(b.position ?? "")
    );
  });

  return (
    <>
      <Head>
        <title>
          {`${pageUserData?.metadata.team_name ?? `Team ${userData?.username}`}
          &apos;s Roster`}
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col overflow-hidden bg-slate-800 ">
        <div className="container">
          <section className="my-6">
            <h1 className="text-4xl font-bold text-white">
              {pageUserData?.metadata.team_name ?? `Team ${userData?.username}`}
            </h1>
            <h4 className="text-sm text-slate-500">{userData?.username}</h4>
          </section>
          <ul
            role="list"
            className="flex w-full flex-grow flex-col divide-y divide-slate-600"
          >
            {sortedPlayers?.map((player) => {
              return <PlayerCard key={player.player_id} player={player} />;
            })}
          </ul>
        </div>
      </main>
    </>
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
