import type {
  LeagueRosters,
  UserData,
  LeagueData,
  LeagueUserData,
  PlayerFantasyStatsResponse,
} from ":)/server/types";

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
): Promise<LeagueUserData[]> => {
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

  const users = responseBody as LeagueUserData[];

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

export const fetchPlayerFantasyStats = async ({
  playerEspnId,
}: {
  playerEspnId: number;
}) => {
  const scoringSettings = {
    twoPointConversions: "2",
    passYards: ".04",
    passTD: "4",
    passInterceptions: "-1",
    pointsPerReception: "1",
    carries: ".2",
    rushYards: ".1",
    rushTD: "6",
    fumbles: "-2",
    receivingYards: ".1",
    receivingTD: "6",
    targets: "0",
    defTD: "6",
    xpMade: "1",
    xpMissed: "-1",
    fgMade: "3",
    fgMissed: "-1",
  };

  const scoringSettingsQueryString = Object.entries(scoringSettings)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const season = "2024";
  const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForPlayer?playerID=${playerEspnId}&season=${season}&fantasyPoints=true&${scoringSettingsQueryString}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY ?? "",
      "x-rapidapi-host":
        "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const responseBody: unknown = await res.json();

  if (typeof responseBody !== "object") {
    throw new Error("Unexpected response format");
  }

  return responseBody as PlayerFantasyStatsResponse;
};
