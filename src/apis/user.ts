import http from '@/utils/request';


import type { LoginRes, User } from '@/types/user';

function getMenuData() {
  return [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'icon-shouyedashboard',
      comp: 'dashboard'
    },
    {
      name: '用户管理',
      path: 'users',
      icon: 'icon-friends',
      comp: 'users',
      children: [
        {
          name: '用户详情',
          path: 'users/:userId',
          comp: "userdetail"
          // no menu shows when no icon set
        },
      ]
    },
    {
      name: '书籍管理',
      path: 'books',
      icon: 'icon-hc-course',
      comp: 'books',
      children: [
        {
          name: '书籍详情',
          path: 'books/:bookId',
          comp: "bookdetail"
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