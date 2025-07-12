export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  role: 'USER' | 'ADMIN'
  pointsBalance: number
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser extends User {
  accessToken?: string
}
