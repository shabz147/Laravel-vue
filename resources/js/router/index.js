import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path:'/',
        name:'login',
        component: ()=>import('../Pages/auth/login.vue')
    },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
