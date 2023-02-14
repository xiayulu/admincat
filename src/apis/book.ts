import http from '@/utils/request';

import type { Book, BookForm } from '@/types/book';


export async function getBooks(page: number = 1, perPage: number = 15) {
  return http.get<any, { data: Book[] }>(`/books?page=${page}&perPage=${perPage}`);
}

export async function createBook(form: BookForm) {
  return http.post<any, { data: Book }>(`/books`, form);
}

export function getBookCategories() {
  return [
    {
      label: '编程',
      icon: "icon-terminal",
      value: 'cs'
    },
    {
      label: "数学",
      icon: "icon-math-compass",
      value: 'math',
    },
    {
      label: '外语',
      icon: "icon-language",
      value: 'lang'
    },
  ];
}
