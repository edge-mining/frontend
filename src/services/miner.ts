import type { Miner, MinerResponseSchema, MinerCreateSchema, MinerUpdateSchema, MinerStatusSchema } from '@/types/miner';
import { apiClient } from '@/services/api'
import type { AxiosResponse } from 'axios';

// --- Miner API ---

export const getMiners = async (): Promise<Miner[]> => {
  try {
    const response = await apiClient.get<MinerResponseSchema[]>('/miners');

    // Transform the response to match the Miner type
    const miners: Miner[] = response.data.map((miner) => ({
      id: miner.id,
      name: miner.name,
      ip_address: miner.ip_address,
      status: miner.status,
      active: miner.active,
      hash_rate: miner.hash_rate,
      hash_rate_max: miner.hash_rate_max,
      power_consumption: miner.power_consumption,
      power_consumption_max: miner.power_consumption_max
    }));

    return miners;
  } catch (error) {
    console.error('Error fetching miners:', error);
    // TODO: More robust error handling (e.g. user notifications)
    throw error;
  }
};

export const getMiner = async (minerId: string): Promise<Miner> => {
  try {
    const response = await apiClient.get<MinerResponseSchema>(`/miners/${minerId}`);

    // Transform the response to match the Miner type
    const miner: Miner = {
      id: response.data.id,
      name: response.data.name,
      ip_address: response.data.ip_address,
      status: response.data.status,
      active: response.data.active,
      hash_rate: response.data.hash_rate,
      hash_rate_max: response.data.hash_rate_max,
      power_consumption: response.data.power_consumption,
      power_consumption_max: response.data.power_consumption_max
    };

    return miner;
  } catch (error) {
    console.error(`Error fetching miner ${minerId}:`, error);
    throw error;
  }
}

export const addMiner = async (miner: MinerCreateSchema): Promise<Miner> => {
  try {
    const response = await apiClient.post<MinerCreateSchema, AxiosResponse<MinerResponseSchema>>(`/miners`, miner);

    // Transform the response to match the Miner type
    const newMiner: Miner = {
      id: response.data.id,
      name: response.data.name,
      ip_address: response.data.ip_address,
      status: response.data.status,
      active: response.data.active,
      hash_rate: response.data.hash_rate,
      hash_rate_max: response.data.hash_rate_max,
      power_consumption: response.data.power_consumption,
      power_consumption_max: response.data.power_consumption_max
    };

    return newMiner;
  } catch (error) {
    console.error('Error creating miner:', error);
    throw error;
  }
}

export const removeMiner = async (minerId: string): Promise<Miner> => {
  try {
    const response = await apiClient.delete<MinerResponseSchema>(`/miners/${minerId}`);

    // Transform the response to match the Miner type
    const miner: Miner = {
      id: response.data.id,
      name: response.data.name,
      ip_address: response.data.ip_address,
      status: response.data.status,
      active: response.data.active,
      hash_rate: response.data.hash_rate,
      hash_rate_max: response.data.hash_rate_max,
      power_consumption: response.data.power_consumption,
      power_consumption_max: response.data.power_consumption_max
    };

    return miner;
  } catch (error) {
    console.error(`Error deleting miner ${minerId}:`, error);
    throw error;
  }
}

export const updateMiner = async (minerId: string, miner: MinerUpdateSchema): Promise<Miner> => {
  try {
    const response = await apiClient.put<MinerUpdateSchema, AxiosResponse<MinerResponseSchema>>(`/miners/${minerId}`, miner);

    // Transform the response to match the Miner type
    const updatedMiner: Miner = {
      id: minerId,
      name: response.data.name,
      ip_address: response.data.ip_address,
      status: response.data.status,
      active: response.data.active,
      hash_rate: response.data.hash_rate,
      hash_rate_max: response.data.hash_rate_max,
      power_consumption: response.data.power_consumption,
      power_consumption_max: response.data.power_consumption_max
    };

    return updatedMiner;
  } catch (error) {
    console.error(`Error updating miner ${minerId}:`, error);
    throw error;
  }
}

export const activateMiner = async (minerId: string): Promise<MinerStatusSchema> => {
  try {
    const response = await apiClient.post<MinerStatusSchema>(`/miners/${minerId}/activate`);
    return response.data;
  } catch (error) {
    console.error(`Error activating miner ${minerId}:`, error);
    throw error;
  }
}

export const deactivateMiner = async (minerId: string): Promise<MinerStatusSchema> => {
  try {
    const response = await apiClient.post<MinerStatusSchema>(`/miners/${minerId}/deactivate`);
    return response.data;
  } catch (error) {
    console.error(`Error deactivating miner ${minerId}:`, error);
    throw error;
  }
}

export const startMiner = async (minerId: string): Promise<MinerStatusSchema> => {
  try {
    const response = await apiClient.post<MinerStatusSchema>(`/miners/${minerId}/start`);
    return response.data;
  } catch (error) {
    console.error(`Error starting miner ${minerId}:`, error);
    throw error;
  }
}

export const stopMiner = async (minerId: string): Promise<MinerStatusSchema> => {
  try {
    const response = await apiClient.post<MinerStatusSchema>(`/miners/${minerId}/stop`);
    return response.data;
  } catch (error) {
    console.error(`Error stopping miner ${minerId}:`, error);
    throw error;
  }
}

// Export everything together for convenience
export const api = {
  getMiners,
  getMiner,
  addMiner,
  removeMiner,
  updateMiner,
  activateMiner,
  deactivateMiner,
  startMiner,
  stopMiner
};
