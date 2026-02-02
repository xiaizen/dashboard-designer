import { StatsCard } from "./StatsCard";
import { DetectionActivityChart } from "./DetectionActivityChart";
import { DataTable } from "./DataTable";

export function Workspace() {
  return (
    <main className="flex-1 min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Workspace
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Title */}
        <div>
          <h1 className="text-xl font-mono font-bold tracking-wider">
            <span className="text-primary">MISSION DASHBOARD</span>
            <span className="text-muted-foreground"> // </span>
            <span className="text-success">ANALYTICS</span>
          </h1>
        </div>

        {/* Detection Chart */}
        <DetectionActivityChart />

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard label="Objects (Current)" value={12} />
          <StatsCard label="Analysis Time" value="1.2s" />
        </div>

        {/* Data Table */}
        <DataTable />
      </div>
    </main>
  );
}
