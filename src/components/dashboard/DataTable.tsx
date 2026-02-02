import { Database } from "lucide-react";

interface DataRow {
  id: number;
  timestamp: string;
  object: string;
  confidence: number;
  zone: string;
}

const sampleData: DataRow[] = [
  { id: 1, timestamp: "14:32:05", object: "Vehicle", confidence: 94, zone: "Zone A" },
  { id: 2, timestamp: "14:31:22", object: "Person", confidence: 87, zone: "Zone B" },
  { id: 3, timestamp: "14:30:48", object: "Animal", confidence: 72, zone: "Zone A" },
  { id: 4, timestamp: "14:29:11", object: "Vehicle", confidence: 91, zone: "Zone C" },
];

export function DataTable() {
  const hasData = sampleData.length > 0;

  return (
    <div className="bg-card rounded-md border border-border flex-1 min-h-[200px] flex flex-col">
      {hasData ? (
        <div className="overflow-auto flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  Object
                </th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  Confidence
                </th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  Zone
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-foreground">{row.timestamp}</td>
                  <td className="px-4 py-3 text-xs font-mono text-primary">{row.object}</td>
                  <td className="px-4 py-3 text-xs font-mono text-foreground">
                    <span className={row.confidence > 85 ? "text-success" : "text-warning"}>
                      {row.confidence}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{row.zone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
          <Database className="h-8 w-8 mb-3 opacity-50" />
          <p className="text-xs font-mono tracking-widest uppercase">No Data</p>
        </div>
      )}
    </div>
  );
}
