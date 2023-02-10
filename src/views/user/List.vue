<script setup lang="ts">
import { h, ref } from 'vue'
import { repeat } from 'seemly'
import { NButton, useMessage, type DataTableColumns } from 'naive-ui'

const message = useMessage();

type RowData = {
  name: string
  age: number
  address: string
  key: number
}

const data = repeat(46, undefined).map<RowData>((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  key: index
}))

const checkedRowKeys = ref<Array<string | number>>([])
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    options: [
      'all',
      'none',
      {
        label: 'Select first 2 rows',
        key: 'f2',
        onSelect: (pageData) => {
          checkedRowKeys.value = pageData
            .map((row) => row.key)
            .slice(0, 2)
        }
      }
    ],
    disabled(row) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  },
  {
    title: 'Action',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => message.info(JSON.stringify(row))
        },
        { default: () => 'Send Email' }
      )
    }
  }
]

const pagination = {
  pageSize: 6
};
</script>

<template>
  <div>
    <h3>用户列表</h3>
    <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>