<template>
    <div class="policies p-4">
        <h1 class="text-2xl font-semibold mb-4">Optimization Policies</h1>

        <div class="mb-4">
            <button @click="showCreateModal = true"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Create New Policy
            </button>
        </div>

        <div v-if="isLoadingList" class="text-center">Loading policies...</div>
        <p v-if="error" class="text-red-500 mb-4">Error: {{ error }}</p>

        <PolicyList v-if="!isLoadingList && policies.length > 0" :policies="policies" />
        <div v-else-if="!isLoadingList && policies.length === 0" class="text-gray-500">
            No policies found.
        </div>

        <!-- Modal for Policy Create -->
        <BaseModal :show="showCreateModal" @close="showCreateModal = false" title="Create New Policy">
            <PolicyForm @policy-created="handlePolicyCreated" @cancel="showCreateModal = false" />
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePolicyStore } from '@/stores/policies';
import PolicyList from '@/components/policies/PolicyList.vue';
import PolicyForm from '@/components/policies/PolicyForm.vue';
import BaseModal from '@/components/common/BaseModal.vue'; // Assuming there is a modal component

const policyStore = usePolicyStore();
const { policies, isLoadingList, error } = storeToRefs(policyStore);

const showCreateModal = ref(false);

const handlePolicyCreated = () => {
    showCreateModal.value = false;
    // No need to reload, the store has already been updated by the createPolicy action
    // policyStore.fetchPolicies();
};

onMounted(() => {
    if (policies.value.length === 0) {
        policyStore.fetchPolicies();
    }
});
</script>