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

export const fetchLeagueUsers = async (
  leagueId: string
): Promise<UserData[]> => {
  const res = await fetch(
    `https://api.sleeper.app/v1/league/${leagueId}/users`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch league users");
  }

  const responseBody: unknown = await res.json();

  if (!Array.isArray(responseBody)) {
    throw new Error("Unexpected response format");
  }

  const users = responseBody as UserData[];

  if (!users || users.length === 0) {
    throw new Error("No users found");
  }

  return users;
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
