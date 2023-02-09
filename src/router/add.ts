import type { Router } from 'vue-router';
import components from "@/views";

export const adminRoot = 'admin';

export function addRouterFromMenu(router: Router, menu: any[], parents: string[]) {
  menu.forEach(item => {
    const newParents = [...parents, `${item.key}`];
    if (Object.prototype.hasOwnProperty.call(item, 'children')
      && item.children
      && item.children.length > 0) {
      router.addRoute(parents.join(""), {
        path: `${item.key}`,
        name: newParents.join(""),
        component: components[newParents.join("").replace(adminRoot, "")]
      })
      addRouterFromMenu(router, item.children, newParents);
    } else {
      router.addRoute(parents.join(""), {
        path: `${item.key}`,
        name: newParents.join(""),
        component: components[newParents.join("").replace(adminRoot, "")]
      })
    }
  })
}
