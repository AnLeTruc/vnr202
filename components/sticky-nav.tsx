"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import Link from "next/link"

const navItems = [
  { href: "#van-de", label: "Vấn đề", id: "van-de" },
  { href: "#chien-luoc", label: "Chiến lược", id: "chien-luoc" },
  { href: "#luc-luong", label: "Lực lượng", id: "luc-luong" },
  { href: "#thoi-co", label: "Thời cơ", id: "thoi-co" },
  { href: "#phan-tich", label: "Phân tích", id: "phan-tich" },
  { href: "#ket-luan", label: "Kết luận", id: "ket-luan" },
]

export function StickyNav() {
  const [activeSection, setActiveSection] = useState(navItems[0].id)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        // Activate earlier: section becomes active as soon as it enters
        // the top area of viewport instead of waiting until center.
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#8b0000]/95 backdrop-blur-sm border-b border-[#fbbf24]/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-[#fde68a] font-bold text-sm md:text-base">
            CM Tháng Tám 1945
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-[#7c2d12] bg-[#fbbf24] shadow-[0_0_0_1px_rgba(251,191,36,0.4)]"
                      : "text-[#fde68a]/70 hover:text-[#fde68a] hover:bg-[#fbbf24]/15"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
          <Link
            href="/quizz"
            className="text-sm font-semibold px-3 py-1.5 rounded-full text-[#7c2d12] bg-[#fbbf24] hover:bg-[#f59e0b] transition-colors duration-300"
          >
            Quizz
          </Link>
        </div>
      </div>
    </nav>
  )
}
