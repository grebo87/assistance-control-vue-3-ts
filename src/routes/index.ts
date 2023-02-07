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
            component: () => import("../views/staff/Index.vue"),
            name: 'personal.index'
        },
        {
            path: '/personal/create',
            name: 'personal.create',
            component: () => import('../views/staff/Create.vue')
        },
        {
            path: '/personal/edit/:id',
            name: 'personal.edit',
            component: () => import("../views/staff/Edit.vue")
        },


        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]

});

export default router;