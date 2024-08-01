"use client";
// Import your Client Component
// import HomePage from "./home-page";
import { api } from ":)/utils/api";

export default function Page({
  leagueId,
  id,
}: {
  leagueId: string;
  id: string;
}) {
  // Fetch data directly in a Server Component
  //   const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  //   return <HomePage recentPosts={recentPosts} />;
  const {
    data: userData,
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
  } = api.sleeper.getUser.useQuery({
    userId: id,
  });

  console.log("userData: ", userData);
  return (
    <div>
      <p>Page</p>
    </div>
  );
}
