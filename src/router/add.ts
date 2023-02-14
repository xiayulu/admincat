import type { Router } from 'vue-router';
import components from "@/views";

export const adminRoot = 'admin';

export function addRouterFromMenu(router: Router, menu: any[]) {
  menu.forEach(item => {
    router.addRoute("admin", {
      path: item.path,
      name: item.name,
      component: components[item.comp]
    });

    if (item.children && item.children.length > 0) {
      addRouterFromMenu(router, item.children);
    }
  })
}
