<script  lang="ts" setup>
// types
export interface Props {
  name: string,
  size?: string,
}

//vars
withDefaults(defineProps<Props>(), {
  size: '1em',
});
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style scoped>
.icon {
  width: v-bind(size);
  height: v-bind(size);
  vertical-align: -0.15em;
  fill: currentcolor;
  overflow: hidden;
}
</style>