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

export function login(username: string, password: string) {
  if (username === '123' && password === '123') {
    return {
      code: 200,
      msg: "ok",
      data: {
        token: "123456",
        menu: getMenuData()
      },
    }
  }

  return {
    code: "10086",
    msg: "ok",
    data: null,
  }
}