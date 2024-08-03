import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { leagues } from ":)/utils/config";
import ScoringSettingsDialog from "./scoring-settings-dialog";
const teamsData = [
  {
    title: "Top Dawgs",
    members: [
      { name: "Deebo", icon: <Minus size={24} />, description: "Champion" },
      { name: "John", icon: <Minus size={24} />, description: "Runner up" },
      {
        name: "Owen",
        icon: <Minus size={24} />,
        description: "Best remaining regular season record",
      },
      {
        name: "Kyle",
        icon: <Minus size={24} />,
        description: "Next best remaining regular season record",
      },
      {
        name: "Berg",
        icon: <ArrowDown size={24} className="text-red-500" />,
        description: "5th Place",
      },
      {
        name: "Brooks",
        icon: <ArrowDown size={24} className="text-red-500" />,
        description: "6th Place",
      },
      {
        name: "Ben",
        icon: <ArrowDown size={24} className="text-red-500" />,
        description: "7th Place",
      },
      {
        name: "Tonner",
        icon: <ArrowDown size={24} className="text-red-500" />,
        description: "8th Place",
      },
    ],
  },
  {
    title: "Underdawgs",
    members: [
      {
        name: "Drake",
        icon: <ArrowUp size={24} className="text-green-500" />,
        description: "Champion",
      },
      {
        name: "Christmas",
        icon: <ArrowUp size={24} className="text-green-500" />,
        description: "Runner up",
      },
      {
        name: "Justin",
        icon: <ArrowUp size={24} className="text-green-500" />,
        description: "Best remaining regular season record",
      },
      {
        name: "Keenan",
        icon: <ArrowUp size={24} className="text-green-500" />,
        description: "Next best remaining regular season record",
      },
      { name: "Layne", icon: <Minus size={24} />, description: "5th Place" },
      { name: "Ford", icon: <Minus size={24} />, description: "6th Place" },
      { name: "Hubble", icon: <Minus size={24} />, description: "7th Place" },
      { name: "Moll", icon: <Minus size={24} />, description: "8th Place" },
    ],
  },
];

const LeagueRules = () => (
  <div className="mt-24 self-start text-white">
    <p className="mb-4 text-[28px] font-light">General Rules:</p>

    <div className="flex flex-col items-start gap-10">
      <ScoringSettingsDialog leagues={leagues} />
      <div className="flex flex-col gap-2">
        <p className="font-bold">
          Promotions and Relegations are based on a combination of regular
          season record and playoffs.
        </p>
        <div className="pl-8">
          <p>
            1. If you make it to the championship in either league, you are
            guaranteed a spot in the top league.
          </p>
          <p>
            2. The next two promotion spots are determined by the highest two
            regular season records. Tie breakers are settled by standings
            provided by the Sleeper App
          </p>
          <p>
            3. The 4 teams with the lowest regular season records from the top
            league will be relegated.
          </p>
        </div>
        <PromotionRelegationGraphic />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">League Fees & Payouts:</p>
        <div className="pl-8">
          <p>$100 buy in per team.</p>
          <p>
            Bottom league sends 10% ($80) of their prize pot to the top league,
            which gets paid to the champion.
          </p>
          <LeaguePayoutsGraphic />
        </div>
      </div>
    </div>
  </div>
);

export default LeagueRules;

const PromotionRelegationGraphic = () => (
  <div className="flex w-full flex-col gap-4 pl-8">
    {teamsData.map((team, index) => (
      <div key={team.title + index}>
        <p className="font-bold underline">{team.title}</p>
        {team.members.map((member, index) => (
          <div className="flex gap-2" key={member.name + index}>
            {member.icon}
            <p className="flex" key={index}>
              ({member.name})
            </p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const LeaguePayoutsGraphic = () => (
  <div className="mt-4 flex w-full flex-col gap-4">
    <div>
      <p className="font-bold underline">Top League</p>
      <div className="flex gap-2">
        <p>1st Place:</p>
        <p>$720</p>
      </div>
      <div className="flex gap-2">
        <p>2nd Place</p>
        <p>$160</p>
      </div>
    </div>
    <div>
      <p className="font-bold underline">Bottom League</p>
      <div className="flex gap-2">
        <p>1st Place</p>
        <p>$600</p>
      </div>
      <div className="flex gap-2">
        <p>2nd Place</p>
        <p>$120</p>
      </div>
    </div>
  </div>
);
