import { Check, X } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

export function AnalysisSection() {
  return (
    <section id="phan-tich" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Phần III</span>
          <div className="h-px flex-1 bg-primary/20" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12 text-balance"
        >
          Phân tích lập luận
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Time factor */}
          <Reveal className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-lg p-6" delayMs={220}>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#fbbf24]/20 text-[#d4a017] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              Thời cơ có vai trò không?
            </h3>
            <p className="text-foreground/70 font-semibold mb-3">Có.</p>
            <ul className="space-y-2 mb-4">
              {[
                'Nhật đầu hàng tạo ra "khoảng trống quyền lực".',
                "Điều kiện quốc tế thuận lợi.",
              ].map((item, i) => (
                <StaggerItem
                  as="li"
                  key={i}
                  index={i}
                  baseDelayMs={120}
                  stepMs={70}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <Check className="w-4 h-4 text-[#d4a017] shrink-0 mt-0.5" />
                  {item}
                </StaggerItem>
              ))}
            </ul>
            <div className="p-3 bg-card rounded-md border border-border">
              <p className="text-sm text-foreground/70 font-medium">
                <strong className="text-foreground">Nhưng:</strong> Thời cơ chỉ là <em>điều kiện</em>, không phải nguyên nhân quyết định.
              </p>
            </div>
          </Reveal>

          {/* Decisive factor */}
          <Reveal className="bg-primary/5 border border-primary/20 rounded-lg p-6" delayMs={280}>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              Yếu tố quyết định là gì?
            </h3>
            <div className="space-y-3">
              {[
                { label: "Đường lối đúng đắn", desc: "Từ 1939–1941 đã xác định đúng mâu thuẫn chủ yếu." },
                { label: "Sự chuẩn bị lâu dài", desc: "15 năm đấu tranh liên tục (1930–1945)." },
                { label: "Lực lượng chính trị rộng lớn", desc: "Việt Minh có cơ sở toàn quốc." },
                { label: "Lực lượng vũ trang sẵn sàng", desc: "Có tổ chức, có chiến khu." },
                { label: "Nghệ thuật chớp thời cơ", desc: "Ra quyết định nhanh, chính xác." },
              ].map((item, i) => (
                <StaggerItem
                  key={i}
                  index={i}
                  baseDelayMs={120}
                  stepMs={70}
                  className="flex items-start gap-3 p-3 bg-card rounded-md border border-border"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{item.label}</p>
                    <p className="text-foreground/60 text-sm">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
