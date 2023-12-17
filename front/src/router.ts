import { createRouter,createWebHistory } from 'vue-router';
import Home from "./pages/Home.vue";
import Income from "./pages/Income.vue";
import Purchase from "./pages/Purchase.vue";
 
const routes = [
    { path: '/home', name: 'home', component: Home },
    { path: "/incomes", name: "income", component: Income},
    { path: "/purchases", name: "purchase", component: Purchase},
]
 
const router = createRouter({
    history: createWebHistory(),
    routes,
})
 
export default router;