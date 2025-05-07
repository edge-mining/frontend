import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/services/api';
import type { Miner } from '@/types';

export const useMinerStore = defineStore('miners', () => {
    // State
    const miners = ref<Miner[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Getters (computed)
    const minerCount = computed(() => miners.value.length);
    const minersById = computed(() => {
        return miners.value.reduce((acc, miner) => {
            acc[miner.id] = miner;
            return acc;
        }, {} as Record<string, Miner>);
    });

    // Actions
    async function fetchMiners() {
        isLoading.value = true;
        error.value = null;
        try {
            miners.value = await api.getMiners();
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch miners';
            miners.value = []; // Reset on error
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    }

    // TODO: Add actions for start/stop/refresh single miner
    // async function startMiner(minerId: string) { ... }
    // async function stopMiner(minerId: string) { ... }
    // async function refreshMinerStatus(minerId: string) { ... }

    return {
        // State
        miners,
        isLoading,
        error,
        // Getters
        minerCount,
        minersById,
        // Actions
        fetchMiners,
        // startMiner,
        // stopMiner,
    };
});