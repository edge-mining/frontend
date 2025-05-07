<template>
    <div class="dashboard p-4">
        <h1 class="text-2xl font-semibold mb-4">Miner Dashboard</h1>

        <div class="mb-4">
            <button @click="refreshMiners" :disabled="isLoading"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                {{ isLoading ? 'Refreshing...' : 'Refresh Status' }}
            </button>
            <p v-if="error" class="text-red-500 mt-2">Error: {{ error }}</p>
        </div>

        <div v-if="isLoading && miners.length === 0" class="text-center">
            Loading miners...
        </div>
        <div v-else-if="miners.length === 0 && !isLoading" class="text-center text-gray-500">
            No miners found. Make sure miners are configured in the backend.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MinerCard v-for="miner in miners" :key="miner.id" :miner="miner" />
        </div>


        <!-- TODO: Add energy, hashrate etc. graphs -->
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMinerStore } from '@/stores/miners';
import MinerCard from '@/components/miners/MinerCard.vue';

const minerStore = useMinerStore();
const { miners, isLoading, error } = storeToRefs(minerStore); // Rende reattivi state/getters

const refreshMiners = async () => {
    // TODO: Implementare polling o WebSockets per aggiornamenti automatici
    await minerStore.fetchMiners();
};

// Carica i miner al montaggio del componente
onMounted(() => {
    if (miners.value.length === 0) { // Carica solo se non già presenti
        refreshMiners();
    }
});
</script>

<style scoped>
/* Stili specifici per DashboardView se necessario */
</style>