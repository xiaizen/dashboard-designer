import { AlertTriangle, Clock } from "lucide-react";

interface Alert {
  id: number;
  type: "warning" | "info";
  message: string;
  time: string;
}

const sampleAlerts: Alert[] = [
  { id: 1, type: "warning", message: "Motion detected in Zone A", time: "2m ago" },
  { id: 2, type: "info", message: "Camera 3 reconnected", time: "5m ago" },
  { id: 3, type: "warning", message: "Object classification pending", time: "8m ago" },
];

export function AlertsPanel() {
  return (
    <aside className="w-72 min-h-screen bg-sidebar border-l border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-mono text-primary tracking-widest uppercase">
          Live Zen Alerts
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {sampleAlerts.length === 0 ? (
          <p className="text-xs text-muted-foreground font-mono text-center py-8">
            No active alerts
          </p>
        ) : (
          sampleAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-card border border-border rounded-md p-3 transition-all hover:border-primary/50"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-foreground leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-mono">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
