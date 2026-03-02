"use client"

import { Star } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#8b0000]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #fbbf24 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #fbbf24 1px, transparent 1px),
                            radial-gradient(circle at 50% 80%, #fbbf24 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Golden star decoration */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <Star className="w-12 h-12 text-[#fbbf24] fill-[#fbbf24] opacity-60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal delayMs={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/30 mb-8">
            <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
            <span className="text-[#fde68a] text-sm font-medium tracking-wide uppercase">
              Tranh luận lịch sử
            </span>
            <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
          </div>
        </Reveal>

        <Reveal
          as="h1"
          delayMs={140}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#fef3c7] leading-tight tracking-tight"
        >
          <span className="text-balance">Cách mạng Tháng Tám</span>
          <br />
          <span className="text-[#fbbf24]">1945</span>
        </Reveal>

        <Reveal delayMs={280} className="mt-6">
          <p className="text-xl md:text-2xl text-[#fde68a]/80 font-light max-w-3xl mx-auto leading-relaxed text-pretty">
            {'Không phải "ăn may" — mà là đỉnh cao tất yếu của 15 năm chuẩn bị kiên trì, chủ động và sáng tạo'}
          </p>
        </Reveal>

        <Reveal
          delayMs={420}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#van-de"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-lg hover:bg-[#f59e0b] transition-colors"
          >
            Khám phá ngay
          </a>
          <a
            href="#ket-luan"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#fde68a]/40 text-[#fde68a] font-medium rounded-lg hover:bg-[#fde68a]/10 transition-colors"
          >
            Kết luận
          </a>
        </Reveal>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
