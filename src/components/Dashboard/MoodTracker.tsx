"use client"

import type React from "react"

import { useState } from "react"
import { Smile, Frown, Meh, Sun, Cloud, CloudRain, CloudLightning } from "lucide-react"

type Mood = "happy" | "neutral" | "sad" | "anxious" | "energetic" | "tired" | "calm"

interface MoodOption {
  value: Mood
  label: string
  icon: React.ReactNode
  color: string
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const moods: MoodOption[] = [
    {
      value: "happy",
      label: "Senang",
      icon: <Smile size={24} />,
      color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
    { value: "calm", label: "Tenang", icon: <Sun size={24} />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { value: "neutral", label: "Biasa", icon: <Meh size={24} />, color: "bg-gray-100 text-gray-600 border-gray-200" },
    {
      value: "tired",
      label: "Lelah",
      icon: <Cloud size={24} />,
      color: "bg-purple-100 text-purple-600 border-purple-200",
    },
    {
      value: "sad",
      label: "Sedih",
      icon: <Frown size={24} />,
      color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    },
    {
      value: "anxious",
      label: "Cemas",
      icon: <CloudRain size={24} />,
      color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
      value: "energetic",
      label: "Energik",
      icon: <CloudLightning size={24} />,
      color: "bg-green-100 text-green-600 border-green-200",
    },
  ]

  const handleSubmit = () => {
    if (selectedMood) {
      // Here you would typically save the mood to your backend
      console.log("Mood submitted:", selectedMood)
      setIsSubmitted(true)
    }
  }

  const getMoodTree = () => {
    switch (selectedMood) {
      case "happy":
        return "🌳 Pohon mood Anda sedang berbunga! Teruslah menjaga energi positif ini."
      case "calm":
        return "🌲 Pohon mood Anda tenang dan stabil. Ini waktu yang baik untuk refleksi."
      case "neutral":
        return "🌱 Pohon mood Anda dalam kondisi stabil. Cobalah aktivitas yang membuat Anda senang."
      case "tired":
        return "🍂 Pohon mood Anda butuh istirahat. Jangan lupa untuk beristirahat yang cukup."
      case "sad":
        return "🌧️ Pohon mood Anda sedikit layu. Ingat, setelah hujan selalu ada pelangi."
      case "anxious":
        return "💨 Pohon mood Anda tertiup angin kecemasan. Cobalah latihan pernapasan."
      case "energetic":
        return "⚡ Pohon mood Anda penuh energi! Gunakan energi ini untuk hal-hal produktif."
      default:
        return ""
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Mood Check-in Harian</h2>

      {!isSubmitted ? (
        <>
          <p className="text-gray-600 text-sm mb-2 lg:mb-4">Bagaimana perasaan Anda hari ini?</p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2 lg:mb-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  selectedMood === mood.value
                    ? `${mood.color} border-2`
                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                }`}
              >
                <div className={`${selectedMood === mood.value ? "" : "text-gray-500"}`}>{mood.icon}</div>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg transition-all duration-200 hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simpan Mood
          </button>
        </>
      ) : (
        <div className="space-y-2 lg:space-y-4">
          <div className="flex items-center justify-center p-4 bg-teal-50 rounded-lg">
            <p className="text-teal-700">{getMoodTree()}</p>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Terima kasih telah melakukan check-in hari ini!</p>
            <p>
              Mood Anda telah dicatat dan akan membantu kami memberikan rekomendasi yang lebih baik.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-2 px-4 bg-white border border-teal-500 text-teal-600 font-medium rounded-lg transition-all duration-200 hover:bg-teal-50"
          >
            Update Mood
          </button>
        </div>
      )}
    </div>
  )
}
