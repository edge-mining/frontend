<template>
    <div id="app" class="flex flex-col min-h-screen bg-gray-100">
        <TheNavbar />
        <main class="flex-grow container mx-auto py-6">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <footer class="bg-gray-700 text-white text-center text-xs p-2">
            Edge Mining Frontend
        </footer>
    </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue';
</script>

<style>
@import "tailwindcss";
@import '@/assets/base.css';

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>