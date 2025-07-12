import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { itemSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('❌ Unauthorized: No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('✅ Session found:', session.user.email)

    const body = await request.json()
    console.log('📝 Request body:', body)
    
    const validatedData = itemSchema.parse(body)
    console.log('✅ Data validated successfully')

    // Convert form data to database format
    const item = await db.item.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        size: validatedData.size,
        condition: validatedData.condition,
        brand: validatedData.brand || null,
        color: validatedData.color || null,
        material: validatedData.material || null,
        careInstructions: validatedData.careInstructions || null,
        pointsValue: validatedData.pointsValue || 0,
        tags: validatedData.tags || [],
        images: validatedData.images?.length ? validatedData.images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
        userId: session.user.id,
        status: 'AVAILABLE',
        lookingFor: validatedData.lookingFor || null,
        isApproved: true, // Auto-approve for now
      },
    })

    console.log('✅ Item created successfully:', item.id)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating item:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid data provided' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const size = searchParams.get('size')
    const condition = searchParams.get('condition')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: any = {
      status: 'AVAILABLE'
    }

    if (category) {
      where.category = category
    }

    if (size) {
      where.size = size
    }

    if (condition) {
      where.condition = condition
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [items, total] = await Promise.all([
      db.item.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.item.count({ where }),
    ])

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
