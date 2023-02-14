<script setup lang="ts">
import { NButton, NImage, type DataTableColumns } from 'naive-ui';
import { ref, reactive, onMounted, h } from 'vue'
import BookAbout from '@/components/BookAbout.vue';
import CreateBook from '@/snippet/CreateBook.vue';
import type { Book } from '@/types/book';
import { getBooks } from '@/apis/book';

type RowData = {
  id: number
  name: string
  about: string
  cover: string
  category: string
  hard: string
  repoName: string
  createdAt: string
  status: number
  key: number
}


const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
  },
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '描述',
    key: 'about',
    render(row) {
      return h(
        BookAbout,
        {
          about: row.about
        }
      )
    }
  },
  {
    title: '封面',
    key: 'cover',
    render(row) {
      return h(
        NImage,
        {
          width: '24',
          src: row.cover,
        }
      )
    }
  },
  {
    title: '一级分类',
    key: 'category',
  },
  {
    title: '二级分类',
    key: 'subcate',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createdAt',
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => alert(JSON.stringify(row))
        },
        { default: () => '封禁' }
      )
    }
  }
]

const data = ref<RowData[]>([]);
const loadingRef = ref(true)
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  prefix({ itemCount }: any) {
    return `Total is ${itemCount}.`
  }
})

async function fetchBooks(page: number = 1, pageSize: number = 15) {
  loadingRef.value = true;
  const { data: books } = await getBooks(page, pageSize);
  data.value = books.map((item: Book) => {
    return {
      ...item,
      status: 0,
      key: item.id
    }
  });
  loadingRef.value = false;
}

fetchBooks();

// const data = Array.from({ length: 987 }).map((_, index) => {
//   return {
//     id: index + 1,
//     name: `Book ${index}`,
//     about: `Set width="trigger" to make popover's width the same as its trigger.`,
//     cover: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
//     category: "数学",
//     subcate: "微积分",
//     status: 1,
//     createdAt: new Date().toISOString()
//   }
// })


// function query(page: number, pageSize = 15) {
//   return new Promise((resolve) => {
//     const pagedData = data.slice((page - 1) * pageSize, page * pageSize)
//     const total = data.length
//     const pageCount = Math.ceil(data.length / pageSize)
//     setTimeout(
//       () =>
//         resolve({
//           pageCount,
//           data: pagedData,
//           total
//         }),
//       500
//     )
//   })
// }




// onMounted(() => {
//   query(
//     paginationReactive.page,
//     paginationReactive.pageSize,
//   ).then((data: any) => {
//     dataRef.value = data.data
//     paginationReactive.pageCount = data.pageCount
//     paginationReactive.itemCount = data.total
//     loadingRef.value = false
//   })
// })


function rowKey(rowData: any) {
  return rowData.column1
}


async function handlePageChange(currentPage: number) {
  if (!loadingRef.value) {
    await fetchBooks(currentPage, paginationReactive.pageSize);
  }
}

const showCreateModal = ref(false);

function handleCreateModal() {
  showCreateModal.value = !showCreateModal.value;
}

async function handleCreateSuccess() {
  showCreateModal.value = false;
  await fetchBooks(paginationReactive.page, paginationReactive.pageSize);
}
</script>

<template>
  <div>
    <NButton size="small" class="mb-2" @click="handleCreateModal">Create</NButton>
    <n-data-table remote ref="table" :columns="columns" :data="data" :loading="loadingRef"
      :pagination="paginationReactive" :row-key="rowKey" @update:page="handlePageChange" />

    <n-modal v-model:show="showCreateModal">
      <n-card style="width: 600px" title="Create Book" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <CreateBook @success="handleCreateSuccess" />
      </n-card>
    </n-modal>
  </div>
</template>
