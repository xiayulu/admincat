import http from '@/utils/request';


import type { LoginRes, User } from '@/types/user';

function getMenuData() {
  return [
    {
      label: "Dashboard",
      key: 'dashboard',
      icon: 'icon-homefill',
    },
    {
      label: '用户管理',
      key: 'user',
      icon: 'icon-homefill',
      children: [
        {
          label: '用户列表',
          key: 'list',
          icon: 'icon-HTML-fill'
        },
        {
          label: '用户资产',
          key: 'assert',
          icon: 'icon-user'
        }
      ]
    },
    {
      label: '书籍管理',
      key: 'book',
      icon: 'icon-homefill',
      children: [
        {
          label: '书籍列表',
          key: 'list',
          icon: 'icon-HTML-fill'
        },
        {
          label: '课程活动',
          key: 'activity',
          icon: 'icon-user'
        }
      ]
    },
  ]
}

export async function login(name: string, password: string) {
  try {
    const { data } = await http.post<unknown, { data: LoginRes }>(`/login`, { name, password, });
    return {
      code: 0,
      msg: "ok",
      data: {
        token: data.token,
        expiredAt: data.expiredAt,
        menu: getMenuData()
      },
    }
  } catch (e) {
    return {
      code: -1,
      msg: "login failed",
      data: null,
    }
  }
}

export async function getUsers(page: number = 1, perPage: number = 15) {
  return http.get<unknown, { data: User[] }>(`/users?page=${page}&perPage=${perPage}`);
}