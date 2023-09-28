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
  id?: string;
  player_id?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  search_full_name?: string | null;
  search_first_name?: string | null;
  search_last_name?: string | null;
  hashtag?: string | null;
  sport?: string | null;
  age?: number | null;
  birth_date?: string | null;
  birth_country?: string | null;
  birth_state?: string | null;
  birth_city?: string | null;
  high_school?: string | null;
  college?: string | null;
  height?: string | null;
  weight?: string | null;
  years_exp?: number | null;
  depth_chart_order?: number | null;
  depth_chart_position?: string | null;
  team?: string | null;
  position?: string | null;
  fantasy_data_id?: number | null;
  injury_status?: string | null;
  injury_start_date?: string | null;
  injury_notes?: string | null;
  sportradar_id?: string | null;
  rotoworld_id?: number | null;
  oddsjam_id?: string | null;
  gsis_id?: string | null;
  pandascore_id?: string | null;
  status?: string | null;
  practice_participation?: string | null;
  practice_description?: string | null;
  active?: boolean | null;
  number?: number | null;
  search_rank?: number | null;
  injury_body_part?: string | null;
  stats_id?: number | null;
  rotowire_id?: number | null;
  fantasy_positions?: string[] | null;
  yahoo_id?: number | null;
  espn_id?: number | null;
  news_updated?: number | null;
  swish_id?: number | null;
  metadata?: string | null;
};
