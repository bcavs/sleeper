import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { CardDescription, CardTitle } from ":)/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from ":)/components/ui/chart";
import { PlayerGameStats } from ":)/server/types";

const chartConfig = {
  fantasyPoints: {
    label: "Fantasy Points",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function FantasyStatsGraph({
  stats,
  teamAbbr,
}: {
  stats: [string, PlayerGameStats][];
  teamAbbr: string;
}) {
  const chartData = stats.map((game) => {
    const gameId = game[0];
    const gameStats = game[1];

    const matchup = gameId.split("_")[1];
    const teams = matchup?.split("@");
    const opponent = teams?.find((team) => team !== teamAbbr);

    if (!gameStats) {
      return {
        opponent,
        fantasyPoints: 0,
      };
    }

    return {
      opponent,
      fantasyPoints: parseFloat(gameStats.fantasyPoints),
    };
  });

  return (
    <>
      <CardTitle>Fantasy Points</CardTitle>
      <CardDescription>Last season</CardDescription>
      <ChartContainer config={chartConfig} className="my-6">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="opponent"
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            tickFormatter={(_, index) => index.toString()}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="fantasyPoints"
            type="natural"
            stroke="var(--color-fantasyPoints)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
