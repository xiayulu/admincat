<script setup lang="ts">
import { h, ref } from 'vue'
import { NAvatar, NButton, useMessage, type DataTableColumns } from 'naive-ui'
import { getUsers } from '@/apis/user';
import type { User } from '@/types/user';
import { RouterLink } from 'vue-router';

const message = useMessage();

type RowData = {
  id: number
  name: string
  avatar: string
  createdAt: string
  bio: string
  isAdmin: boolean
  sex: number
  exp: number
  status: number
}

const data = ref<RowData[]>([]);
const pagination = {
  pageSize: 15
};

function rowKey(rowData: RowData) {
  return rowData.id
}

async function fetchUsers() {
  const { data: users } = await getUsers();
  data.value = users.map((item: User) => {
    return {
      ...item,
      status: 0,
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
    key: 'name',
    render(row) {
      return h(
        RouterLink,
        {
          to: {
            path: `/admin/users/${row.id}`
          }
        },
        { default: () => row.name }
      )
    }
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
    <n-data-table v-model:checked-row-keys="checkedRowKeys" :row-key="rowKey" :columns="columns" :data="data"
      :pagination="pagination" />
  </div>
</template>