import { createRouter, createWebHashHistory } from 'vue-router'
import { adminRoot } from './add';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "login", component: () => import("@/views/Login.vue") },
    { path: "/admin", name: adminRoot, component: () => import("@/views/layout/Main.vue") },
  ]
})

export default router
