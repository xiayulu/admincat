import Icon from "@/components/Icon.vue";
import { h } from 'vue';


export function renderIcon(name: string) {
  return () => h(Icon, { name },)
}