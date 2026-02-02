import { Sidebar } from "@/components/dashboard/Sidebar";
import { Workspace } from "@/components/dashboard/Workspace";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <Workspace />
      <AlertsPanel />
    </div>
  );
};

export default Index;
