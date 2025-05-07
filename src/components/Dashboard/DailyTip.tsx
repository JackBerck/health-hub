import { Lightbulb } from "lucide-react"

export default function DailyTip() {
  // In a real app, this would be fetched from your backend
  const tips = [
    {
      id: 1,
      content: "Luangkan 5 menit setiap pagi untuk bernapas dalam dan menetapkan niat positif untuk hari Anda.",
      category: "Mindfulness",
    },
    {
      id: 2,
      content:
        "Jika merasa cemas, coba teknik 5-4-3-2-1: Sebutkan 5 hal yang Anda lihat, 4 hal yang Anda rasakan, 3 hal yang Anda dengar, 2 hal yang Anda cium, dan 1 hal yang Anda rasakan.",
      category: "Kecemasan",
    },
    {
      id: 3,
      content: "Tidur yang cukup sama pentingnya dengan nutrisi dan olahraga untuk kesehatan mental Anda.",
      category: "Kesehatan",
    },
  ]

  // Get a random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center mb-2 lg:mb-4">
        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
          <Lightbulb size={16} className="text-yellow-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Tip Hari Ini</h2>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
        <p className="small-font-size text-gray-700">{randomTip.content}</p>
        <div className="mt-2">
          <span className="extra-small-font-size px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">{randomTip.category}</span>
        </div>
      </div>
    </div>
  )
}
