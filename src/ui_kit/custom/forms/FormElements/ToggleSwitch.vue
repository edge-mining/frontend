<template>
  <div :class="{ 'opacity-50 cursor-not-allowed': props.disabled }">
    <label
      class="flex cursor-pointer select-none items-center gap-3 text-sm font-medium"
      :class="props.disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-400'"
      @click.prevent="handleToggle"
    >
      <div class="relative">
        <input type="checkbox" class="sr-only" :checked="isChecked" :disabled="props.disabled" v-model="isChecked" />
        <div
          class="block transition duration-150 ease-linear h-6 w-11"
          :class="props.disabled ? 'bg-gray-100 pointer-events-none dark:bg-gray-800' : (isChecked ? 'bg-brand-500' : 'bg-gray-200 dark:bg-white/10')"
        >
        </div>
        <div
          class="absolute left-0.5 top-0.5 h-5 w-5 shadow-theme-sm duration-150 ease-linear transform"
          :class="isChecked ? 'translate-x-full bg-white' : 'translate-x-0 bg-white'"
        >
        </div>
      </div>
      {{ props.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  label: string
  modelValue?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true, // Default value for v-model
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    isChecked.value = newValue
  },
)

const handleToggle = () => {
  if (props.disabled) {
    return
  }

  const newState = !isChecked.value
  isChecked.value = newState
  emit('update:modelValue', newState)
}
</script>

<style scoped></style>
