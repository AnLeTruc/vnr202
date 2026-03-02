"use client"

import { ChevronDown, MapPin, Shield, Target } from "lucide-react"
import { useState } from "react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

interface ConferenceData {
  id: string
  icon: React.ReactNode
  title: string
  date: string
  points: string[]
  conclusion: string
}

const conferences: ConferenceData[] = [
  {
    id: "hn6",
    icon: <Target className="w-5 h-5" />,
    title: "Hội nghị Trung ương VI",
    date: "11/1939",
    points: [
      "Xác định: nhiệm vụ trước mắt là giải phóng dân tộc.",
      "Đặt quyền lợi dân tộc lên hàng đầu.",
      "Rút vào hoạt động bí mật.",
      "Chủ trương thành lập Mặt trận dân tộc thống nhất.",
    ],
    conclusion: "Đây là sự chuẩn bị về đường lối chính trị.",
  },
  {
    id: "hn7",
    icon: <Shield className="w-5 h-5" />,
    title: "Hội nghị Trung ương VII",
    date: "11/1940",
    points: [
      "Khẳng định cách mạng phản đế và cách mạng thổ địa phải đồng tiến.",
      "Dù bị tổn thất nặng nề (nhiều lãnh đạo bị bắt), Đảng vẫn duy trì tổ chức.",
    ],
    conclusion: "Cho thấy sự bền bỉ tổ chức, không hề ngẫu nhiên.",
  },
  {
    id: "hn8",
    icon: <MapPin className="w-5 h-5" />,
    title: "Hội nghị Trung ương VIII",
    date: "5/1941 — Pác Pó",
    points: [
      "Xác định rõ: cách mạng trước mắt là cách mạng giải phóng dân tộc.",
      "Thành lập Mặt trận Việt Minh.",
      "Tạm gác vấn đề ruộng đất.",
      "Chuẩn bị khởi nghĩa vũ trang là nhiệm vụ trung tâm.",
    ],
    conclusion:
      'Nếu là "ăn may", tại sao từ 1941 đã xác định rõ phải chuẩn bị khởi nghĩa vũ trang? Điều này cho thấy thắng lợi là kết quả của nhận định chiến lược đúng đắn và chủ động.',
  },
]

function ConferenceCard({ conf }: { conf: ConferenceData }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {conf.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{conf.title}</h3>
            <span className="text-sm text-accent font-medium">{conf.date}</span>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-6">
          <div className="space-y-3 mb-4">
            {conf.points.map((point, i) => (
              <StaggerItem key={i} index={i} baseDelayMs={80} stepMs={70} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <p className="text-foreground/80 leading-relaxed">{point}</p>
              </StaggerItem>
            ))}
          </div>
          <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-md">
            <p className="text-primary font-semibold text-sm leading-relaxed">
              {"→ "}{conf.conclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StrategySection() {
  return (
    <section id="chien-luoc" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Phần II-A</span>
          <div className="h-px flex-1 bg-primary/20" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4 text-balance"
        >
          Chuyển hướng chiến lược
        </Reveal>
        <Reveal delayMs={200} as="p" className="text-center text-muted-foreground mb-12 text-lg">
          Quá trình chuẩn bị có hệ thống từ 1939 đến 1941
        </Reveal>

        {/* Historical image */}
        <Reveal delayMs={220} className="mb-10">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <img
                src="https://baotanghochiminh.vn/pic/Customer/images/N%C4%83m%202023/Thang%203/bac-ho-chu-tri-hoi-nghi-trung-uong-dang-lan-thu-tam.jpg"
                alt="Bác Hồ chủ trì Hội nghị Trung ương Đảng lần thứ VIII (5/1941)"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-lg">
                  Bác Hồ chủ trì Hội nghị Trung ương Đảng lần thứ VIII tại Pác Bó (5/1941)
                </p>
                <p className="text-white/60 text-xs mt-1">Nguồn: Bảo tàng Hồ Chí Minh</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {conferences.map((conf, i) => (
            <Reveal key={conf.id} delayMs={240 + i * 90}>
              <ConferenceCard conf={conf} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
