import Link from "next/link"
import { MessageSquare, Heart, Eye } from "lucide-react"

interface CommunityPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  category: string
  replies: number
  likes: number
  views: number
  isHot: boolean
}

export default function CommunityHighlights() {
  // Mock data - in a real app, this would come from your backend
  const posts: CommunityPost[] = [
    {
      id: "post-1",
      title: "Bagaimana cara mengatasi overthinking?",
      excerpt: "Saya sering merasa cemas dan overthinking tentang masa depan. Bagaimana cara mengatasinya?",
      author: {
        name: "Anonymous",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Kecemasan",
      replies: 12,
      likes: 24,
      views: 156,
      isHot: true,
    },
    {
      id: "post-2",
      title: "Tips mengelola stres di tempat kerja",
      excerpt: "Berbagi pengalaman dan tips untuk mengelola stres di lingkungan kerja yang kompetitif.",
      author: {
        name: "WorkLifeBalance",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Stres",
      replies: 8,
      likes: 19,
      views: 102,
      isHot: false,
    },
    {
      id: "post-3",
      title: "Meditasi untuk pemula: Dari mana harus mulai?",
      excerpt: "Saya ingin mulai bermeditasi tapi tidak tahu harus mulai dari mana. Ada saran?",
      author: {
        name: "MindfulNewbie",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Mindfulness",
      replies: 15,
      likes: 32,
      views: 210,
      isHot: true,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Komunitas</h2>
        <Link href="/community" className="text-sm text-teal-600 hover:text-teal-700">
          Jelajahi Komunitas
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3 mb-2">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">{post.category}</span>
                  {post.isHot && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full flex items-center">
                      <span className="h-1 w-1 bg-rose-500 rounded-full mr-1"></span>
                      Hot
                    </span>
                  )}
                </div>
                <Link href={`/community/post/${post.id}`} className="block mt-1">
                  <h3 className="text-base font-medium text-gray-900 hover:text-teal-600">{post.title}</h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <MessageSquare size={14} className="mr-1" />
                  <span className="text-xs">{post.replies}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Heart size={14} className="mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Eye size={14} className="mr-1" />
                  <span className="text-xs">{post.views}</span>
                </div>
              </div>
              <Link href={`/community/post/${post.id}`} className="text-xs text-teal-600 hover:text-teal-700">
                Lihat Diskusi
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
