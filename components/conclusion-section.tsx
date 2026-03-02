import { Star } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

export function ConclusionSection() {
  return (
    <section id="ket-luan" className="py-20 md:py-28 bg-[#8b0000] relative overflow-hidden">
      {/* Background star pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, #fbbf24 1px, transparent 1px),
                            radial-gradient(circle at 70% 60%, #fbbf24 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#fbbf24]/30" />
          <span className="text-[#fbbf24] font-bold text-sm tracking-widest uppercase">Phần IV</span>
          <div className="h-px flex-1 bg-[#fbbf24]/30" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-[#fef3c7] text-center mb-12 text-balance"
        >
          Kết luận
        </Reveal>

        {/* The counter-claim */}
        <Reveal
          className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-lg p-6 md:p-8 mb-10 backdrop-blur-sm"
          delayMs={200}
        >
          <div className="text-center mb-6">
            <p className="text-[#fde68a]/60 text-sm font-medium mb-2 uppercase tracking-wider">Nhận định</p>
            <blockquote className="text-[#fde68a] text-xl md:text-2xl font-bold italic">
              {'"Cách mạng Tháng Tám chỉ là ăn may"'}
            </blockquote>
            <p className="mt-3 text-[#fbbf24] font-bold text-lg">
              {"⇒ Không công bằng với lịch sử."}
            </p>
          </div>
        </Reveal>

        {/* Key conclusions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            "Kết quả của quá trình chuẩn bị chiến lược lâu dài",
            "Kết quả của sự lãnh đạo đúng đắn",
            "Kết quả của sự hy sinh to lớn",
            "Kết quả của việc chủ động tạo và chớp thời cơ",
          ].map((item, i) => (
            <StaggerItem
              key={i}
              index={i}
              baseDelayMs={160}
              stepMs={70}
              className="flex items-start gap-3 p-4 bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-lg backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-[#fbbf24] fill-[#fbbf24] shrink-0 mt-0.5" />
              <p className="text-[#fef3c7] font-medium leading-relaxed">{item}</p>
            </StaggerItem>
          ))}
        </div>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <Reveal delayMs={260} className="p-4 bg-[#fbbf24]/5 border border-[#fbbf24]/10 rounded-lg text-center">
            <p className="text-[#fde68a]/60 text-sm mb-1">Thời cơ là</p>
            <p className="text-[#fbbf24] font-bold text-lg">Yếu tố khách quan</p>
          </Reveal>
          <Reveal delayMs={320} className="p-4 bg-[#fbbf24]/5 border border-[#fbbf24]/10 rounded-lg text-center">
            <p className="text-[#fde68a]/60 text-sm mb-1">Chuẩn bị và lãnh đạo là</p>
            <p className="text-[#fbbf24] font-bold text-lg">Yếu tố quyết định</p>
          </Reveal>
        </div>

        {/* Final quote */}
        <Reveal delayMs={380} className="bg-[#fbbf24] rounded-lg p-6 md:p-8 text-center">
          <blockquote className="text-[#7c2d12] text-lg md:text-xl font-bold leading-relaxed text-pretty">
            {'"Cách mạng Tháng Tám không phải là một \'cuộc cách mạng ăn may\', mà là đỉnh cao tất yếu của một quá trình 15 năm chuẩn bị kiên trì, chủ động và sáng tạo dưới sự lãnh đạo của Đảng Cộng sản Việt Nam."'}
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
