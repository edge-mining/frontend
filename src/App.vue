<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from './ui_kit/tailadmin/layout/ThemeProvider.vue'
import SidebarProvider from './ui_kit/tailadmin/layout/SidebarProvider.vue'
</script>