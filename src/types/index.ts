// Enum mirroring Python Enums (use strings for simplicity)
export type MinerStatus = "unknown" | "off" | "on" | "starting" | "stopping" | "error";
export type MiningDecisionAction = "start_mining" | "stop_mining" | "maintain_state";

export interface Miner {
  id: string; // MinerId is a string
  name: string;
  ip_address?: string | null;
  status: MinerStatus;
  power_consumption?: number | null; // Watts is a number
}

export interface AutomationRule {
  id: string; // EntityId is a UUID string
  name: string;
  conditions: Record<string, any>; // { battery_soc_gt: 80 }
  action: MiningDecisionAction;
}

export interface OptimizationPolicy {
  id: string; // EntityId is a UUID string
  name: string;
  description?: string | null;
  is_active: boolean;
  start_rules: AutomationRule[];
  stop_rules: AutomationRule[];
  target_miner_ids: string[]; // List of MinerId
}

// For forms (partial or creation data)
export type PolicyFormData = Omit<OptimizationPolicy, 'id' | 'start_rules' | 'stop_rules' | 'is_active'>;
export type RuleFormData = Omit<AutomationRule, 'id'>;