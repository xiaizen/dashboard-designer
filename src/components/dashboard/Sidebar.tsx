import { LayoutDashboard, Video, Brain, FileEdit, Camera } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "DASHBOARD", path: "/" },
  { icon: Video, label: "VIDEO PLAYER", path: "/video-player" },
  { icon: Brain, label: "NEURAL SEARCH", path: "/neural-search" },
  { icon: FileEdit, label: "RULE EDITOR", path: "/rule-editor" },
  { icon: Camera, label: "CAMERAS", path: "/cameras" },
];

export function Sidebar() {
  const location = useLocation();

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
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-full px-6 py-3 flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="font-mono text-xs">{item.label}</span>
            </Link>
          );
        })}
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
