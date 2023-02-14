<script setup lang="ts">
import { NButton, NImage, type DataTableColumns } from 'naive-ui';
import { ref, reactive, h } from 'vue'
import BookAbout from '@/components/BookAbout.vue';
import CreateBook from '@/snippet/CreateBook.vue';
import { getBooks } from '@/apis/book';
import type { Book } from '@/types/book';

// start show table data
type RowData = {
  id: number
  name: string
  about: string
  cover: string
  category: string
  hard: number
  repoName: string
  createdAt: string
  status: number
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
    title: 'RepoName',
    key: 'repoName',
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
    }
  });
  loadingRef.value = false;
}

fetchBooks();

function rowKey(rowData: RowData) {
  return rowData.id
}

async function handlePageChange(currentPage: number) {
  if (!loadingRef.value) {
    await fetchBooks(currentPage, paginationReactive.pageSize);
  }
}
// end show table data

// create new book
const showCreateModal = ref(false);

function handleCreateModal() {
  showCreateModal.value = !showCreateModal.value;
}

async function handleCreateSuccess() {
  showCreateModal.value = false;
  await fetchBooks(paginationReactive.page, paginationReactive.pageSize);
}
// end create new book
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
