import { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Upload,
  Film,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTrim, setStartTrim] = useState(0);
  const [endTrim, setEndTrim] = useState(100);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTrim(100);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current && duration > 0) {
      const time = (value[0] / 100) * duration;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
    }
  };

  const clearVideo = () => {
    setVideoSrc(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
            <span className="text-primary">VIDEO PLAYER</span>
            <span className="text-muted-foreground"> // </span>
            <span className="text-success">ANALYSIS</span>
          </h1>
        </div>

        {/* Video Preview Area */}
        <div 
          className={cn(
            "relative bg-card rounded-md border-2 border-dashed transition-all duration-300 flex-1 min-h-[300px] flex items-center justify-center overflow-hidden",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            videoSrc && "border-solid"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {videoSrc ? (
            <>
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-contain bg-background"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              <button
                onClick={clearVideo}
                className="absolute top-3 right-3 p-2 rounded-md bg-card/80 border border-border hover:bg-destructive hover:border-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="text-center p-8">
              <div className={cn(
                "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all",
                isDragging ? "bg-primary/20 scale-110" : "bg-muted"
              )}>
                <Film className={cn(
                  "h-10 w-10 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <p className="text-sm font-mono text-foreground mb-2">
                {isDragging ? "Drop video here" : "Drag & drop video file"}
              </p>
              <p className="text-xs text-muted-foreground font-mono mb-4">
                or click to browse
              </p>
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                SELECT FILE
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Timeline Controls */}
        <div className="bg-card rounded-md border border-border p-4 space-y-4">
          {/* Timeline Slider */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
              disabled={!videoSrc}
            />
          </div>

          {/* Trim Range */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">Start</span>
              <div className="bg-muted px-3 py-2 rounded-md border border-border">
                <span className="text-sm font-mono text-foreground">
                  {formatTime((startTrim / 100) * duration)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">End</span>
              <div className="bg-muted px-3 py-2 rounded-md border border-border">
                <span className="text-sm font-mono text-foreground">
                  {formatTime((endTrim / 100) * duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between pt-2">
            {/* Open Button */}
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              OPEN
            </Button>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-primary/50 hover:bg-primary/10"
                onClick={skipBack}
                disabled={!videoSrc}
              >
                <SkipBack className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-10 w-10"
                onClick={togglePlay}
                disabled={!videoSrc}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-primary/50 hover:bg-primary/10"
                onClick={skipForward}
                disabled={!videoSrc}
              >
                <SkipForward className="h-4 w-4 text-primary" />
              </Button>
              
              <span className="ml-4 text-sm font-mono text-foreground min-w-[80px]">
                {formatTime(currentTime)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                onClick={clearVideo}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="font-mono text-xs"
                disabled={!videoSrc}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
