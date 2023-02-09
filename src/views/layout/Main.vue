<script setup lang="ts">
import { ref } from "vue";
import { useMessage, type MenuOption } from "naive-ui";
import { renderIcon } from "@/utils";
import { useRouter } from "vue-router";
import { adminRoot } from "@/router/add";

const router = useRouter();
const menuOptions: any = ref([]);
const menu = window.localStorage.getItem("menu");
const message = useMessage();

function getMenuOptions(menu: any[], parents: string[]): any {
  return menu.map(item => {
    const newParents = [...parents, item.key];
    if (Object.prototype.hasOwnProperty.call(item, 'children')
      && item.children
      && item.children.length > 0) {
      return {
        label: item.label,
        key: newParents.join("/"),
        icon: renderIcon(item.icon),
        children: getMenuOptions(item.children, newParents),
      }
    } else {
      return {
        label: item.label,
        key: newParents.join("/"),
        icon: renderIcon(item.icon),
      }
    }
  })
}

if (menu) {
  menuOptions.value = getMenuOptions(JSON.parse(menu), [`/${adminRoot}`]);
}

function handleUpdateValue(key: string, _item: MenuOption) {
  router.push(key);
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 24px;">
      <h1>管理后台</h1>
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
    </n-layout-sider>
    <router-view></router-view>
  </n-layout>
</template>