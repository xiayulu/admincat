import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie';
import { isBrowser, saveToCookie } from '@/utils';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';

export const useTokenStore = defineStore('token', () => {
  const _token = ref("");

  function saveToken(token: string, expiredAt: string) {
    _token.value = token;
    if (isBrowser()) {
      saveToCookie(AUTH_TOKEN_COOKIE_NAME, token, expiredAt);
    }
  }

  const token = computed(() => {
    if (_token.value) {
      return _token.value;
    }

    return Cookies.get(AUTH_TOKEN_COOKIE_NAME);
  })

  return { token, saveToken }
})