<template>
    <nav class="bg-gray-800 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="text-xl font-bold hover:text-gray-300">Edge Mining</router-link>
            <div class="space-x-4">
                <router-link to="/" class="hover:text-gray-300"
                    active-class="font-semibold border-b-2 border-blue-400">Dashboard</router-link>
                <router-link to="/policies" class="hover:text-gray-300"
                    active-class="font-semibold border-b-2 border-blue-400">Policies</router-link>
                <router-link to="/settings" class="hover:text-gray-300"
                    active-class="font-semibold border-b-2 border-blue-400">Settings</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
// No specific logic for now
</script>

<style scoped>
/* Specific styles if needed */
nav a.router-link-exact-active {
    /* Use active-class in template instead */
}
</style>