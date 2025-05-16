<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics />
        <monthly-target />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale />
      </div>

      <div class="col-span-12">
        <statistics-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../ui_kit/tailadmin/layout/AdminLayout.vue'
import EcommerceMetrics from '../ui_kit/tailadmin/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '../ui_kit/tailadmin/ecommerce/MonthlySale.vue'
import MonthlySale from '../ui_kit/tailadmin/ecommerce/MonthlyTarget.vue'
import CustomerDemographic from '../ui_kit/tailadmin/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '../ui_kit/tailadmin/ecommerce/StatisticsChart.vue'
import RecentOrders from '../ui_kit/tailadmin/ecommerce/RecentOrders.vue'
export default {
  components: {
    AdminLayout,
    EcommerceMetrics,
    MonthlyTarget,
    MonthlySale,
    CustomerDemographic,
    StatisticsChart,
    RecentOrders,
  },
  name: 'Dashboard',
}
</script>
