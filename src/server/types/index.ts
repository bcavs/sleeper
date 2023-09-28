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
  id?: string | null;
  // Basic player information
  player_id?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  search_full_name?: string | null;
  search_first_name?: string | null;
  search_last_name?: string | null;
  hashtag?: string | null;
  sport?: string | null;

  // Player bio
  age?: number | null;
  birth_date?: string | null;
  birth_country?: string | null;
  birth_state?: string | null;
  birth_city?: string | null;
  high_school?: string | null;
  college?: string | null;

  // Player physical attributes
  height?: string | null;
  weight?: string | null;

  // Player career information
  years_exp?: number | null;
  depth_chart_order?: number | null;
  depth_chart_position?: number | null;
  team?: string | null;
  position?: string | null;

  // Fantasy-related data
  fantasy_positions?: string[] | null;
  fantasy_data_id?: number | null;

  // Injury-related data
  injury_status?: string | null;
  injury_start_date?: string | null;
  injury_notes?: string | null;

  // Player statistics and IDs
  stats_id?: string | null;
  espn_id?: string | null;
  sportradar_id?: string | null;
  rotowire_id?: string | null;
  rotoworld_id?: number | null;
  yahoo_id?: string | null;
  oddsjam_id?: string | null;
  gsis_id?: string | null;
  pandascore_id?: string | null;

  // Player status and participation
  status?: string | null;
  practice_participation?: string | null;
  practice_description?: string | null;
  active?: boolean | null;

  // Miscellaneous data
  number?: number | null;
  search_rank?: number | null;
  news_updated?: string | null;
  metadata?: string | null;
};
