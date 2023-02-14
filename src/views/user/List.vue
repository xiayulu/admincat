<script setup lang="ts">
import { h, ref } from 'vue'
import { repeat } from 'seemly'
import { NAvatar, NButton, useMessage, type DataTableColumns } from 'naive-ui'

import { getUsers } from '@/apis/user';

import type { User } from '@/types/user';

const message = useMessage();

type RowData = {
  id: number
  name: string
  avatar: string
  createdAt: string
  status: number
  key: number
}

const data = ref<RowData[]>([]);
const pagination = {
  pageSize: 15
};


async function fetchUsers() {
  const { data: users } = await getUsers();
  data.value = users.map((item: User) => {
    return {
      ...item,
      status: 0,
      key: item.id
    }
  })
}

fetchUsers();

const checkedRowKeys = ref<Array<string | number>>([])
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
  },
  {
    title: 'id',
    key: 'id'
  },
  {
    title: '昵称',
    key: 'name'
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(
        NAvatar,
        {
          size: 'small',
          src: row.avatar,
        }
      )
    }
  },
  {
    title: '注册时间',
    key: 'createdAt'
  },
  {
    title: '账号状态',
    key: 'status'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => message.info(JSON.stringify(row))
        },
        { default: () => '封禁' }
      )
    }
  }
]

</script>

<template>
  <div>
    <h3>用户列表</h3>
    <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>