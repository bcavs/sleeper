import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

interface RosterPageProps {
  id: string;
}

const RosterPage: NextPage<{ id: string }> = ({ id }) => {
  return (
    <div>
      <h1>Roster Page: {id}</h1>
    </div>
  );
};

export default RosterPage;

export const getServerSideProps: GetServerSideProps<RosterPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  //!!: Remove this once we have real data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Pass data to the page via props
  return { props: { id: id as string } };
};
