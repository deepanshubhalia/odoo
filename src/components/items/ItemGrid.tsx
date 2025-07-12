import { ItemCard } from './ItemCard'
import type { ItemWithUser } from '@/types/item'

interface ItemGridProps {
  items: ItemWithUser[]
  loading?: boolean
  showOwner?: boolean
  emptyMessage?: string
  className?: string
}

export function ItemGrid({ 
  items, 
  loading = false, 
  showOwner = false, 
  emptyMessage = "No items found",
  className = ""
}: ItemGridProps) {
  if (loading) {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg border border-t-0">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2a2 2 0 012 2v1M6 13h2m8 0h2m0 0V9a2 2 0 00-2-2h-2m0 0V6a2 2 0 00-2-2H8a2 2 0 00-2 2v1" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Found</h3>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          showOwner={showOwner}
        />
      ))}
    </div>
  )
}
