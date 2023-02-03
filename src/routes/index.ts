import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard,
        },
        {
            path: "/personal",
            name: "personal",
            component: () => import("../views/staff/Index.vue"),
        },

        // catch all redirect to home page
        // { path: '/:pathMatch(.*)*', redirect: '/' }
    ]

});

export default router;