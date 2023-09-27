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
  metadata: {
    streak: string | null;
    record: string | null;
  };
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

export type LeagueUserData = {
  user_id: string;
  settings: any;
  metadata: {
    team_name: string | null;
    mention_pn: "on" | "off" | null;
    avatar: string | null;
    allow_sms: "on" | "off" | null;
    allow_pn: "on" | "off" | null;
  };
  league_id: string;
  is_owner: boolean | null;
  is_bot: boolean | null;
  display_name: string | null;
  avatar: string | null;
} | null;

export type PlayerData = {
  hashtag: string;
  depth_chart_position: number;
  status: string;
  sport: string;
  fantasy_positions: string[];
  number: number;
  search_last_name: string;
  injury_start_date: null | string;
  weight: string;
  position: string;
  practice_participation: null | string;
  sportradar_id: string;
  team: string;
  last_name: string;
  college: string;
  fantasy_data_id: number;
  injury_status: null | string;
  player_id: string;
  height: string;
  search_full_name: string;
  age: number;
  stats_id: string;
  birth_country: string;
  espn_id: string;
  search_rank: number;
  first_name: string;
  depth_chart_order: number;
  years_exp: number;
  rotowire_id: null | string;
  rotoworld_id: number | null;
  search_first_name: string;
  yahoo_id: null | string;
};
