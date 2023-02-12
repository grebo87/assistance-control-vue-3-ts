import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import Dashboard from '../views/Dashboard.vue';

import { useAuthStore } from '../stores/auth.store';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/dashboard",
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
            path: '/assistance',
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
        {
            path: '/login',
            name: 'login',
            component: () => import("../views/auth/Login.vue")
        },
        {
            path: '/',
            name: 'asistencia',
            component: Dashboard
        },
        {
            path: '/users',
            name: 'users.index',
            component: () => import('../views/users/Index.vue')
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: () => import('../views/users/Create.vue')
        },
        {
            path: '/users/edit/:id',
            name: 'users.edit',
            component: () => import('../views/users/Edit.vue')
        },
        // catch all redirect to home page
        //{ path: '/:pathMatch(.*)*', redirect: '/dashboard' }
    ]

});


router.beforeEach(async (to) => {

    const authStore = useAuthStore();

    const { loggedIn, returnUrl } = storeToRefs(authStore);
    // redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/login', '/', '/asistencia'];
    const authRequired = publicPages.includes(to.path);

    // console.log("to.path, authRequired, loggedIn.value ======> ", to.path, authRequired, loggedIn.value, !authRequired && loggedIn.value == false);

    
    if (!authRequired && loggedIn.value == false) {
        returnUrl.value = to.fullPath;
        return '/login';
    }

    if (authRequired && loggedIn.value == true) {
        returnUrl.value = to.fullPath;
        // console.log("el usuario esta logueado y nodeberia ver nada de esto");
        return '/dashboard';
    }
});

export default router;