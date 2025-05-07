<template>
    <Teleport to="body">
        <transition name="modal-fade">
            <div v-if="show"
                class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
                @click.self="$emit('close')">
                <div class="bg-white rounded-lg shadow-xl max-w-lg w-full m-4 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">{{ title }}</h3>
                    </div>
                    <div class="p-6">
                        <!-- Content of modal injected here -->
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Modal Title',
    },
});

defineEmits(['close']);

// Close with Esc key
const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.show) {
        //emit('close');
    }
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        document.addEventListener('keydown', closeOnEscape);
        document.body.style.overflow = 'hidden'; // Block body scrolling
    } else {
        document.removeEventListener('keydown', closeOnEscape);
        document.body.style.overflow = ''; // Reset scroll
    }
}, { immediate: true });

// Make sure to remove the event listener when the component is destroyed
// This is handled automatically by Vue 3 for effects created in setup
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>