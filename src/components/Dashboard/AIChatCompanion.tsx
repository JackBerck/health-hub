"use client"

import type React from "react"

import { useState } from "react"
import { Send, Bot } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIChatCompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Halo! Saya adalah AI companion Anda. Bagaimana perasaan Anda hari ini?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Saya mengerti perasaan Anda. Coba tarik napas dalam-dalam dan fokus pada hal positif.",
        "Terima kasih sudah berbagi. Apa yang bisa saya bantu untuk membuat hari Anda lebih baik?",
        "Itu normal untuk dirasakan. Ingat bahwa perasaan datang dan pergi seperti awan di langit.",
        "Saya di sini untuk mendengarkan. Mau cerita lebih lanjut tentang apa yang Anda rasakan?",
        "Bagaimana kalau kita coba latihan mindfulness singkat untuk menenangkan pikiran?",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2 lg:mb-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
            <Bot size={16} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold">AI Companion</h2>
        </div>
        <span className="extra-small-font-size px-2 py-1 bg-green-100 text-green-700 rounded-full">Online</span>
      </div>

      <div className="h-48 overflow-y-auto mb-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 small-font-size ${
                message.sender === "user" ? "bg-teal-500 text-white" : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan Anda..."
          className="w-full pl-3 pr-10 py-2 small-font-size border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-700 disabled:text-gray-300"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
