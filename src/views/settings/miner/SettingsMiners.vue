<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <MinerList :miners="miners"/>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useMinerStore } from '@/stores/miners';
import AdminLayout from "@/ui_kit/tailadmin/layout/AdminLayout.vue";
import PageBreadcrumb from "@/ui_kit/tailadmin/common/PageBreadcrumb.vue";
import MinerList from "@/components/miners/MinerList.vue"
import MinerCard from "@/components/miners/MinerCard.vue"

const currentPageTitle = ref("Setup Miners");

const minerStore = useMinerStore();
const { miners, isLoadingList, error } = storeToRefs(minerStore);


onMounted(() => {
  minerStore.fetchMiners();
});

</script>

<style></style>
