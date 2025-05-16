export type MinerStatus = "unknown" | "off" | "on" | "starting" | "stopping" | "error";

export type HashRate = {
  value: number;
  unit: string; // e.g., "TH/s", "GH/s", etc.
};

export interface Miner {
  id: string; // MinerId is a string
  name: string;
  active: boolean;
  ip_address?: string | null;
  status: MinerStatus | null;
  hash_rate?: HashRate | null;
  hash_rate_max?: HashRate | null;
  power_consumption_max?: number | null;
  power_consumption?: number | null;
}

export interface MinerControl {
  type: string;
  miner_ids: string[];
}

// For API requests/responses
export type MinerResponseSchema = {
  id: string;
  name: string;
  active: boolean;
  ip_address?: string | null;
  status: MinerStatus | null;
  hash_rate?: HashRate | null;
  hash_rate_max?: HashRate | null;
  power_consumption_max?: number | null;
  power_consumption?: number | null;
}

// For forms (partial or creation data)
export type MinerStatusSchema = Omit<Miner, 'name' | 'status' | 'hash_rate_max' | 'power_consumption_max'>;
export type MinerCreateSchema = Omit<Miner, 'id' | 'status' | 'hash_rate' | 'power_consumption'>;
export type MinerUpdateSchema = Omit<Miner, 'id' | 'status' | 'hash_rate' | 'power_consumption'>;
