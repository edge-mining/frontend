import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import MiningDashboardView from '../views/MiningDashboardView.vue';
import SettingsMiners from '../views/settings/miner/SettingsMiners.vue'
// import PoliciesView from '../views/PoliciesView.vue';
// import PolicyDetailView from '../views/PolicyDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EnergyDashboard',
      component: DashboardView,
      meta: {
        title: 'Energy Dashboard',
      },
    },
    {
      path: '/dashboard/mining',
      name: 'MiningDashboard',
      component: MiningDashboardView,
      meta: {
        title: 'Mining Dashboard',
      },
    },
    {
      path: '/settings/miners',
      name: 'MinersSettings',
      component: SettingsMiners,
      meta: {
        title: 'Mining Settings',
      },
    }
    // {
    //   path: '/',
    //   name: 'Ecommerce',
    //   component: () => import('../views/Ecommerce.vue'),
    //   meta: {
    //     title: 'eCommerce Dashboard',
    //   },
    // },
    // {
    //   path: '/policies',
    //   name: 'policies',
    //   component: PoliciesView,
    // },
    // {
    //   path: '/policies/:policyId', // Dynamic parameter
    //   name: 'policy-detail',
    //   component: PolicyDetailView,
    //   props: true, // Pass policyId as a prop to the component
    // },
    // Add more routes here (e.g. /settings)
  ],
});

export default router;
