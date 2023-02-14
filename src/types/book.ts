export type Book = {
  id: number
  name: string
  cover: string
  about: string
  hard: number
  status: number
  category: string
  repoName: string
  createdAt: string
}

export type BookForm = {
  userId: number
  name: string,
  about: string,
  category: string
  hard: number,
  cover: string,
}