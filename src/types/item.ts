export interface Item {
  id: string
  userId: string
  title: string
  description: string
  category: 'TOPS' | 'BOTTOMS' | 'DRESSES' | 'OUTERWEAR' | 'ACCESSORIES' | 'SHOES'
  type: string
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  condition: 'NEW' | 'EXCELLENT' | 'GOOD' | 'FAIR'
  tags: string[]
  images: string[]
  status: 'AVAILABLE' | 'PENDING' | 'SWAPPED' | 'REDEEMED'
  pointsValue: number
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ItemWithUser extends Item {
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

export interface ItemFilter {
  category?: string
  size?: string
  condition?: string
  minPoints?: number
  maxPoints?: number
  search?: string
}
