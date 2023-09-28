import { UserData } from ":)/server/types";
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
  const { data, isLoading, isError } = api.sleeper.getUser.useQuery({
    userId: id,
  });

  const {
    data: allRosters,
    isLoading: isLoadingAllRosters,
    isError: isErrorAllRosters,
  } = api.sleeper.getRosters.useQuery({
    leagueId: leagueId,
  });

  console.log(data);
  console.log(allRosters);

  const pageRoster = allRosters?.find((roster) => roster.owner_id === id);

  console.log(pageRoster);

  return (
    <div>
      <h1>
        Roster Page: {id} {leagueId}
      </h1>
      <ul>
        {pageRoster?.players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
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
