import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/services/policy';
import type { OptimizationPolicy, PolicyFormData, RuleFormData, AutomationRule } from '@/types/policy';

export const usePolicyStore = defineStore('policies', () => {
  // State
  const policies = ref<OptimizationPolicy[]>([]);
  const currentPolicy = ref<OptimizationPolicy | null>(null); // For detail view
  const isLoadingList = ref(false);
  const isLoadingDetail = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const policyCount = computed(() => policies.value.length);
  const activePolicy = computed(() => policies.value.find(p => p.is_active));

  // Actions
  async function fetchPolicies() {
    isLoadingList.value = true;
    error.value = null;
    try {
      policies.value = await api.getPolicies();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch policies';
      policies.value = [];
      console.error(err);
    } finally {
      isLoadingList.value = false;
    }
  }

  async function fetchPolicyDetail(policyId: string) {
    isLoadingDetail.value = true;
    error.value = null;
    currentPolicy.value = null;
    try {
      currentPolicy.value = await api.getPolicy(policyId);
    } catch (err: any) {
      error.value = err.message || `Failed to fetch policy ${policyId}`;
      console.error(err);
    } finally {
      isLoadingDetail.value = false;
    }
  }

  async function createPolicy(policyData: PolicyFormData) {
    // isLoading may be needed for creation
    error.value = null;
    try {
      const newPolicy = await api.createPolicy(policyData);
      policies.value.push(newPolicy); // Add to local list
      return newPolicy; // Returns the created policy
    } catch (err: any) {
      error.value = err.message || 'Failed to create policy';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    }
  }

  async function addRule(policyId: string, ruleType: 'start' | 'stop', ruleData: RuleFormData) {
    if (!currentPolicy.value || currentPolicy.value.id !== policyId) {
      console.error("Cannot add rule, current policy mismatch or not loaded.");
      // You may need to reload the policy if it is not the current one
      await fetchPolicyDetail(policyId);
      if (!currentPolicy.value) return; // Exit if not loaded yet
    }

    error.value = null;
    try {
      const newRule = await api.addRuleToPolicy(policyId, ruleType, ruleData);
      if (ruleType === 'start') {
        currentPolicy.value.start_rules.push(newRule);
      } else {
        currentPolicy.value.stop_rules.push(newRule);
      }
      // Also update the general list if necessary (optional)
      const policyInList = policies.value.find(p => p.id === policyId);
      if (policyInList) {
        if (ruleType === 'start') policyInList.start_rules.push(newRule);
        else policyInList.stop_rules.push(newRule);
      }
    } catch (err: any) {
      error.value = err.message || `Failed to add ${ruleType} rule`;
      console.error(err);
      throw err;
    }
  }

  async function removeRule(policyId: string, ruleId: string, ruleType: 'start' | 'stop') {
    if (!currentPolicy.value || currentPolicy.value.id !== policyId) {
      console.error("Cannot remove rule, current policy mismatch or not loaded.");
      await fetchPolicyDetail(policyId);
      if (!currentPolicy.value) return;
    }

    error.value = null;
    try {
      await api.removeRuleFromPolicy(policyId, ruleId);
      // Remove from local list in current policy
      if (ruleType === 'start') {
        currentPolicy.value.start_rules = currentPolicy.value.start_rules.filter(r => r.id !== ruleId);
      } else {
        currentPolicy.value.stop_rules = currentPolicy.value.stop_rules.filter(r => r.id !== ruleId);
      }
      // Also update the general list (optional)
      const policyInList = policies.value.find(p => p.id === policyId);
      if (policyInList) {
        if (ruleType === 'start') policyInList.start_rules = policyInList.start_rules.filter(r => r.id !== ruleId);
        else policyInList.stop_rules = policyInList.stop_rules.filter(r => r.id !== ruleId);
      }

    } catch (err: any) {
      error.value = err.message || `Failed to remove rule ${ruleId}`;
      console.error(err);
      throw err;
    }
  }

  // TODO: Actions for update, delete, activate policy

  return {
    // State
    policies,
    currentPolicy,
    isLoadingList,
    isLoadingDetail,
    error,
    // Getters
    policyCount,
    activePolicy,
    // Actions
    fetchPolicies,
    fetchPolicyDetail,
    createPolicy,
    addRule,
    removeRule,
  };
});