import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Maximize2, X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchQuery {
  id: string;
  query: string;
  results: number;
}

const NeuralSearchPage = () => {
  const [queryInput, setQueryInput] = useState("");
  const [queries, setQueries] = useState<SearchQuery[]>([]);

  const handleAddQuery = () => {
    if (queryInput.trim()) {
      const newQuery: SearchQuery = {
        id: Date.now().toString(),
        query: queryInput.trim(),
        results: Math.floor(Math.random() * 50) + 1,
      };
      setQueries([...queries, newQuery]);
      setQueryInput("");
    }
  };

  const handleRemoveQuery = (id: string) => {
    setQueries(queries.filter((q) => q.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddQuery();
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-6">
          WORKSPACE
        </p>

        <h1 className="text-xl font-mono text-primary mb-6">
          NEURAL_SEARCH //
        </h1>

        {/* Query Input */}
        <div className="flex gap-2 mb-8">
          <Input
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new query (e.g. 'red car')..."
            className="flex-1 bg-card border-border font-mono text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-card hover:bg-muted"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleAddQuery}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Active Queries */}
        {queries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono text-muted-foreground">
              ACTIVE QUERIES
            </h2>
            <div className="flex flex-wrap gap-2">
              {queries.map((query) => (
                <Badge
                  key={query.id}
                  variant="outline"
                  className="px-3 py-2 bg-card border-primary/50 text-foreground font-mono text-sm flex items-center gap-2"
                >
                  <Search className="h-3 w-3 text-primary" />
                  {query.query}
                  <span className="text-primary">({query.results})</span>
                  <button
                    onClick={() => handleRemoveQuery(query.id)}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {queries.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
            <Search className="h-12 w-12 mb-4 opacity-30" />
            <p className="font-mono text-sm">No active search queries</p>
            <p className="font-mono text-xs mt-1">
              Add a query above to begin neural search
            </p>
          </div>
        )}
      </main>
      <AlertsPanel />
    </div>
  );
};

export default NeuralSearchPage;
