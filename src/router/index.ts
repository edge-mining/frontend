import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import PoliciesView from '../views/PoliciesView.vue';
import PolicyDetailView from '../views/PolicyDetailView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: DashboardView,
        },
        {
            path: '/policies',
            name: 'policies',
            component: PoliciesView,
        },
        {
            path: '/policies/:policyId', // Dynamic parameter
            name: 'policy-detail',
            component: PolicyDetailView,
            props: true, // Pass policyId as a prop to the component
        },
        // Add more routes here (e.g. /settings)
    ],
});

export default router;