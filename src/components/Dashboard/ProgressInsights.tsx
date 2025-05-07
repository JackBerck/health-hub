"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface ProgressData {
  name: string
  value: number
  change: "up" | "down" | "neutral"
  changeValue: number
}

export default function ProgressInsights() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  // Mock data - in a real app, this would come from your backend
  const weeklyData = [
    { day: "Sen", mood: 65 },
    { day: "Sel", mood: 70 },
    { day: "Rab", mood: 60 },
    { day: "Kam", mood: 75 },
    { day: "Jum", mood: 80 },
    { day: "Sab", mood: 85 },
    { day: "Min", mood: 75 },
  ]

  const monthlyData = [
    { day: "Minggu 1", mood: 68 },
    { day: "Minggu 2", mood: 72 },
    { day: "Minggu 3", mood: 75 },
    { day: "Minggu 4", mood: 80 },
  ]

  const yearlyData = [
    { day: "Jan", mood: 65 },
    { day: "Feb", mood: 68 },
    { day: "Mar", mood: 70 },
    { day: "Apr", mood: 72 },
    { day: "Mei", mood: 75 },
    { day: "Jun", mood: 78 },
    { day: "Jul", mood: 80 },
    { day: "Agu", mood: 82 },
    { day: "Sep", mood: 80 },
    { day: "Okt", mood: 78 },
    { day: "Nov", mood: 75 },
    { day: "Des", mood: 80 },
    { day: "Okt", mood: 78 },
    { day: "Nov", mood: 75 },
    { day: "Des", mood: 73 }
  ]

  const getChartData = () => {
    switch (timeRange) {
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return weeklyData
    }
  }

  const progressMetrics: ProgressData[] = [
    {
      name: "Mood Rata-rata",
      value: 78,
      change: "up",
      changeValue: 5,
    },
    {
      name: "Konsistensi",
      value: 92,
      change: "up",
      changeValue: 3,
    },
    {
      name: "Tingkat Stres",
      value: 45,
      change: "down",
      changeValue: 8,
    },
    {
      name: "Mindfulness",
      value: 65,
      change: "neutral",
      changeValue: 0,
    },
  ]

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <ArrowUp size={14} className="text-green-500" />
      case "down":
        return <ArrowDown size={14} className="text-rose-500" />
      default:
        return <Minus size={14} className="text-gray-500" />
    }
  }

  const getChangeColor = (change: string, metric: string) => {
    if (metric === "Tingkat Stres") {
      return change === "down" ? "text-green-500" : change === "up" ? "text-rose-500" : "text-gray-500"
    }
    return change === "up" ? "text-green-500" : change === "down" ? "text-rose-500" : "text-gray-500"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Progress Kesehatan Mental</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-xs rounded-full ${
              timeRange === "week" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            Minggu
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-xs rounded-full ${
              timeRange === "month" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            Bulan
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1 text-xs rounded-full ${
              timeRange === "year" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            Tahun
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {progressMetrics.map((metric) => (
          <div key={metric.name} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">{metric.name}</p>
            <div className="flex items-end">
              <span className="text-xl font-semibold text-gray-800">{metric.value}</span>
              <div className="flex items-center ml-2 mb-1">
                {getChangeIcon(metric.change)}
                <span className={`text-xs ml-0.5 ${getChangeColor(metric.change, metric.name)}`}>
                  {metric.changeValue}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
              formatter={(value) => [`${value}`, "Mood Score"]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="mood" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={timeRange === "year" ? 16 : 24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
