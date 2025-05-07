<template>
    <form @submit.prevent="submitPolicy" class="space-y-4">
        <div>
            <label for="policy-name" class="block text-sm font-medium text-gray-700">Policy Name</label>
            <input type="text" id="policy-name" v-model="formData.name" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
            <label for="policy-desc" class="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea id="policy-desc" v-model="formData.description" rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
            <label for="policy-targets" class="block text-sm font-medium text-gray-700">Target Miner IDs
                (comma-separated)</label>
            <input type="text" id="policy-targets" v-model="targetMinersInput" placeholder="miner01,miner02"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="$emit('cancel')"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
            </button>
            <button type="submit" :disabled="isLoading"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                {{ isLoading ? 'Saving...' : 'Save Policy' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePolicyStore } from '@/stores/policies';
import type { PolicyFormData } from '@/types';

const emit = defineEmits(['policy-created', 'cancel']);

const policyStore = usePolicyStore();
const isLoading = ref(false);
const error = ref<string | null>(null);

const formData = ref<PolicyFormData>({
    name: '',
    description: '',
    target_miner_ids: [],
});
const targetMinersInput = ref(''); // Separate input for CSV list

const submitPolicy = async () => {
    isLoading.value = true;
    error.value = null;
    // Transform CSV input into array of IDs
    formData.value.target_miner_ids = targetMinersInput.value
        .split(',')
        .map(id => id.trim())
        .filter(id => id); // Remove empty strings
    try {
        await policyStore.createPolicy(formData.value);
        emit('policy-created');
        // Reset the form?
        formData.value = { name: '', description: '', target_miner_ids: [] };
        targetMinersInput.value = '';
    } catch (err: any) {
        error.value = err.message || 'Failed to save policy.';
    } finally {
        isLoading.value = false;
    }
};
</script>