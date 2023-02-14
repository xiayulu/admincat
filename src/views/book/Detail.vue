<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
  <div>课程活动</div>
  {{ route.params.bookId }}
</template>

<style scoped lang="scss">

</style>