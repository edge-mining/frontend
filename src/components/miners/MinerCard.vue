<template>
    <div class="miner-card border rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-200"
        :class="statusColorClass">
        <h3 class="text-lg font-semibold mb-2 flex justify-between items-center">
            <span>{{ miner.name }}</span>
            <span :class="`text-sm font-medium px-2 py-0.5 rounded ${statusBadgeClass}`">{{ miner.status.toUpperCase()
                }}</span>
        </h3>
        <p class="text-sm text-gray-600 mb-1">ID: {{ miner.id }}</p>
        <p v-if="miner.ip_address" class="text-sm text-gray-600 mb-3">IP: {{ miner.ip_address }}</p>

        <div v-if="miner.status === 'on' || miner.status === 'error'" class="text-sm mb-3">
            Power: {{ miner.power_consumption !== null ? `${miner.power_consumption?.toFixed(0)} W` : 'N/A' }}
            <!-- TODO: Aggiungere Hashrate qui se disponibile -->
        </div>

        <div class="card-actions mt-auto pt-3 border-t border-gray-200">
            <!-- TODO: Implementare i bottoni Start/Stop -->
            <button v-if="miner.status === 'off' || miner.status === 'error'" @click="startMiner"
                :disabled="isActionLoading"
                class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded mr-2 disabled:opacity-50">
                Start
            </button>
            <button v-if="miner.status === 'on'" @click="stopMiner" :disabled="isActionLoading"
                class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded disabled:opacity-50">
                Stop
            </button>
            <span v-if="isActionLoading" class="text-xs italic ml-2">Processing...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Miner } from '@/types';
import { useMinerStore } from '@/stores/miners';

const props = defineProps<{
    miner: Miner;
}>();

const minerStore = useMinerStore();
const isActionLoading = ref(false); // Local loading state for the action

const startMiner = async () => {
    isActionLoading.value = true;
    alert(`TODO: Implement startMiner API call for ${props.miner.id}`);
    // try {
    //   await minerStore.startMiner(props.miner.id);
    // } catch(e) {
    //    console.error("Failed to start miner:", e)
    //    alert("Error starting miner");
    // } finally {
    isActionLoading.value = false;
    // }
};

const stopMiner = async () => {
    isActionLoading.value = true;
    alert(`TODO: Implement stopMiner API call for ${props.miner.id}`);
    // try {
    //   await minerStore.stopMiner(props.miner.id);
    // } catch(e) {
    //    console.error("Failed to stop miner:", e)
    //    alert("Error stopping miner");
    // } finally {
    isActionLoading.value = false;
    // }
};

// Conditional classes for style
const statusColorClass = computed(() => {
    switch (props.miner.status) {
        case 'on': return 'border-green-500 bg-green-50';
        case 'off': return 'border-gray-300 bg-gray-50';
        case 'starting':
        case 'stopping': return 'border-yellow-500 bg-yellow-50';
        case 'error': return 'border-red-500 bg-red-50';
        default: return 'border-gray-300 bg-gray-50';
    }
});

const statusBadgeClass = computed(() => {
    switch (props.miner.status) {
        case 'on': return 'bg-green-200 text-green-800';
        case 'off': return 'bg-gray-200 text-gray-800';
        case 'starting':
        case 'stopping': return 'bg-yellow-200 text-yellow-800 animate-pulse';
        case 'error': return 'bg-red-200 text-red-800';
        default: return 'bg-gray-200 text-gray-800';
    }
});
</script>

<style scoped>
.miner-card {
    display: flex;
    flex-direction: column;
    min-height: 180px;
    /* Minimum height for consistency */
}
</style>