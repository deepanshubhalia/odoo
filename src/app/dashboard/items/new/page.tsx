'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Badge } from '@/components/ui/Badge'
import { itemSchema, type ItemInput } from '@/lib/validations'
import { Header } from '@/components/layout/HeaderAuth'

const categories = [
  'TOPS',
  'BOTTOMS',
  'DRESSES',
  'OUTERWEAR',
  'SHOES',
  'ACCESSORIES'
]

const sizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL'
]

const conditions = [
  'NEW',
  'EXCELLENT',
  'GOOD',
  'FAIR'
]

export default function ListItemPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const router = useRouter()
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      category: 'TOPS',
      size: 'M',
      condition: 'GOOD',
    }
  })

  const onSubmit = async (data: ItemInput) => {
    if (!session) {
      setError('root', { message: 'You must be logged in to list an item' })
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images: uploadedImages.length > 0 ? uploadedImages : [],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create item')
      }

      router.push('/dashboard')
    } catch (error) {
      setError('root', {
        message: 'Failed to list item. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">List Your Item</h1>
            <p className="text-gray-600 mt-2">
              Share your pre-loved clothing with the ReWear community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div>
                <Input
                  label="Item Title"
                  placeholder="e.g., Vintage Denim Jacket - Size M"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your item in detail - brand, style, materials, fit, any special features..."
                  rows={4}
                  {...register('description')}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select
                    label="Category"
                    {...register('category')}
                    error={errors.category?.message}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Select
                    label="Size"
                    {...register('size')}
                    error={errors.size?.message}
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Select
                    label="Condition"
                    {...register('condition')}
                    error={errors.condition?.message}
                  >
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition.charAt(0).toUpperCase() + condition.slice(1)}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <Input
                  label="Brand (Optional)"
                  placeholder="e.g., Zara, H&M, Vintage"
                  {...register('brand')}
                  error={errors.brand?.message}
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
              <p className="text-sm text-gray-600">
                Add up to 5 photos. The first photo will be the main image.
              </p>
              
              <ImageUpload
                onImagesChange={setUploadedImages}
                maxImages={5}
                existingImages={uploadedImages}
              />
            </div>

            {/* Exchange Preferences */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Exchange Preferences</h2>
              
              <div>
                <Input
                  label="Points Value"
                  type="number"
                  placeholder="50"
                  {...register('pointsValue', { valueAsNumber: true })}
                  error={errors.pointsValue?.message}
                />
                <p className="text-sm text-gray-600 mt-1">
                  How many points should this item be worth?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Looking For
                </label>
                <Textarea
                  placeholder="Describe what you'd like to swap for - specific items, styles, sizes, or brands..."
                  rows={3}
                  {...register('lookingFor')}
                  className={errors.lookingFor ? 'border-red-500' : ''}
                />
                {errors.lookingFor && (
                  <p className="mt-1 text-sm text-red-600">{errors.lookingFor.message}</p>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
              
              <div>
                <Input
                  label="Color"
                  placeholder="e.g., Navy Blue, Black, Floral Print"
                  {...register('color')}
                  error={errors.color?.message}
                />
              </div>

              <div>
                <Input
                  label="Material (Optional)"
                  placeholder="e.g., 100% Cotton, Polyester Blend"
                  {...register('material')}
                  error={errors.material?.message}
                />
              </div>

              <div>
                <Textarea
                  label="Care Instructions (Optional)"
                  placeholder="Machine wash cold, hang dry..."
                  rows={2}
                  {...register('careInstructions')}
                  className={errors.careInstructions ? 'border-red-500' : ''}
                />
              </div>
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{errors.root.message}</p>
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Listing Item...' : 'List Item'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
