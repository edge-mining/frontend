<template>
  <admin-layout>
    <div class="grid grid-cols-1 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <MinerCardCarousel />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../ui_kit/tailadmin/layout/AdminLayout.vue'
import MinerCardCarousel from '@/components/miners/MinerCardCarousel.vue';
</script>
