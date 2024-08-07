import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ":)/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from ":)/components/ui/chart";

import { PlayerFantasyStatsBody } from ":)/server/types";

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
  stats: [string, PlayerFantasyStatsBody][];
  teamAbbr: string;
}) {
  console.log("FantasyStatsGraph", stats);

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
      fantasyPoints: parseFloat(`${gameStats.fantasyPoints}`),
    };
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Fantasy Points</CardTitle>
          <CardDescription>Last season</CardDescription>
        </CardHeader>
        <CardContent className="overscroll-x-scroll relative w-full bg-blue-700 py-8">
          <ChartContainer config={chartConfig} className="min-w-[100vh]">
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
                tickFormatter={(value) => value.slice(0, 3)}
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
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </>
  );
}
