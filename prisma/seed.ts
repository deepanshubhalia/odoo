import { PrismaClient, Category, Size, Condition } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const sampleItems = [
  {
    title: "Vintage Levi's 501 Denim Jacket - Size M",
    description: "Authentic vintage Levi's 501 denim jacket in classic indigo blue. This timeless piece features the iconic button-front closure, chest pockets, and adjustable side tabs. Made from 100% cotton denim with a perfect faded wash that gives it character. The jacket shows minimal wear and has been well-maintained. Perfect for layering or as a statement piece. The fit is true to size medium with a slightly boxy cut that's perfect for the vintage aesthetic. Originally bought from a vintage boutique in San Francisco.",
    category: Category.OUTERWEAR,
    size: Size.M,
    condition: Condition.EXCELLENT,
    brand: "Levi's",
    color: "Indigo Blue",
    material: "100% Cotton Denim",
    careInstructions: "Machine wash cold with like colors, hang dry to prevent shrinking",
    lookingFor: "Looking for vintage band tees, leather boots size 9, or cozy knits",
    pointsValue: 85,
    tags: ['vintage', 'denim', 'classic', 'unisex'],
    images: ['https://images.unsplash.com/photo-1544966503-7cc5841f1090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    title: "Zara Floral Midi Dress - Perfect for Spring",
    description: "Beautiful floral midi dress from Zara's recent collection. Features a romantic floral print in soft pastels with a flattering A-line silhouette. The dress has a button-front closure, three-quarter sleeves, and a midi length that hits just below the knee. Made from a lightweight, breathable fabric that's perfect for spring and summer occasions. The dress has only been worn twice and is in excellent condition. Great for brunches, garden parties, or casual office wear. The waist is slightly fitted and very flattering.",
    category: Category.DRESSES,
    size: Size.S,
    condition: Condition.EXCELLENT,
    brand: 'Zara',
    color: "Pastel Floral Print",
    material: "Polyester blend with cotton lining",
    careInstructions: "Hand wash cold or gentle machine cycle, hang dry",
    lookingFor: "Looking for blazers, comfortable sneakers size 7, or summer accessories",
    pointsValue: 60,
    tags: ['floral', 'midi', 'feminine', 'spring'],
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    title: "Nike Air Force 1 Low White - Size 9 - Like New",
    description: "Classic Nike Air Force 1 Low sneakers in pristine white leather. These iconic shoes are a wardrobe staple and go with everything. Features the classic perforated toe box, Nike Swoosh branding, and Air cushioning for all-day comfort. The leather upper is easy to clean and maintain. These have been worn only a few times and show minimal signs of wear. The soles are practically new with excellent tread. Comes from a smoke-free home. No box included, but can provide dust bags for shipping.",
    category: Category.SHOES,
    size: Size.L,
    condition: Condition.EXCELLENT,
    brand: 'Nike',
    color: "White",
    material: "Leather upper with rubber sole",
    careInstructions: "Clean with damp cloth, use sneaker cleaner for deep cleaning",
    lookingFor: "Looking for athleisure wear, hoodies, or other sneakers in size 9",
    pointsValue: 75,
    tags: ['sneakers', 'classic', 'white', 'athletic'],
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    title: "Cozy Oversized Knit Sweater - Cream Color",
    description: "Super soft and cozy oversized knit sweater in a beautiful cream color. Perfect for those chilly autumn and winter days when you want to be comfortable but still look put-together. The sweater features a relaxed fit with dropped shoulders and ribbed cuffs. Made from a wool blend that's incredibly soft and warm. The neutral cream color makes it versatile and easy to style with jeans, leggings, or skirts. This has been one of my favorite pieces but I'm moving to a warmer climate. Machine washable on gentle cycle.",
    category: Category.TOPS,
    size: Size.M,
    condition: Condition.GOOD,
    brand: 'H&M',
    color: "Cream/Off-white",
    material: "60% Wool, 40% Acrylic blend",
    careInstructions: "Machine wash on gentle cycle, lay flat to dry",
    lookingFor: "Looking for summer dresses, sandals, or lightweight tops",
    pointsValue: 45,
    tags: ['cozy', 'knit', 'oversized', 'neutral'],
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    title: "High-Waisted Black Skinny Jeans - Perfect Fit",
    description: "These high-waisted black skinny jeans are a wardrobe essential! They have the perfect amount of stretch for comfort while maintaining their shape throughout the day. The high waist is very flattering and the skinny fit works great with both casual and dressy tops. Made from premium denim with a slight stretch for comfort. The black color is versatile and doesn't fade easily. These jeans have been gently worn and are in great condition with no signs of wear or pilling. They hit at the ankle for a modern look.",
    category: Category.BOTTOMS,
    size: Size.S,
    condition: Condition.GOOD,
    brand: 'Topshop',
    color: "Black",
    material: "98% Cotton, 2% Elastane",
    careInstructions: "Machine wash cold, tumble dry low or hang dry",
    lookingFor: "Looking for crop tops, blouses, or casual shoes size 7",
    pointsValue: 40,
    tags: ['jeans', 'high-waisted', 'skinny', 'black'],
    images: ['https://images.unsplash.com/photo-1541840031508-326b77c9a17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    title: "Designer Silk Scarf - Vintage Pattern",
    description: "Gorgeous designer silk scarf with a beautiful vintage-inspired pattern in rich jewel tones. This luxurious accessory can be worn in so many ways - around the neck, as a headband, tied to a handbag, or even as a top. The silk is high quality and has a beautiful drape and sheen. The pattern features intricate paisley designs in deep blues, emerald greens, and gold accents. This piece adds instant elegance to any outfit. Purchased from a high-end boutique and has been carefully stored. Perfect condition with no snags or pulls.",
    category: Category.ACCESSORIES,
    size: Size.XS,
    condition: Condition.NEW,
    brand: 'Designer Boutique',
    color: "Multi-color (Blue, Green, Gold)",
    material: "100% Silk",
    careInstructions: "Dry clean only or hand wash with silk detergent",
    lookingFor: "Looking for gold jewelry, small handbags, or silk blouses",
    pointsValue: 55,
    tags: ['silk', 'scarf', 'luxury', 'vintage-pattern'],
    images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rewear.com' },
    update: {},
    create: {
      email: 'admin@rewear.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      pointsBalance: 1000,
    },
  })

  // Create sample users
  const userPassword = await bcrypt.hash('password123', 12)
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
        password: userPassword,
        role: 'USER',
        pointsBalance: 150,
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: userPassword,
        role: 'USER',
        pointsBalance: 200,
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike@example.com' },
      update: {},
      create: {
        email: 'mike@example.com',
        name: 'Mike Johnson',
        password: userPassword,
        role: 'USER',
        pointsBalance: 75,
      },
    }),
  ])

  // Create sample items with detailed descriptions
  for (let i = 0; i < sampleItems.length; i++) {
    const item = sampleItems[i]
    const user = users[i % users.length]
    
    await prisma.item.create({
      data: {
        ...item,
        userId: user.id,
      },
    })
  }

  for (let i = 0; i < sampleItems.length; i++) {
    const item = sampleItems[i]
    const user = users[i % users.length]
    
    await prisma.item.create({
      data: {
        ...item,
        userId: user.id,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
