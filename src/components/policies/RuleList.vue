<template>
    <div class="rule-list space-y-3">
        <div v-if="rules.length === 0" class="text-sm text-gray-500 italic">
            No {{ ruleType }} rules defined yet.
        </div>
        <div v-for="rule in rules" :key="rule.id" class="border rounded p-3 bg-gray-50 relative">
            <button @click="$emit('remove-rule', rule.id, ruleType)"
                class="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 leading-none" title="Remove rule">
                × <!-- Character 'x' to close -->
            </button>
            <p class="font-medium text-sm mb-1">{{ rule.name }}</p>
            <div class="text-xs text-gray-700">
                <p>Action: <span class="font-mono">{{ rule.action }}</span></p>
                <p>Conditions:</p>
                <ul class="list-disc list-inside ml-4">
                    <li v-for="(value, key) in rule.conditions" :key="key">
                        <span class="font-mono">{{ key }}</span>: {{ value }}
                    </li>
                </ul>
                <p v-if="!rule.conditions || Object.keys(rule.conditions).length === 0"
                    class="ml-4 italic text-gray-500">No conditions (always triggers?)</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AutomationRule } from '@/types';

defineProps<{
    rules: AutomationRule[];
    policyId: string;
    ruleType: 'start' | 'stop';
}>();

// Emit to communicate the removal to the parent (PolicyDetailView)
defineEmits(['remove-rule']);

</script>

<style scoped>
.rule-list>div:not(:first-child) {
    margin-top: 0.75rem;
}
</style>