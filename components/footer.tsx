import { Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a0a0a] py-10 border-t border-[#fbbf24]/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-[#fde68a] font-bold text-sm">Cách mạng Tháng Tám 1945</span>
          <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
        </div>
        <p className="text-[#fde68a]/40 text-sm">
          Tài liệu phân tích lịch sử phục vụ mục đích học tập và nghiên cứu.
        </p>
      </div>
    </footer>
  )
}
