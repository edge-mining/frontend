import axios from 'axios';
import type { Miner, OptimizationPolicy, PolicyFormData, RuleFormData, AutomationRule } from '@/types';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1', // Reads from .env
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Miner API ---

export const getMiners = async (): Promise<Miner[]> => {
    try {
        const response = await apiClient.get<Miner[]>('/miners');
        return response.data;
    } catch (error) {
        console.error('Error fetching miners:', error);
        // TODO: More robust error handling (e.g. user notifications)
        throw error;
    }
};

export const getMiner = async (minerId: string): Promise<Miner> => {
    try {
        const response = await apiClient.get<Miner>(`/miners/${minerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching miner ${minerId}:`, error);
        throw error;
    }
}

// TODO: Add API for start/stop miner (needs endpoint in backend)
// export const startMiner = async (minerId: string): Promise<void> => { ... }
// export const stopMiner = async (minerId: string): Promise<void> => { ... }


// --- Policy API ---

export const getPolicies = async (): Promise<OptimizationPolicy[]> => {
    try {
        // TODO: Add /policies endpoints in the FastAPI backend
        // const response = await apiClient.get<OptimizationPolicy[]>('/policies');
        // return response.data;
        console.warn("getPolicies API endpoint not yet implemented in backend.");
        return Promise.resolve([]); // Return empty array for now
    } catch (error) {
        console.error('Error fetching policies:', error);
        throw error;
    }
};

export const getPolicy = async (policyId: string): Promise<OptimizationPolicy> => {
    try {
        // TODO: Add endpoint /policies/{policy_id} in the FastAPI backend
        // const response = await apiClient.get<OptimizationPolicy>(`/policies/${policyId}`);
        // return response.data;
        console.warn(`getPolicy API endpoint for ${policyId} not yet implemented in backend.`);
        // Returns a dummy policy for UI development
        return Promise.resolve({
            id: policyId,
            name: `Fake Policy ${policyId.substring(0, 4)}`,
            description: "Fetched from fake API",
            is_active: false,
            start_rules: [],
            stop_rules: [],
            target_miner_ids: []
        });
    } catch (error) {
        console.error(`Error fetching policy ${policyId}:`, error);
        throw error;
    }
};


export const createPolicy = async (policyData: PolicyFormData): Promise<OptimizationPolicy> => {
    try {
        // TODO: Add POST /policies endpoint in the FastAPI backend
        // const response = await apiClient.post<OptimizationPolicy>('/policies', policyData);
        // return response.data;
        console.warn("createPolicy API endpoint not yet implemented in backend.");
        // Returns a dummy policy
        return Promise.resolve({
            id: crypto.randomUUID(),
            name: policyData.name,
            description: policyData.description,
            is_active: false,
            start_rules: [],
            stop_rules: [],
            target_miner_ids: policyData.target_miner_ids || []
        });
    } catch (error) {
        console.error('Error creating policy:', error);
        throw error;
    }
};

// TODO: Add API for updatePolicy, deletePolicy, activatePolicy

// --- Rule API ---

export const addRuleToPolicy = async (policyId: string, ruleType: 'start' | 'stop', ruleData: RuleFormData): Promise<AutomationRule> => {
    try {
        // TODO: Add POST endpoint /policies/{policy_id}/rules in the FastAPI backend
        /* const response = await apiClient.post<AutomationRule>(`/policies/${policyId}/rules`, {
             rule_type: ruleType,
             ...ruleData
            });
        return response.data; */
        console.warn(`addRuleToPolicy API endpoint for ${policyId} not yet implemented in backend.`);
        return Promise.resolve({
            id: crypto.randomUUID(),
            ...ruleData
        })
    } catch (error) {
        console.error(`Error adding ${ruleType} rule to policy ${policyId}:`, error);
        throw error;
    }
};

export const removeRuleFromPolicy = async (policyId: string, ruleId: string): Promise<void> => {
    try {
        // TODO: Add DELETE endpoint /policies/{policy_id}/rules/{rule_id} in FastAPI backend
        // await apiClient.delete(`/policies/${policyId}/rules/${ruleId}`);
        console.warn(`removeRuleFromPolicy API endpoint for ${policyId}/${ruleId} not yet implemented in backend.`);
        return Promise.resolve();
    } catch (error) {
        console.error(`Error removing rule ${ruleId} from policy ${policyId}:`, error);
        throw error;
    }
};


// Export everything together for convenience
export const api = {
    getMiners,
    getMiner,
    getPolicies,
    getPolicy,
    createPolicy,
    addRuleToPolicy,
    removeRuleFromPolicy,
    // startMiner, // Add when implemented
    // stopMiner,
};