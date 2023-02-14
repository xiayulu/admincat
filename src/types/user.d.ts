export type LoginRes = {
  token: string
  expiredAt: string
}

export type User = {
  id: number
  name: string
  avatar: string
  bio: string
  isAdmin: boolean
  sex: number
  exp: number
}