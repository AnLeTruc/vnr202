import { Star } from "lucide-react"

export function StickyNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#8b0000]/95 backdrop-blur-sm border-b border-[#fbbf24]/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-[#fde68a] font-bold text-sm md:text-base">
            CM Tháng Tám 1945
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#van-de" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Vấn đề
          </a>
          <a href="#chien-luoc" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Chiến lược
          </a>
          <a href="#luc-luong" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Lực lượng
          </a>
          <a href="#thoi-co" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Thời cơ
          </a>
          <a href="#phan-tich" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Phân tích
          </a>
          <a href="#ket-luan" className="text-[#fde68a]/70 hover:text-[#fde68a] text-sm font-medium transition-colors">
            Kết luận
          </a>
        </div>
      </div>
    </nav>
  )
}
