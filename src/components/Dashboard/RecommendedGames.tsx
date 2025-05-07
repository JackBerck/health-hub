import Link from "next/link"
import { Play } from "lucide-react"

interface Game {
  id: string
  title: string
  description: string
  imageUrl: string
  duration: string
  category: string
}

export default function RecommendedGames() {
  // Mock data - in a real app, this would come from your backend
  const games: Game[] = [
    {
      id: "breathing-puzzle",
      title: "Breathing Puzzle",
      description: "Latihan pernapasan dengan puzzle interaktif",
      imageUrl: "/placeholder.svg?height=80&width=80",
      duration: "5 menit",
      category: "Mindfulness",
    },
    {
      id: "emotion-detective",
      title: "Emotion Detective",
      description: "Tebak emosi dari ekspresi wajah",
      imageUrl: "/placeholder.svg?height=80&width=80",
      duration: "10 menit",
      category: "Empati",
    },
    {
      id: "focus-garden",
      title: "Focus Garden",
      description: "Tanam dan rawat kebun virtual dengan fokus",
      imageUrl: "/placeholder.svg?height=80&width=80",
      duration: "15 menit",
      category: "Konsentrasi",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Game Rekomendasi</h2>
        <Link href="/games" className="text-sm text-teal-600 hover:text-teal-700">
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-3">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mr-3 overflow-hidden">
              <img src={game.imageUrl || "/placeholder.svg"} alt={game.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-800">{game.title}</h3>
              <p className="text-xs text-gray-500 truncate">{game.description}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500 mr-2">{game.duration}</span>
                <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">{game.category}</span>
              </div>
            </div>
            <button className="ml-2 h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-200">
              <Play size={16} />
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
