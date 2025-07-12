import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { ItemWithUser } from '@/types/item'

interface ItemCardProps {
  item: ItemWithUser
  showOwner?: boolean
  className?: string
}

export function ItemCard({ item, showOwner = false, className = '' }: ItemCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NEW':
        return 'success'
      case 'EXCELLENT':
        return 'success'
      case 'GOOD':
        return 'default'
      case 'FAIR':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success'
      case 'PENDING':
        return 'warning'
      case 'SWAPPED':
        return 'secondary'
      case 'REDEEMED':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <Link
      href={`/browse/${item.id}`}
      className={`block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      <div className="relative h-48 bg-gray-200">
        {item.images.length > 0 ? (
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={getStatusColor(item.status)}>
            {item.status.toLowerCase()}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <span>Size {item.size}</span>
          <span>•</span>
          <Badge variant={getConditionColor(item.condition)} className="text-xs">
            {item.condition.toLowerCase()}
          </Badge>
        </div>

        {showOwner && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-600">
                {item.user.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm text-gray-600">{item.user.name}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-semibold">
            {item.pointsValue} points
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {item.category.toLowerCase()}
          </span>
        </div>
        
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
