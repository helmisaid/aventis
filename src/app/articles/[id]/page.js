import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Facebook, Heart, Instagram, MessageCircle, Share2, Twitter } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

// Mock article data
const article = {
  id: "1",
  title: "Essential Gear for Your First Hiking Adventure",
  content: `
    <p class="lead">Embarking on your first hiking adventure is an exciting step into the world of outdoor exploration. But before you hit the trails, it's crucial to have the right gear to ensure a safe and enjoyable experience.</p>
    
    <h2>Choosing the Right Backpack</h2>
    <p>Your backpack is perhaps the most important piece of gear for any hike. For day hikes, look for a pack with 20-30 liters of capacity. This gives you enough room for water, food, extra layers, and emergency supplies without being overly bulky.</p>
    <p>Key features to look for include:</p>
    <ul>
      <li>Padded shoulder straps and hip belt for comfort</li>
      <li>Multiple compartments for organization</li>
      <li>External attachment points for trekking poles or other gear</li>
      <li>Water-resistant material</li>
    </ul>
    
    <h2>Footwear Fundamentals</h2>
    <p>Proper footwear can make or break your hiking experience. Trail runners or light hiking shoes are suitable for well-maintained trails and shorter hikes. For more rugged terrain or longer journeys, consider hiking boots with ankle support.</p>
    <p>Whatever you choose, make sure your footwear is:</p>
    <ul>
      <li>Broken in before your hike</li>
      <li>Waterproof or water-resistant</li>
      <li>Fitted with enough room for your toes when walking downhill</li>
      <li>Paired with moisture-wicking socks (avoid cotton)</li>
    </ul>
    
    <h2>Clothing Considerations</h2>
    <p>The key to hiking comfort is layering. This allows you to adjust to changing weather conditions and your body temperature as you hike.</p>
    <p>A basic layering system includes:</p>
    <ul>
      <li><strong>Base layer:</strong> Moisture-wicking material that pulls sweat away from your skin</li>
      <li><strong>Mid layer:</strong> Insulating layer like fleece or down for warmth</li>
      <li><strong>Outer layer:</strong> Waterproof and windproof shell to protect from the elements</li>
    </ul>
    <p>Always pack an extra warm layer and rain protection, even if the forecast looks clear. Mountain weather can change rapidly.</p>
    
    <h2>Navigation Tools</h2>
    <p>Even on well-marked trails, navigation tools are essential safety items:</p>
    <ul>
      <li>Physical map of the area</li>
      <li>Compass (and the knowledge to use it)</li>
      <li>GPS device or smartphone app with offline maps</li>
      <li>Extra battery or power bank for electronic devices</li>
    </ul>
    
    <h2>Hydration and Nutrition</h2>
    <p>Staying hydrated and energized is crucial on the trail:</p>
    <ul>
      <li>Carry at least 2 liters of water for a day hike</li>
      <li>Consider a hydration reservoir for easy drinking on the move</li>
      <li>Pack calorie-dense snacks like nuts, dried fruit, and energy bars</li>
      <li>Bring a proper meal for longer hikes</li>
    </ul>
    
    <h2>Emergency and First Aid</h2>
    <p>Always be prepared for the unexpected with:</p>
    <ul>
      <li>Basic first aid kit</li>
      <li>Emergency whistle</li>
      <li>Headlamp or flashlight with extra batteries</li>
      <li>Emergency shelter like a space blanket</li>
      <li>Fire starter</li>
    </ul>
    
    <h2>Additional Essentials</h2>
    <ul>
      <li>Sun protection (hat, sunglasses, sunscreen)</li>
      <li>Insect repellent</li>
      <li>Multi-tool or knife</li>
      <li>Trekking poles for stability on difficult terrain</li>
      <li>Camera to capture memories</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Remember, you don't need to buy everything at once. Start with the essentials and gradually build your gear collection as you gain experience. Many outdoor stores offer rental options for trying out equipment before investing.</p>
    <p>The most important thing is to be prepared for your specific hike, taking into account the terrain, weather, and duration. With the right gear, you'll be ready to safely enjoy the incredible experiences that hiking has to offer.</p>
  `,
  image: "/placeholder.svg?height=600&width=1200",
  category: "Hiking",
  date: "May 15, 2023",
  readTime: "8 min read",
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Outdoor enthusiast and hiking expert with over 10 years of experience exploring trails across Indonesia and Southeast Asia.",
  },
  tags: ["Hiking", "Gear", "Beginners", "Outdoor", "Adventure"],
}

// Mock related articles
const relatedArticles = Array.from({ length: 3 }, (_, i) => ({
  id: `${i + 2}`,
  title: `${
    [
      "The Ultimate Guide to Lightweight Camping",
      "Top 10 Climbing Destinations in Indonesia",
      "How to Choose the Perfect Hiking Boots",
    ][i % 3]
  }`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.",
  image: `/placeholder.svg?height=400&width=600&text=Related+${i + 1}`,
  category: ["Camping", "Climbing", "Hiking"][i % 3],
  date: `May ${i + 1}, 2023`,
}))

export default function ArticleDetailPage({ params }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <Link
                  href={`/articles?category=${article.category}`}
                  className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {article.category}
                </Link>
                <span className="mx-2 text-white/70">•</span>
                <div className="flex items-center text-white/70 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {article.date}
                </div>
                <span className="mx-2 text-white/70">•</span>
                <div className="flex items-center text-white/70 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{article.title}</h1>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                  <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{article.author.name}</p>
                  <p className="text-white/70 text-sm">Author</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                  {/* Social Share Buttons */}
                  <div className="flex justify-end mb-6 space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Share on Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/articles?tag=${tag}`}
                          className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{article.author.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{article.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Comments (12)</h3>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </div>

                    {/* Sample Comments */}
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=100&width=100&text=User${i + 1}`} />
                            <AvatarFallback>U{i + 1}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{`User ${i + 1}`}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{`${i + 1} day${
                                i > 0 ? "s" : ""
                              } ago`}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {
                                [
                                  "Great article! This is exactly what I needed before my first hiking trip next month.",
                                  "I would add a headlamp to the essential list. It's saved me more than once when a hike took longer than expected.",
                                  "Do you have any specific brand recommendations for beginners who don't want to spend too much on their first gear set?",
                                ][i]
                              }
                            </p>
                            <div className="flex items-center mt-2 space-x-4">
                              <button className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {`${5 * (i + 1)}`}
                              </button>
                              <button className="text-xs text-gray-500 dark:text-gray-400">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      Load More Comments
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Related Articles */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link key={article.id} href={`/articles/${article.id}`} className="flex gap-3 group">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{article.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {["Hiking", "Camping", "Climbing", "Backpacking", "Survival", "Gear Reviews"].map((category) => (
                      <Link
                        key={category}
                        href={`/articles?category=${category}`}
                        className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:text-primary transition-colors"
                      >
                        <span>{category}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{`(${
                          Math.floor(Math.random() * 20) + 5
                        })`}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Hiking",
                      "Camping",
                      "Gear",
                      "Outdoor",
                      "Adventure",
                      "Backpacking",
                      "Climbing",
                      "Trekking",
                      "Nature",
                      "Mountains",
                      "Survival",
                      "Travel",
                    ].map((tag) => (
                      <Link
                        key={tag}
                        href={`/articles?tag=${tag}`}
                        className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-primary text-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Get the latest articles and outdoor tips delivered to your inbox.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <Button variant="secondary" className="w-full bg-white text-primary hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
