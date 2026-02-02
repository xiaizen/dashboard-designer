import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const CamerasPage = () => {
  const [cameraName, setCameraName] = useState("Entrance Gate Camera");
  const [locationName, setLocationName] = useState("Warehouse A - North Side");
  const [category, setCategory] = useState("indoor");
  const [protocol, setProtocol] = useState("rtsp");
  const [ipAddress, setIpAddress] = useState("192.168.1.50");
  const [port, setPort] = useState("554");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [streamPath, setStreamPath] = useState("/stream1");
  const [enableOnvif, setEnableOnvif] = useState(false);
  const [recordingMode, setRecordingMode] = useState("event");
  const [resolutionLimit, setResolutionLimit] = useState("auto");
  const [fpsLimit, setFpsLimit] = useState([15]);
  const [enableAiDetection, setEnableAiDetection] = useState(false);
  const [detectionTypes, setDetectionTypes] = useState<string[]>([]);
  const [viewPermission, setViewPermission] = useState("admin");
  const [downloadPermission, setDownloadPermission] = useState("admin");

  const toggleDetectionType = (type: string) => {
    if (detectionTypes.includes(type)) {
      setDetectionTypes(detectionTypes.filter((t) => t !== type));
    } else {
      setDetectionTypes([...detectionTypes, type]);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="p-6 pb-24">
            <p className="text-xs text-muted-foreground font-mono tracking-widest mb-6">
              WORKSPACE
            </p>

            <h1 className="text-xl font-mono text-primary mb-2">
              ADD CAMERA / <span className="text-success">CAMERA SETUP</span>
            </h1>
            <p className="text-sm text-muted-foreground font-mono mb-8">
              Configure secure IP CCTV connection, test live stream, and enable
              AI monitoring.
            </p>

            {/* Camera Basic Information */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                Camera Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Camera Name
                  </label>
                  <Input
                    value={cameraName}
                    onChange={(e) => setCameraName(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Location Name
                  </label>
                  <Input
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-card border-border font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="entrance">Entrance</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* Connection Settings */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                Connection Settings
              </h2>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Protocol
                  </label>
                  <Select value={protocol} onValueChange={setProtocol}>
                    <SelectTrigger className="bg-card border-border font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rtsp">RTSP</SelectItem>
                      <SelectItem value="http">HTTP</SelectItem>
                      <SelectItem value="https">HTTPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-7">
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    IP Address / Domain
                  </label>
                  <Input
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Port
                  </label>
                  <Input
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-card border-border font-mono"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  Stream Path
                </label>
                <Input
                  value={streamPath}
                  onChange={(e) => setStreamPath(e.target.value)}
                  className="bg-card border-border font-mono"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={enableOnvif}
                    onCheckedChange={setEnableOnvif}
                  />
                  <span className="font-mono text-sm text-foreground">
                    Enable ONVIF
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-mono text-sm"
                >
                  Test Connection
                </Button>
              </div>
            </section>

            {/* Live Stream Preview */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                Live Stream Preview
              </h2>
              <div className="aspect-video bg-card border border-border rounded-md flex items-center justify-center">
                <span className="text-muted-foreground font-mono text-sm">
                  No stream connected
                </span>
              </div>
            </section>

            {/* Recording Settings */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                Recording Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Recording Mode
                  </label>
                  <Select
                    value={recordingMode}
                    onValueChange={setRecordingMode}
                  >
                    <SelectTrigger className="bg-card border-border font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="continuous">Continuous</SelectItem>
                      <SelectItem value="event">Event-Based Only</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Resolution Limit
                  </label>
                  <Select
                    value={resolutionLimit}
                    onValueChange={setResolutionLimit}
                  >
                    <SelectTrigger className="bg-card border-border font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="480p">480p</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-muted-foreground">
                    FPS Limit
                  </label>
                  <span className="text-sm font-mono text-primary">
                    {fpsLimit[0]}
                  </span>
                </div>
                <Slider
                  value={fpsLimit}
                  onValueChange={setFpsLimit}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </section>

            {/* AI Detection Settings */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                AI Detection Settings
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <Checkbox
                  id="enableAi"
                  checked={enableAiDetection}
                  onCheckedChange={(checked) =>
                    setEnableAiDetection(checked as boolean)
                  }
                />
                <label
                  htmlFor="enableAi"
                  className="font-mono text-sm text-foreground cursor-pointer"
                >
                  Enable AI Detection
                </label>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-3 block">
                  Detection Types
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Person", "Vehicle", "Motion", "Intrusion Zone"].map(
                    (type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={type}
                          checked={detectionTypes.includes(type)}
                          onCheckedChange={() => toggleDetectionType(type)}
                          disabled={!enableAiDetection}
                        />
                        <label
                          htmlFor={type}
                          className="font-mono text-sm text-foreground cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* Permissions & Access Control */}
            <section className="mb-8">
              <h2 className="text-sm font-mono text-muted-foreground mb-4">
                Permissions & Access Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Who can view this camera?
                  </label>
                  <Select
                    value={viewPermission}
                    onValueChange={setViewPermission}
                  >
                    <SelectTrigger className="bg-card border-border font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="security">Security Team</SelectItem>
                      <SelectItem value="all">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block">
                    Who can download recordings?
                  </label>
                  <Select
                    value={downloadPermission}
                    onValueChange={setDownloadPermission}
                  >
                    <SelectTrigger className="bg-card border-border font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin Only</SelectItem>
                      <SelectItem value="security">Security Team</SelectItem>
                      <SelectItem value="all">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-mono text-sm px-8"
              >
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 font-mono text-sm px-8">
                Save Camera
              </Button>
            </div>
          </div>
        </ScrollArea>
      </main>
      <AlertsPanel />
    </div>
  );
};

export default CamerasPage;
