import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const generateData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      time: `${hour}:00`,
      detections: Math.floor(Math.random() * 15) + 2,
    };
  });
  return hours;
};

export function DetectionActivityChart() {
  const data = useMemo(() => generateData(), []);

  return (
    <div className="bg-card rounded-md border border-border p-4 h-48">
      <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-3">
        Live Detection Activity
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="detectionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(175, 75%, 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(175, 75%, 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(180, 8%, 55%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
            interval={5}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(180, 8%, 55%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
            width={30}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(210, 12%, 12%)",
              border: "1px solid hsl(210, 10%, 20%)",
              borderRadius: "4px",
              fontFamily: "JetBrains Mono",
              fontSize: 11,
            }}
            labelStyle={{ color: "hsl(175, 75%, 45%)" }}
            itemStyle={{ color: "hsl(180, 10%, 85%)" }}
          />
          <Area
            type="monotone"
            dataKey="detections"
            stroke="hsl(175, 75%, 45%)"
            strokeWidth={2}
            fill="url(#detectionGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
