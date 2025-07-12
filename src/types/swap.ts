export interface Swap {
  id: string
  requesterId: string
  ownerId: string
  requesterItemId: string | null
  ownerItemId: string
  swapType: 'DIRECT_SWAP' | 'POINTS_REDEMPTION'
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'
  pointsUsed: number | null
  createdAt: Date
  updatedAt: Date
}

export interface SwapWithDetails extends Swap {
  requester: {
    id: string
    name: string | null
    image: string | null
  }
  owner: {
    id: string
    name: string | null
    image: string | null
  }
  requesterItem?: {
    id: string
    title: string
    images: string[]
  }
  ownerItem: {
    id: string
    title: string
    images: string[]
  }
}
