<script setup lang="ts">
defineProps<{
  about: string
}>()
</script>
<template>
  <n-popover trigger="hover" :show-arrow="false">
    <template #trigger>
      <n-button> 查看细节 </n-button>
    </template>
    <span>{{ about }}</span>
  </n-popover>
</template>