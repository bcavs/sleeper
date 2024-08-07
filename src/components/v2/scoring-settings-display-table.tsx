import { ScoringSettings as ScoringSettingsType } from ":)/server/types";
import { cn } from ":)/utils";
import { api } from ":)/utils/api";

export default function ScoringSettingsDisplayTable({
  leagueId,
}: {
  leagueId: string;
}) {
  const {
    data: leagueData,
    isLoading: leagueDataIsLoading,
    isError: leagueDataIsError,
  } = api.sleeper.getLeague.useQuery({
    leagueId,
  });

  if (leagueDataIsLoading) {
    return <div>Loading...</div>;
  }

  if (leagueDataIsError) {
    return <div>Error</div>;
  }

  // sort the scoring settings by alphabetical order of the name of the setting
  // then map over the sorted array and return a list item for each setting
  // with the name of the setting and the value of the setting
  // if no name is found, return the setting key and add a text-red-400 class to it

  const sortedScoringSettings = Object.entries(leagueData.scoring_settings)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value], index) => {
      const name = scoringSettingsNames[key as keyof ScoringSettingsType];
      return (
        <li
          key={key}
          className={cn(
            `flex w-full gap-4 p-2 ${!name && "text-red-400"} ${
              index % 2 === 0 ? "bg-slate-100" : ""
            }`
          )}
        >
          <span className="w-full">{name ? name : key}:</span>{" "}
          <span>{value}</span>
        </li>
      );
    });

  return (
    <div className="grid grid-cols-1">
      <h4 className="mb-4 text-[18px] font-bold">{leagueData.name}:</h4>
      {sortedScoringSettings}
    </div>
  );
}

const scoringSettingsNames: { [key in keyof ScoringSettingsType]: string } = {
  blk_kick: "Blocked kick",
  def_st_ff: "Defensive special teams forced fumble",
  def_st_fum_rec: "Defensive special teams fumble recovery",
  def_st_td: "Defensive special teams touchdown",
  def_td: "Defensive touchdown",
  ff: "Forced fumble",
  fgmiss: "Field goal missed",
  fgm_0_19: "Field goal made (0-19 yards)",
  fgm_20_29: "Field goal made (20-29 yards)",
  fgm_30_39: "Field goal made (30-39 yards)",
  fgm_40_49: "Field goal made (40-49 yards)",
  fgm_50p: "Field goal made (50+ yards)",
  fum: "Fumble",
  fum_lost: "Fumble lost",
  fum_rec: "Fumble recovery",
  fum_rec_td: "Fumble recovery touchdown",
  int: "Interception",
  pass_2pt: "Passing two-point conversion",
  pass_int: "Interception thrown",
  pass_int_td: "Pick 6 Thrown",
  pass_td: "Passing touchdown",
  pass_td_50p: "50+ Yard Pass TD Bonus",
  pass_yd: "Passing yard",
  pts_allow_0: "Points allowed (0)",
  pts_allow_1_6: "Points allowed (1-6)",
  pts_allow_14_20: "Points allowed (14-20)",
  pts_allow_21_27: "Points allowed (21-27)",
  pts_allow_28_34: "Points allowed (28-34)",
  pts_allow_35p: "Points allowed (35+)",
  pts_allow_7_13: "Points allowed (7-13)",
  rec: "Reception",
  rec_2pt: "Receiving two-point conversion",
  rec_td: "Receiving touchdown",
  rec_yd: "Receiving yard",
  rush_2pt: "Rushing two-point conversion",
  rush_td: "Rushing touchdown",
  rush_yd: "Rushing yard",
  sack: "Sack",
  safe: "Safety",
  st_ff: "Special teams forced fumble",
  st_fum_rec: "Special teams fumble recovery",
  st_td: "Special teams touchdown",
  xpm: "Extra point made",
  xpmiss: "Extra point missed",
};
