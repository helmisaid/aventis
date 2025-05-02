import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ArticleCard from "../../components/articles/article-card";
import ArticleCardSkeleton from "../../components/articles/article-card-skeleton";
import Pagination from "../../components/Pagination";

// Mock categories for the filter
const categories = [
  "All",
  "Hiking",
  "Camping",
  "Climbing",
  "Backpacking",
  "Survival",
  "Gear Reviews",
];

// Mock featured article
const featuredArticle = {
  id: "1",
  title: "Essential Gear for Your First Hiking Adventure",
  excerpt:
    "Discover the must-have equipment and gear for beginners venturing into the great outdoors. From backpacks to boots, we've got you covered.",
  image: "/placeholder.svg?height=600&width=1200",
  category: "Hiking",
  date: "May 15, 2023",
  readTime: "8 min read",
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
  },
};

// Mock articles data
const articles = Array.from({ length: 9 }, (_, i) => ({
  id: `${i + 2}`,
  title: `${
    [
      "The Ultimate Guide to Lightweight Camping",
      "Top 10 Climbing Destinations in Indonesia",
      "How to Choose the Perfect Hiking Boots",
      "Survival Skills Every Outdoor Enthusiast Should Know",
      "Eco-Friendly Outdoor Gear: A Comprehensive Review",
      "Backpacking Through Java: A 7-Day Itinerary",
      "Winter Camping: Tips and Tricks for Staying Warm",
      "Mountain Photography: Capturing the Perfect Shot",
      "Nutrition on the Trail: Meal Planning for Multi-Day Hikes",
    ][i % 9]
  }`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
  image: `/placeholder.svg?height=400&width=600&text=Article+${i + 2}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  date: `May ${i + 1}, 2023`,
  readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
  },
}));

export default function ArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Aventis Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Discover tips, guides, and inspiration for your outdoor
                adventures
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {featuredArticle.date}
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={
                          featuredArticle.author.avatar || "/placeholder.svg"
                        }
                        alt={featuredArticle.author.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm font-medium">
                        {featuredArticle.author.name}
                      </span>
                    </div>
                    <Link href={`/articles/${featuredArticle.id}`}>
                      <Button variant="link" className="text-primary p-0">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="All" className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <TabsList className="bg-white dark:bg-gray-800">
                  {categories.slice(0, 5).map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="More" className="text-sm">
                    More
                  </TabsTrigger>
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Suspense
                      fallback={Array.from({ length: 9 }).map((_, i) => (
                        <ArticleCardSkeleton key={i} />
                      ))}
                    >
                      {articles
                        .filter(
                          (article) =>
                            category === "All" || article.category === category
                        )
                        .map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                    </Suspense>
                  </div>
                </TabsContent>
              ))}

              <TabsContent value="More" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categories.slice(5).map((category) => (
                    <Link
                      key={category}
                      href={`/articles?category=${category}`}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">{category}</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Pagination totalPages={5} currentPage={1} />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Aventis
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Subscribe to our newsletter for the latest articles, guides, and
              outdoor inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
