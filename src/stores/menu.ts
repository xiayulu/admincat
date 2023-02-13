import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { isBrowser } from '@/utils';

export const useMenuStore = defineStore('menu', () => {
  const _menu = ref<any | null>(null);

  function saveMenu(menu: any) {
    _menu.value = menu;

    if (isBrowser()) {
      window.localStorage.setItem("menu", JSON.stringify(menu));
    }
  }

  const menu = computed(() => {
    if (_menu.value) {
      return _menu.value;
    }

    const menuString = window.localStorage.getItem("menu");
    if (menuString) {
      _menu.value = JSON.parse(menuString);
    }

    return _menu.value;
  })

  return { menu, saveMenu }
})
