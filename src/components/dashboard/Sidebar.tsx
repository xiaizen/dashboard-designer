import { LayoutDashboard, Video, Brain, FileEdit, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "DASHBOARD", active: true },
  { icon: Video, label: "VIDEO PLAYER" },
  { icon: Brain, label: "NEURAL SEARCH" },
  { icon: FileEdit, label: "RULE EDITOR" },
  { icon: Camera, label: "CAMERAS" },
];

export function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-primary font-mono tracking-wider">
          CamoEye
        </h1>
        <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
          Visual Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full px-6 py-3 flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-200",
              "hover:bg-sidebar-accent",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="font-mono text-xs">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-6 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground font-mono mb-2">System Status</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">System</span>
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-success">Online</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">GPU</span>
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-success">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
