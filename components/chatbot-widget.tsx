"use client"

import { useEffect, useState } from "react"
import { Bot, X } from "lucide-react"

// ============================================================
// Botpress Webchat v3.6
// ============================================================
const WEBCHAT_URL = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/03/02/17/20260302174214-4ODZI7S1.json"
// ============================================================

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [greetingDismissed, setGreetingDismissed] = useState(false)

  // Show greeting bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!greetingDismissed && !isOpen) {
        setShowGreeting(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [greetingDismissed, isOpen])

  // Hide greeting when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
    if (showGreeting) {
      setShowGreeting(false)
      setGreetingDismissed(true)
    }
  }

  const dismissGreeting = () => {
    setShowGreeting(false)
    setGreetingDismissed(true)
  }

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 z-50 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-90 h-130 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-red-700 to-red-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Trợ lý Lịch sử</p>
                <p className="text-xs text-white/80">Hỏi bất kỳ điều gì về Cách mạng Tháng Tám</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Đóng chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Botpress webchat iframe */}
          <div className="flex-1 relative bg-gray-50">
            <iframe
              src={WEBCHAT_URL}
              className="w-full h-full border-0"
              title="Chatbot Trợ lý Lịch sử"
            />
          </div>
        </div>
      </div>

      {/* Greeting bubble */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 z-40 transition-all duration-300 ${
          showGreeting && !isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3 max-w-55 relative">
          <button
            onClick={dismissGreeting}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            aria-label="Đóng"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
          <p className="text-sm text-gray-800 leading-relaxed">
            <span className="text-lg mr-1">👋</span> Xin chào! Tôi có thể hỗ trợ cho bạn gì không?
          </p>
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45" />
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        }`}
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  )
}
