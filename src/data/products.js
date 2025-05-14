// Format price to IDR
export const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }
  
  // Featured products for the home page
  export const featuredProducts = [
    {
      id: "1",
      name: "Aventis Hiking Backpack",
      description: "Lightweight and durable for all your adventures",
      price: 1250000,
      image: "/images/products/hiking-backpack-product.jpg",
      rating: 5,
      reviews: 24,
      isNew: true,
    },
    {
      id: "2",
      name: "Pro Trekking Poles",
      description: "Adjustable carbon fiber poles for stability",
      price: 850000,
      image: "/images/products/tracking-pole-product.jpg",
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: "3",
      name: "Waterproof Tent 2-Person",
      description: "Easy setup and weather resistant design",
      price: 2100000,
      image: "/images/products/2p-tent-product.jpg",
      rating: 5,
      reviews: 32,
      isNew: true,
    },
    {
      id: "4",
      name: "Insulated Water Bottle",
      description: "Keeps drinks hot or cold for 24 hours",
      price: 350000,
      image: "/images/products/insulated-water-bottle-product.jpg",
      rating: 4,
      reviews: 41,
      isNew: false,
    },
  ]
  
  // Categories for the home page and filtering
  export const categories = [
    { name: "Hiking", count: 42 },
    { name: "Camping", count: 38 },
    { name: "Climbing", count: 24 },
    { name: "Clothing", count: 56 },
    { name: "Footwear", count: 31 },
    { name: "Accessories", count: 45 },
  ]
  
  // Brands for filtering
  export const brands = [
    { name: "Aventis", count: 28 },
    { name: "Mountain Pro", count: 24 },
    { name: "OutdoorElite", count: 19 },
    { name: "TrailMaster", count: 16 },
    { name: "WildernessGear", count: 14 },
    { name: "SummitClimb", count: 12 },
  ]
  
  // All products for the products page
  export const allProducts = [
    {
      id: "1",
      name: "Aventis Hiking Backpack 45L",
      price: 1250000,
      originalPrice: 1500000,
      discount: 17,
      rating: 4.8,
      reviewCount: 124,
      image: "/images/products/hiking-backpack-product.jpg",
      isNew: true,
      isBestSeller: false,
      category: "Hiking",
      brand: "Aventis",
    },
    {
      id: "2",
      name: "TrailMaster Trekking Poles",
      price: 450000,
      originalPrice: 550000,
      discount: 18,
      rating: 4.6,
      reviewCount: 87,
      image: "/images/products/treking-pole-product1.webp",
      isNew: false,
      isBestSeller: true,
      category: "Hiking",
      brand: "TrailMaster",
    },
    {
      id: "3",
      name: "OutdoorElite Camping Tent 2-Person",
      price: 2100000,
      originalPrice: 2500000,
      discount: 16,
      rating: 4.7,
      reviewCount: 65,
      image: "/images/products/2p-tent-product.jpg",
      isNew: true,
      isBestSeller: false,
      category: "Camping",
      brand: "OutdoorElite",
    },
    {
      id: "4",
      name: "WildernessGear Sleeping Bag",
      price: 800000,
      originalPrice: 1000000,
      discount: 20,
      rating: 4.5,
      reviewCount: 45,
      image: "/images/products/sleeping-bag-product.jpg",
      isNew: false,
      isBestSeller: false,
      category: "Camping",
      brand: "WildernessGear",
    },
    {
      id: "5",
      name: "Mountain Pro Climbing Harness",
      price: 650000,
      originalPrice: 800000,
      discount: 19,
      rating: 4.4,
      reviewCount: 32,
      image: "/images/products/climbing-harness-product.jpg",
      isNew: true,
      isBestSeller: false,
      category: "Climbing",
      brand: "Mountain Pro",
    },
    {
      id: "6",
      name: "Aventis Waterproof Jacket",
      price: 950000,
      originalPrice: 1200000,
      discount: 21,
      rating: 4.9,
      reviewCount: 78,
      image: "/images/products/waterproof-jacket-product.jpg",
      isNew: false,
      isBestSeller: true,
      category: "Clothing",
      brand: "Aventis",
    },
    {
      id: "7",
      name: "TrailMaster Hiking Boots",
      price: 1350000,
      originalPrice: 1600000,
      discount: 16,
      rating: 4.6,
      reviewCount: 53,
      image: "/images/products/trail-master-shoes.jpg",
      isNew: false,
      isBestSeller: false,
      category: "Footwear",
      brand: "TrailMaster",
    },
    {
      id: "8",
      name: "SummitClimb Carabiners Set",
      price: 250000,
      originalPrice: 300000,
      discount: 17,
      rating: 4.3,
      reviewCount: 29,
      image: "/images/products/climbing-harness-product.jpg",
      isNew: true,
      isBestSeller: false,
      category: "Climbing",
      brand: "SummitClimb",
    },
    {
      id: "9",
      name: "OutdoorElite Camping Stove",
      price: 550000,
      originalPrice: 700000,
      discount: 21,
      rating: 4.5,
      reviewCount: 41,
      image: "/images/products/camping-stove-product.jpg",
      isNew: false,
      isBestSeller: false,
      category: "Camping",
      brand: "OutdoorElite",
    },
    {
      id: "10",
      name: "WildernessGear Headlamp",
      price: 300000,
      originalPrice: 400000,
      discount: 25,
      rating: 4.7,
      reviewCount: 67,
      image: "/images/products/headlamp-product.jpg",
      isNew: true,
      isBestSeller: false,
      category: "Accessories",
      brand: "WildernessGear",
    },
    {
      id: "11",
      name: "Mountain Pro Trekking Pants",
      price: 700000,
      originalPrice: 900000,
      discount: 22,
      rating: 4.4,
      reviewCount: 36,
      image: "/images/products/carabiner-set-product.jpg",
      isNew: false,
      isBestSeller: true,
      category: "Clothing",
      brand: "Mountain Pro",
    },
    {
      id: "12",
      name: "Aventis Insulated Water Bottle",
      price: 350000,
      originalPrice: 450000,
      discount: 22,
      rating: 4.8,
      reviewCount: 92,
      image: "/images/products/insulated-water-bottle-product.jpg",
      isNew: false,
      isBestSeller: false,
      category: "Accessories",
      brand: "Aventis",
    },
  ];
  
  // Detailed product data
  export const productDetails = {
    1: {
      id: "1",
      name: "Aventis Hiking Backpack 45L",
      description:
        "The Aventis Hiking Backpack 45L is designed for serious hikers and backpackers. With its durable construction, comfortable carrying system, and thoughtful organization, this pack is ready for your next adventure.",
      price: 1250000,
      originalPrice: 1500000,
      discount: 17,
      rating: 4.8,
      reviewCount: 124,
      stock: 15,
      sku: "AVT-BP-45L-BLU",
      brand: "Aventis",
      category: "Hiking",
      tags: ["Backpack", "Hiking", "Outdoor", "45L"],
      features: [
        "45L capacity ideal for multi-day hikes",
        "Durable water-resistant nylon construction",
        "Adjustable suspension system for custom fit",
        "Multiple access points to main compartment",
        "Integrated rain cover",
        "Hydration reservoir compatible",
        "Multiple external attachment points",
        "Padded hip belt with zippered pockets",
      ],
      specifications: {
        Volume: "45 Liters",
        Weight: "1.8 kg",
        Dimensions: "68 x 35 x 25 cm",
        Material: "Ripstop Nylon",
        "Frame Type": "Internal Aluminum Frame",
        Warranty: "Lifetime Warranty",
        "Water Resistant": "Yes",
        "Number of Pockets": "8",
        "Color Options": "Blue, Black, Green",
      },
      colors: [
        { name: "Blue", value: "#1e40af" },
        { name: "Black", value: "#171717" },
        { name: "Green", value: "#166534" },
      ],
      images: [
        "/images/products/hiking-backpack-product.jpg",
        "/images/products/hiking-backpack-product.jpg",
        "/images/products/hiking-backpack-product.jpg",
        "/images/products/hiking-backpack-product.jpg",
      ],
      reviews: [
        {
          id: "1",
          user: {
            name: "John Doe",
            avatar: "/placeholder.svg?height=100&width=100&text=JD",
          },
          rating: 5,
          date: "May 15, 2023",
          title: "Perfect for my trekking needs",
          content:
            "I've used this backpack on several multi-day hikes and it's been fantastic. Comfortable to wear even when fully loaded, and the organization is well thought out.",
        },
        {
          id: "2",
          user: {
            name: "Sarah Smith",
            avatar: "/placeholder.svg?height=100&width=100&text=SS",
          },
          rating: 4,
          date: "April 28, 2023",
          title: "Great quality but slightly heavy",
          content:
            "The quality of this backpack is excellent and it has plenty of space. My only complaint is that it's a bit heavier than I expected. Still, the comfort makes up for the extra weight.",
        },
        {
          id: "3",
          user: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=100&width=100&text=MJ",
          },
          rating: 5,
          date: "March 12, 2023",
          title: "Survived a downpour!",
          content:
            "Got caught in heavy rain during my hike in Sumatra. The integrated rain cover was easy to deploy and kept all my gear dry. The water-resistant exterior also helped. Highly recommend!",
        },
      ],
      relatedProducts: ["2", "3", "4", "5"],
    },
    2: {
      id: "2",
      name: "TrailMaster Trekking Poles",
      description: "Adjustable carbon fiber poles for stability on any terrain. Lightweight yet durable design.",
      price: 450000,
      originalPrice: 550000,
      discount: 18,
      rating: 4.6,
      reviewCount: 87,
      stock: 25,
      sku: "TM-TP-CF-BLK",
      brand: "TrailMaster",
      category: "Hiking",
      tags: ["Trekking Poles", "Hiking", "Outdoor"],
      features: [
        "Carbon fiber construction",
        "Adjustable height from 65cm to 135cm",
        "Quick-lock mechanism",
        "Ergonomic cork handles",
        "Removable baskets for different terrains",
        "Anti-shock system",
        "Foldable design for easy storage",
      ],
      specifications: {
        Material: "Carbon Fiber",
        Weight: "220g per pole",
        "Extended Length": "135 cm",
        "Collapsed Length": "65 cm",
        "Grip Material": "Cork",
        "Tip Material": "Tungsten Carbide",
        "Color Options": "Black, Red, Blue",
      },
      colors: [
        { name: "Black", value: "#171717" },
        { name: "Red", value: "#dc2626" },
        { name: "Blue", value: "#1e40af" },
      ],
      images: [
        "/images/products/treking-pole-product1.webp",
        "/images/products/treking-pole-product2.webp",
        "/images/products/treking-pole-product3.webp",
        "/images/products/treking-pole-product4.webp",
      ],
      reviews: [
        {
          id: "1",
          user: {
            name: "Alex Hiker",
            avatar: "/placeholder.svg?height=100&width=100&text=AH",
          },
          rating: 5,
          date: "June 10, 2023",
          title: "Game changer for steep terrain",
          content:
            "These poles have completely changed my hiking experience. They provide excellent stability on steep descents and take pressure off my knees. The cork handles are comfortable even on long hikes.",
        },
        {
          id: "2",
          user: {
            name: "Lisa Trekker",
            avatar: "/placeholder.svg?height=100&width=100&text=LT",
          },
          rating: 4,
          date: "May 22, 2023",
          title: "Lightweight but durable",
          content:
            "I've been using these poles for several months now and they've held up well. The locking mechanism is secure and the carbon fiber construction makes them very lightweight. My only complaint is that the wrist straps could be more comfortable.",
        },
      ],
      relatedProducts: ["1", "6", "7", "11"],
    },
    // Add more detailed product data as needed
  }
  
  // Helper function to get product details by ID
  export function getProductById(id) {
    return productDetails[id] || null
  }
  
  // Helper function to get related products
  export function getRelatedProducts(productId) {
    const product = getProductById(productId)
    if (!product || !product.relatedProducts) return []
  
    return product.relatedProducts
      .map((id) => {
        const relatedProduct = getProductById(id)
        if (!relatedProduct) return null
  
        return {
          id: relatedProduct.id,
          name: relatedProduct.name,
          price: relatedProduct.price,
          image: relatedProduct.images?.[0] || "/placeholder.svg",
          rating: relatedProduct.rating,
        }
      })
      .filter(Boolean)
  }
  