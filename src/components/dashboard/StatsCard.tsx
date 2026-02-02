import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatsCard({ label, value, className }: StatsCardProps) {
  return (
    <div className={cn("bg-card rounded-md p-5 border border-border", className)}>
      <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
        {label}
      </p>
      <p className="text-3xl font-bold font-mono text-foreground">{value}</p>
    </div>
  );
}
