'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ItemFilter } from '@/types/item'

interface ItemFilterProps {
  onFilterChange: (filters: ItemFilter) => void
  initialFilters?: ItemFilter
}

export function ItemFilter({ onFilterChange, initialFilters = {} }: ItemFilterProps) {
  const [filters, setFilters] = useState<ItemFilter>(initialFilters)

  const updateFilter = (key: keyof ItemFilter, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value || undefined,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters: ItemFilter = {}
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <Input
          placeholder="Search for items..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      {/* Category, Size, Condition */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="TOPS">Tops</option>
            <option value="BOTTOMS">Bottoms</option>
            <option value="DRESSES">Dresses</option>
            <option value="OUTERWEAR">Outerwear</option>
            <option value="ACCESSORIES">Accessories</option>
            <option value="SHOES">Shoes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filters.size || ''}
            onChange={(e) => updateFilter('size', e.target.value)}
          >
            <option value="">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filters.condition || ''}
            onChange={(e) => updateFilter('condition', e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="NEW">New</option>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
          </select>
        </div>
      </div>

      {/* Points Range */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Points
          </label>
          <Input
            type="number"
            placeholder="0"
            value={filters.minPoints || ''}
            onChange={(e) => updateFilter('minPoints', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Points
          </label>
          <Input
            type="number"
            placeholder="100"
            value={filters.maxPoints || ''}
            onChange={(e) => updateFilter('maxPoints', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
