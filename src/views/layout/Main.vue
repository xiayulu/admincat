<script setup lang="ts">
import { ref } from "vue";
import { useMessage, type MenuOption } from "naive-ui";
import { renderIcon } from "@/utils";
import { useRouter } from "vue-router";
import { adminRoot } from "@/router/add";

const message = useMessage();

// 导航菜单
const router = useRouter();
const menuOptions: any = ref([]);
const menu = window.localStorage.getItem("menu");

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

// 用户菜单
const userOptions = [
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon("icon-user")
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: renderIcon("icon-edit")
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon("icon-logout")
  }
];
</script>

<template>
  <n-layout has-sider class="min-h-screen">
    <n-layout-sider class="bg-gray-50 min-h-screen">
      <h1 class="text-xl text-center py-2">后台喵</h1>
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="py-2 pl-2 pr-4">
        <div class="flex items-center">
          <Icon name="icon-hanbaocaidan" size="2em"></Icon>
          <div class="ml-auto flex items-center">
            <n-dropdown :options="userOptions">
              <n-button class="mx-4">Admin</n-button>
            </n-dropdown>
            <Icon name="icon-settings" size="2em"></Icon>
          </div>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 8px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>