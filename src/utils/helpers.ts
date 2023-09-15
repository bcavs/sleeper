import type { LeagueRosters } from ":)/server/types";

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

export const fetchLeague = async (leagueId: string) => {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch league");
  }

  const responseBody: unknown = await res.json();

  if (typeof responseBody !== "object") {
    throw new Error("Unexpected response format");
  }

  return responseBody;
};

export const fetchUser = async (userId: string) => {
  const res = await fetch(`https://api.sleeper.app/v1/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const responseBody: unknown = await res.json();

  if (typeof responseBody !== "object") {
    throw new Error("Unexpected response format");
  }

  return responseBody;
};
