import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Rule {
  id: string;
  name: string;
  condition: string;
  actions: string;
}

const defaultRules: Rule[] = [
  {
    id: "1",
    name: "High Confidence Person Detection",
    condition: "input.confidence > 0.8",
    actions: '[\n  {"type": "alert", "priority": "high"}\n]',
  },
  {
    id: "2",
    name: "Suspicious Object",
    condition: "input.object_type == 'unknown' and input.confidence > 0.5",
    actions: '[\n  {"type": "notify", "channel": "security"}\n]',
  },
];

const RuleEditorPage = () => {
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [editedRule, setEditedRule] = useState<Rule | null>(null);

  const selectedRule = rules.find((r) => r.id === selectedRuleId);

  const handleSelectRule = (rule: Rule) => {
    setSelectedRuleId(rule.id);
    setEditedRule({ ...rule });
  };

  const handleNewRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      name: "",
      condition: "",
      actions: "[]",
    };
    setRules([...rules, newRule]);
    setSelectedRuleId(newRule.id);
    setEditedRule(newRule);
  };

  const handleSave = () => {
    if (editedRule) {
      setRules(rules.map((r) => (r.id === editedRule.id ? editedRule : r)));
    }
  };

  const handleDelete = () => {
    if (selectedRuleId) {
      setRules(rules.filter((r) => r.id !== selectedRuleId));
      setSelectedRuleId(null);
      setEditedRule(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-6">
          WORKSPACE
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Rules List */}
          <div className="flex flex-col">
            <h2 className="text-sm font-mono text-muted-foreground mb-4">
              DEFINED RULES
            </h2>
            <div className="flex-1 bg-card border border-border rounded-md overflow-hidden">
              <div className="divide-y divide-border">
                {rules.map((rule) => (
                  <button
                    key={rule.id}
                    onClick={() => handleSelectRule(rule)}
                    className={cn(
                      "w-full px-4 py-3 text-left font-mono text-sm transition-colors",
                      "hover:bg-muted/50",
                      selectedRuleId === rule.id
                        ? "bg-muted text-foreground"
                        : "text-foreground/80"
                    )}
                  >
                    {rule.name || "Untitled Rule"}
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleNewRule}
              className="mt-4 bg-primary hover:bg-primary/90 font-mono text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              NEW RULE
            </Button>
          </div>

          {/* Rule Editor */}
          <div className="flex flex-col">
            {editedRule ? (
              <>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="text-sm font-mono text-muted-foreground mb-2 block">
                      Rule Name:
                    </label>
                    <Input
                      value={editedRule.name}
                      onChange={(e) =>
                        setEditedRule({ ...editedRule, name: e.target.value })
                      }
                      className="bg-card border-border font-mono"
                      placeholder="Enter rule name..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground mb-2 block">
                      Condition (Python Expr using 'input'):
                    </label>
                    <Textarea
                      value={editedRule.condition}
                      onChange={(e) =>
                        setEditedRule({
                          ...editedRule,
                          condition: e.target.value,
                        })
                      }
                      className="bg-card border-border font-mono min-h-[80px]"
                      placeholder="e.g. input.confidence > 0.8"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-muted-foreground mb-2 block">
                      Actions:
                    </label>
                    <Textarea
                      value={editedRule.actions}
                      onChange={(e) =>
                        setEditedRule({
                          ...editedRule,
                          actions: e.target.value,
                        })
                      }
                      className="bg-card border-border font-mono min-h-[120px]"
                      placeholder="JSON List of actions..."
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Button
                    onClick={handleSave}
                    className="w-full bg-primary hover:bg-primary/90 font-mono text-sm"
                  >
                    SAVE CHANGES
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10 font-mono text-sm"
                  >
                    DELETE RULE
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-sm">
                Select a rule to edit or create a new one
              </div>
            )}
          </div>
        </div>
      </main>
      <AlertsPanel />
    </div>
  );
};

export default RuleEditorPage;
