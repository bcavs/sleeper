/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the LeagueRosters type as an array of objects
export type LeagueRosters = {
  starters: string[];
  settings: {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    total_moves: number;
    ties: number;
    losses: number;
    fpts_decimal: number;
    fpts_against_decimal: number;
    fpts_against: number;
    fpts: number;
  };
  roster_id: number;
  reserve: string[];
  players: string[];
  owner_id: string;
  league_id: string;
}[];

// Define the UserData type as an object
export type UserData = {
  username: string;
  user_id: string;
  display_name: string;
  avatar: string;
};

export type LeagueData = {
  total_rosters: number;
  status: string;
  sport: string;
  settings: any;
  season_type: string;
  season: string;
  scoring_settings: any;
  roster_positions: any[];
  previous_league_id: string;
  name: string;
  league_id: string;
  draft_id: string;
  avatar: string;
};
