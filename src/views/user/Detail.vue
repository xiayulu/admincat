<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
  users detail;
  {{ route.params.userId }}
</template>

<style scoped lang="scss">

</style>