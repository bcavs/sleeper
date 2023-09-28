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
  // Basic player information
  player_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  search_full_name: string;
  search_first_name: string;
  search_last_name: string;
  hashtag: string;
  sport: string;

  // Player bio
  age: number;
  birth_date: string;
  birth_country: string;
  birth_state: null | string;
  birth_city: null | string;
  high_school: string;
  college: string;

  // Player physical attributes
  height: string;
  weight: string;

  // Player career information
  years_exp: number;
  depth_chart_order: number;
  depth_chart_position: number;
  team: string;
  position: string;

  // Fantasy-related data
  fantasy_positions: string[];
  fantasy_data_id: number;

  // Injury-related data
  injury_status: null | string;
  injury_start_date: null | string;
  injury_notes: null | string;

  // Player statistics and IDs
  stats_id: string;
  espn_id: string;
  sportradar_id: string;
  rotowire_id: null | string;
  rotoworld_id: number | null;
  yahoo_id: null | string;
  oddsjam_id: null | string;
  gsis_id: null | string;
  pandascore_id: null | string;

  // Player status and participation
  status: string;
  practice_participation: null | string;
  practice_description: null | string;
  active: boolean;

  // Miscellaneous data
  number: number;
  search_rank: number;
  news_updated: null | string;
  metadata: null | string;
};
