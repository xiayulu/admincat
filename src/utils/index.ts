import Icon from "@/components/Icon.vue";
import { h } from 'vue';
import Cookies from "js-cookie";


export function renderIcon(name: string) {
  return () => h(Icon, { name },)
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}



export function saveToCookie(name: string, value: string, expiredAt: string) {
  Cookies.set(name, value, { expires: new Date(expiredAt), secure: true, sameSite: 'strict' });
}