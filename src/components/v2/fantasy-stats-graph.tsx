import { PlayerFantasyStatsBody } from ":)/server/types";

export default function FantasyStatsGraph({
  stats,
}: {
  stats: [string, PlayerFantasyStatsBody][];
}) {
  console.log("FantasyStatsGraph", stats);
  return (
    <div className="flex rounded bg-slate-100 px-4 py-6">
      <p>Fantasy Stats Graph</p>
    </div>
  );
}
