import type { LeagueRosters, UserData, LeagueData } from ":)/server/types";

export const fetchRosters = async (
  leagueId: string
): Promise<LeagueRosters> => {
  const res = await fetch(
    `https://api.sleeper.app/v1/league/${leagueId}/rosters`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rosters");
  }

  const responseBody: unknown = await res.json();

  if (!Array.isArray(responseBody)) {
    throw new Error("Unexpected response format");
  }

  const rosters = responseBody as LeagueRosters;

  if (!rosters || rosters.length === 0) {
    throw new Error("No rosters found");
  }

  return rosters;
};

export const fetchLeague = async (leagueId: string): Promise<LeagueData> => {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch league");
  }

  const responseBody: unknown = await res.json();

  if (typeof responseBody !== "object") {
    throw new Error("Unexpected response format");
  }

  return responseBody as LeagueData;
};

export const fetchUser = async (userId: string): Promise<UserData> => {
  const res = await fetch(`https://api.sleeper.app/v1/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const responseBody: unknown = await res.json();

  if (typeof responseBody !== "object") {
    throw new Error("Unexpected response format");
  }

  return responseBody as UserData;
};
