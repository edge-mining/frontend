<template>
    <div class="policy-detail p-4" v-if="policy">
        <h1 class="text-2xl font-semibold mb-2">Policy: {{ policy.name }}</h1>
        <p class="text-gray-600 mb-1">ID: {{ policy.id }}</p>
        <p v-if="policy.description" class="text-gray-700 mb-4">{{ policy.description }}</p>
        <p class="mb-4">
            Status: <span :class="policy.is_active ? 'text-green-600 font-bold' : 'text-gray-500'">{{ policy.is_active ?
                'Active' : 'Inactive' }}</span>
            <!-- TODO: Button to activate/deactivate -->
        </p>

        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Target Miners</h2>
            <ul v-if="policy.target_miner_ids && policy.target_miner_ids.length > 0" class="list-disc list-inside ml-4">
                <li v-for="minerId in policy.target_miner_ids" :key="minerId">{{ minerId }}</li>
            </ul>
            <p v-else class="text-gray-500">No target miners specified.</p>
            <!-- TODO: UI to add/remove miner targets -->
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Start Rules -->
            <div>
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-xl font-semibold">Start Rules</h2>
                    <button @click="showAddRuleModal('start')"
                        class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded">
                        Add Start Rule
                    </button>
                </div>
                <RuleList :rules="policy.start_rules" :policy-id="policy.id" rule-type="start"
                    @remove-rule="handleRemoveRule" />
            </div>

            <!-- Stop Rules -->
            <div>
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-xl font-semibold">Stop Rules</h2>
                    <button @click="showAddRuleModal('stop')"
                        class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded">
                        Add Stop Rule
                    </button>
                </div>
                <RuleList :rules="policy.stop_rules" :policy-id="policy.id" rule-type="stop"
                    @remove-rule="handleRemoveRule" />
            </div>
        </div>

        <!-- Modal to Add Rules -->
        <BaseModal :show="showRuleModal" @close="showRuleModal = false"
            :title="`Add New ${currentRuleType === 'start' ? 'Start' : 'Stop'} Rule`">
            <RuleForm :policy-id="policy.id" :rule-type="currentRuleType" @rule-added="handleRuleAdded"
                @cancel="showRuleModal = false" />
        </BaseModal>

    </div>
    <div v-else-if="isLoadingDetail" class="p-4 text-center">Loading policy details...</div>
    <div v-else class="p-4 text-red-500">Policy not found or error loading details. {{ error }}</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePolicyStore } from '@/stores/policies';
import RuleList from '@/components/policies/RuleList.vue';
import RuleForm from '@/components/policies/RuleForm.vue';
import BaseModal from '@/components/common/BaseModal.vue';

// Receives policyId from route thanks to props: true in router
const props = defineProps<{
    policyId: string;
}>();

const policyStore = usePolicyStore();
// Use a different name for currentPolicy from the store to avoid conflicts
const { currentPolicy: policy, isLoadingDetail, error } = storeToRefs(policyStore);

const showRuleModal = ref(false);
const currentRuleType = ref<'start' | 'stop'>('start');

const showAddRuleModal = (type: 'start' | 'stop') => {
    currentRuleType.value = type;
    showRuleModal.value = true;
}

const handleRuleAdded = () => {
    showRuleModal.value = false;
    // The store has already been updated by the addRule action
};

const handleRemoveRule = async (ruleId: string, ruleType: 'start' | 'stop') => {
    if (confirm(`Are you sure you want to delete this ${ruleType} rule?`)) {
        try {
            await policyStore.removeRule(props.policyId, ruleId, ruleType);
            // The store has already been updated
        } catch (e) {
            alert(`Error removing rule: ${e}`);
        }
    }
}

// Load policy details when the component is mounted or the ID changes
onMounted(() => {
    policyStore.fetchPolicyDetail(props.policyId);
});

// If navigating between different policy details, reload the data
watch(() => props.policyId, (newId) => {
    policyStore.fetchPolicyDetail(newId);
});

</script>

<style scoped>
/* PolicyDetailView specific styles */
</style>