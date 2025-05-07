import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

interface Activity {
  id: string
  title: string
  date: string
  time: string
  type: "assessment" | "community" | "game" | "challenge"
}

export default function UpcomingActivities() {
  // Mock data - in a real app, this would come from your backend
  const activities: Activity[] = [
    {
      id: "act-1",
      title: "Weekly Mood Assessment",
      date: "Hari ini",
      time: "14:00",
      type: "assessment",
    },
    {
      id: "act-2",
      title: "Diskusi: Mengatasi Burnout",
      date: "Besok",
      time: "19:30",
      type: "community",
    },
    {
      id: "act-3",
      title: "Mindfulness Challenge",
      date: "Rabu, 15 Mei",
      time: "08:00",
      type: "challenge",
    },
  ]

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "assessment":
        return "bg-blue-100 text-blue-700"
      case "community":
        return "bg-purple-100 text-purple-700"
      case "game":
        return "bg-green-100 text-green-700"
      case "challenge":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case "assessment":
        return "Assessment"
      case "community":
        return "Komunitas"
      case "game":
        return "Game"
      case "challenge":
        return "Challenge"
      default:
        return type
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Aktivitas Mendatang</h2>
        <Link href="/calendar" className="text-sm text-teal-600 hover:text-teal-700">
          Lihat Kalender
        </Link>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-800">{activity.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getActivityTypeColor(activity.type)}`}>
                  {getActivityTypeLabel(activity.type)}
                </span>
              </div>

              <div className="flex items-center mt-2 text-xs text-gray-500">
                <div className="flex items-center mr-3">
                  <Calendar size={12} className="mr-1" />
                  {activity.date}
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">Tidak ada aktivitas mendatang</p>
          <Link href="/activities" className="mt-2 inline-block text-sm text-teal-600 hover:text-teal-700">
            Jelajahi Aktivitas
          </Link>
        </div>
      )}
    </div>
  )
}
