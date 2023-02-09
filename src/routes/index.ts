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
        {
            path:'/assistance',
            name: 'assistance.index',
            component: () => import("../views/assistance/Index.vue")
        },
        {
            path: '/absences',
            name: 'absences.index',
            component: () => import("../views/absences/Index.vue")
        },
        {
            path: '/absences/create',
            name: 'absences.create',
            component: () => import("../views/absences/Create.vue")
        },
        {
            path: '/absences/edit/:id',
            name: 'absences.edit',
            component: () => import("../views/absences/Edit.vue")
        },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]

});

export default router;