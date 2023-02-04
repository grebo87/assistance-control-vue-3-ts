import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import CreatePersonalVue from '../views/staff/Create.vue';

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
            children: [
                { 
                    path: 'create',
                    name: 'personal.create',
                    component: CreatePersonalVue 
                },
                {
                    path: '',
                    name:'personal', 
                    component: () => import("../views/staff/List.vue")
                },
                
                { 
                    path: 'edit/:id',
                    name: 'personal.edit', 
                    component: () => import("../views/staff/Edit.vue") 
                }
            ]
        },
        

        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]

});

export default router;