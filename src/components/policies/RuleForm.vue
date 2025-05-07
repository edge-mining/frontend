<template>
    <form @submit.prevent="submitRule" class="space-y-4">
        <div>
            <label for="rule-name" class="block text-sm font-medium text-gray-700">Rule Name</label>
            <input type="text" id="rule-name" v-model="formData.name" required class="mt-1 input-field" />
        </div>

        <div>
            <label for="rule-action" class="block text-sm font-medium text-gray-700">Action</label>
            <!-- The action is determined by the rule type (start/stop) -->
            <p class="mt-1 text-sm text-gray-800 bg-gray-100 p-2 rounded">
                {{ ruleType === 'start' ? 'start_mining' : 'stop_mining' }}
            </p>
            <input type="hidden" v-model="formData.action" />
        </div>

        <div>
            <label for="rule-conditions" class="block text-sm font-medium text-gray-700">
                Conditions (JSON format)
            </label>
            <textarea id="rule-conditions" v-model="conditionsInput" rows="4"
                placeholder='{ "battery_soc_gt": 80, "solar_forecast_gt": 1000 }'
                class="mt-1 input-field font-mono text-sm"></textarea>
            <p v-if="conditionsError" class="text-red-500 text-xs mt-1">{{ conditionsError }}</p>
            <p class="text-xs text-gray-500 mt-1">Enter conditions as a valid JSON object.</p>
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="$emit('cancel')"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
            </button>
            <button type="submit" :disabled="isLoading || !!conditionsError"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                {{ isLoading ? 'Saving...' : 'Save Rule' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePolicyStore } from '@/stores/policies';
import type { RuleFormData } from '@/types';

const props = defineProps<{
    policyId: string;
    ruleType: 'start' | 'stop';
}>();

const emit = defineEmits(['rule-added', 'cancel']);

const policyStore = usePolicyStore();
const isLoading = ref(false);
const error = ref<string | null>(null);
const conditionsInput = ref('{}'); // Initialize as empty JSON
const conditionsError = ref<string | null>(null);

const formData = ref<RuleFormData>({
    name: '',
    conditions: {},
    action: props.ruleType === 'start' ? 'start_mining' : 'stop_mining',
});

// Validate JSON input for conditions as user types
watch(conditionsInput, (newValue) => {
    try {
        formData.value.conditions = JSON.parse(newValue || '{}');
        conditionsError.value = null; // Reset error if JSON is valid
    } catch (e) {
        conditionsError.value = 'Invalid JSON format.';
        // Don't reset formData.conditions here, otherwise the submit may fail silently
    }
});

const submitRule = async () => {
    if (conditionsError.value) {
        alert('Please fix the JSON errors in conditions.');
        return;
    }
    isLoading.value = true;
    error.value = null;
    try {
        // Ensures that conditions are updated from the last valid input
        formData.value.conditions = JSON.parse(conditionsInput.value || '{}');

        await policyStore.addRule(props.policyId, props.ruleType, formData.value);
        emit('rule-added');
        // Reset the form
        formData.value = { name: '', conditions: {}, action: props.ruleType === 'start' ? 'start_mining' : 'stop_mining' };
        conditionsInput.value = '{}';

    } catch (err: any) {
        error.value = err.message || `Failed to add ${props.ruleType} rule.`;
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.input-field {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    /* gray-300 */
    border-radius: 0.375rem;
    /* rounded-md */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    /* shadow-sm */
}

.input-field:focus {
    outline: none;
    border-color: #4f46e5;
    /* indigo-500 */
    box-shadow: 0 0 0 1px #4f46e5;
    /* focus:ring-indigo-500 */
}
</style>