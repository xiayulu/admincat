<script setup lang="ts">
import { useRouter } from "vue-router";
import { addRouterFromMenu } from "@/router/add";

const router = useRouter();

// 实现刷新功能
const menuString = window.localStorage.getItem("menu");
if (menuString) {
  const menu = JSON.parse(menuString);

  addRouterFromMenu(router, menu);

  const hash = window.location.hash;
  if (hash) {
    const path = hash.replace("#", "");
    if (path) {
      router.push(path);
      console.log(router.getRoutes())
    }
  }
}
// 刷新功能结束
</script>

<template>
  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>