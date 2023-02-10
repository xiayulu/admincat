<script setup lang="ts">
import { h, ref } from 'vue'
import { repeat } from 'seemly'
import { NAvatar, NButton, useMessage, type DataTableColumns } from 'naive-ui'

const message = useMessage();

type RowData = {
  id: number
  name: string
  avatar: string
  createdAt: string
  status: number
  key: number
}

const data = repeat(46, undefined).map<RowData>((_, index) => ({
  id: index,
  name: '用户' + index,
  avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  createdAt: Date().toString(),
  status: Math.floor(Math.random() * 3),
  key: index
}))

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

const pagination = {
  pageSize: 10
};
</script>

<template>
  <div>
    <h3>用户列表</h3>
    <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>