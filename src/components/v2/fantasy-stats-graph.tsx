import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
  yAxisDomain = [0, 55], // Default domain for y-axis
}: {
  stats: [string, PlayerGameStats][];
  teamAbbr: string;
  yAxisDomain?: [number, number]; // Accept domain as prop
}) {
  const chartData = stats.map((game) => {
    const gameId = game[0];
    const gameStats = game[1];

    const matchup = gameId.split("_")[1];
    const teams = matchup?.split("@");
    const opponent = teams?.find((team) => team !== teamAbbr);

    const date = gameId.split("_")[0];
    const year = date?.slice(0, 4);
    const month = date?.slice(4, 6);
    const day = date?.slice(6, 8);

    const formattedDate = `${year}-${month}-${day}`;

    if (!gameStats) {
      return {
        opponent,
        date: formattedDate,
        fantasyPoints: 0,
      };
    }

    return {
      opponent,
      date: formattedDate,
      fantasyPoints: parseFloat(gameStats.fantasyPoints),
    };
  });

  // Sort by ascending date
  chartData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <CardTitle>Fantasy Points</CardTitle>
      <CardDescription>Last season</CardDescription>
      <ChartContainer config={chartConfig} className="my-6">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={
            {
              // left: 12,
              // right: 12,
            }
          }
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="opponent"
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            tickFormatter={(_, index) => index.toString()}
          />
          <YAxis domain={yAxisDomain} /> {/* Add YAxis with fixed domain */}
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="fantasyPoints"
            type="linear"
            stroke="var(--color-fantasyPoints)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
