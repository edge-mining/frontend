<template>
    <div class="policy-list">
        <table class="min-w-full divide-y divide-gray-200 shadow border border-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rules
                        (Start/Stop)</th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Targets
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="policy in policies" :key="policy.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <router-link :to="{ name: 'policy-detail', params: { policyId: policy.id } }"
                            class="text-blue-600 hover:text-blue-800 font-medium">
                            {{ policy.name }}
                        </router-link>
                        <p v-if="policy.description" class="text-xs text-gray-500 mt-1">{{ policy.description }}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="policy.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                            {{ policy.is_active ? 'Active' : 'Inactive' }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ policy.start_rules?.length || 0 }} / {{ policy.stop_rules?.length || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ policy.target_miner_ids?.length || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <!-- TODO: Aggiungere bottoni Azioni (Activate, Delete) -->
                        <router-link :to="{ name: 'policy-detail', params: { policyId: policy.id } }"
                            class="text-indigo-600 hover:text-indigo-900 mr-3">View/Edit</router-link>
                        <button @click="activatePolicy(policy.id)" v-if="!policy.is_active"
                            class="text-green-600 hover:text-green-900 mr-3"
                            :disabled="isActionLoading(policy.id)">Activate</button>
                        <button @click="deletePolicy(policy.id)" class="text-red-600 hover:text-red-900"
                            :disabled="isActionLoading(policy.id)">Delete</button>
                        <span v-if="isActionLoading(policy.id)" class="text-xs italic ml-2">...</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { OptimizationPolicy } from '@/types/policy';
import { usePolicyStore } from '@/stores/policies';

defineProps<{
    policies: OptimizationPolicy[];
}>();

const policyStore = usePolicyStore();
const loadingActions = ref<Record<string, boolean>>({}); // To track actions on single rows

const isActionLoading = (policyId: string) => !!loadingActions.value[policyId];

const activatePolicy = async (policyId: string) => {
    loadingActions.value[policyId] = true;
    alert(`TODO: Implement activate policy ${policyId}`);
    // try { await policyStore.activatePolicy(policyId); } catch(e) { ... }
    loadingActions.value[policyId] = false;
};

const deletePolicy = async (policyId: string) => {
    if (confirm(`Are you sure you want to delete policy ${policyId}?`)) {
        loadingActions.value[policyId] = true;
        alert(`TODO: Implement delete policy ${policyId}`);
        // try { await policyStore.deletePolicy(policyId); } catch(e) { ... }
        loadingActions.value[policyId] = false;
    }
};

</script>
