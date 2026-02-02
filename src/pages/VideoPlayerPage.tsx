import { Sidebar } from "@/components/dashboard/Sidebar";
import { VideoPlayer } from "@/components/dashboard/VideoPlayer";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

const VideoPlayerPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <VideoPlayer />
      <AlertsPanel />
    </div>
  );
};

export default VideoPlayerPage;
