import { Zap, Clock, ArrowRight } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

export function OpportunitySection() {
  return (
    <section id="thoi-co" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Phần II-C</span>
          <div className="h-px flex-1 bg-primary/20" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4 text-balance"
        >
          Chủ động nắm thời cơ
        </Reveal>
        <Reveal delayMs={200} as="p" className="text-center text-muted-foreground mb-12 text-lg">
          Sự kiện 1945 — Hành động thần tốc và chính xác
        </Reveal>

        {/* Historical image */}
        <Reveal delayMs={220} className="mb-10">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <img
                src="https://congdoantkv.vn/data/images/anh-1.jpg"
                alt="Khí thế Tổng khởi nghĩa tháng 8/1945"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-lg">
                  Sức mạnh quần chúng và khí thế Tổng khởi nghĩa tháng 8/1945
                </p>
                <p className="text-white/60 text-xs mt-1">Nguồn: Công đoàn TKV</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Event 1: Japan coup */}
        <Reveal className="mb-8 bg-card border border-border rounded-lg overflow-hidden" delayMs={260}>
          <div className="bg-primary/5 p-5 md:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 text-[#d4a017] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Nhật đảo chính Pháp</h3>
                <span className="text-sm text-accent font-medium">9/3/1945</span>
              </div>
            </div>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Đảng ra chỉ thị: <strong className="text-foreground">{'"Nhật — Pháp bắn nhau và hành động của chúng ta."'}</strong>
            </p>
            <div className="space-y-3">
              {[
                "Xác định kẻ thù chính là Nhật.",
                "Phát động cao trào kháng Nhật cứu nước.",
                "Chuẩn bị tổng khởi nghĩa khi thời cơ đến.",
              ].map((item, i) => (
                <StaggerItem key={i} index={i} baseDelayMs={120} stepMs={70} className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-foreground/80">{item}</p>
                </StaggerItem>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-md">
              <p className="text-sm font-semibold text-[#92400e]">
                {"→ Không bị động chờ Nhật đầu hàng."}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Event 2: Japan surrenders */}
        <Reveal className="bg-card border border-border rounded-lg overflow-hidden" delayMs={320}>
          <div className="bg-primary/5 p-5 md:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Nhật đầu hàng</h3>
                <span className="text-sm text-accent font-medium">Tháng 8/1945</span>
              </div>
            </div>
          </div>
          <div className="p-5 md:p-6">
            {/* Timeline */}
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/20" />

              {[
                { date: "13/8", text: "Thành lập Ủy ban khởi nghĩa toàn quốc." },
                { date: "13/8", text: "Ra Quân lệnh số 1." },
                { date: "Vài ngày", text: "Tổng khởi nghĩa giành chính quyền trên toàn quốc." },
              ].map((item, i) => (
                <StaggerItem key={i} index={i} baseDelayMs={120} stepMs={70} className="relative">
                  <div className="absolute -left-5 w-4 h-4 rounded-full bg-primary border-4 border-card" />
                  <div className="bg-secondary/30 rounded-md p-3">
                    <span className="text-xs font-bold text-primary">{item.date}</span>
                    <p className="text-foreground/80 mt-1">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-md">
              <p className="text-primary font-semibold text-sm leading-relaxed">
                {"⇒ Nếu là ngẫu nhiên, liệu có thể tổ chức đồng loạt, thần tốc và chính xác như vậy?"}
              </p>
            </div>

            <div className="mt-4 p-4 bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-md">
              <p className="text-sm text-[#92400e] leading-relaxed">
                <strong>Lưu ý:</strong> Thời cơ chỉ tồn tại trong khoảng nửa cuối tháng 8/1945. 
                Nếu chậm vài tuần: Quân Tưởng vào miền Bắc, Quân Anh vào miền Nam, Pháp trở lại 
                → Cách mạng có thể bị bóp nghẹt. <strong>Chỉ một lực lượng đã chuẩn bị sẵn mới có thể hành động nhanh như vậy.</strong>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
