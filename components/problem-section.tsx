import { AlertTriangle, HelpCircle } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

export function ProblemSection() {
  return (
    <section id="van-de" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Phần I</span>
          <div className="h-px flex-1 bg-primary/20" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12 text-balance"
        >
          Nêu vấn đề — Giả định cần tranh luận
        </Reveal>

        {/* The claim */}
        <Reveal className="relative bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 md:p-8 mb-10" delayMs={200}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-primary mb-3">Giả định đang được đặt ra</h3>
              <blockquote className="text-foreground/90 text-lg md:text-xl italic leading-relaxed border-none pl-0">
                {'"Cách mạng Tháng Tám 1945 chỉ là một cuộc \'ăn may\', thắng lợi đến từ thời cơ ngẫu nhiên khi Nhật đầu hàng, Pháp chưa kịp trở lại."'}
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* Evidence for the claim */}
        <Reveal className="bg-card border border-border rounded-lg p-6 md:p-8 mb-10" delayMs={260}>
          <h3 className="text-lg font-bold text-foreground mb-4">
            Giả định này dựa trên một số sự kiện:
          </h3>
          <div className="grid gap-3">
            {[
              { year: "Tháng 8/1945", text: "Nhật đầu hàng Đồng minh." },
              { year: "Hậu quả", text: "Bộ máy cai trị Nhật ở Đông Dương rơi vào khủng hoảng." },
              { year: "Thực tế", text: "Quân Đồng minh chưa kịp vào Đông Dương." },
              { year: "Thực tế", text: "Chính quyền Pháp chưa khôi phục được." },
            ].map((item, i) => (
              <StaggerItem
                key={i}
                index={i}
                baseDelayMs={120}
                stepMs={70}
                className="flex items-start gap-3 p-3 rounded-md bg-secondary/30"
              >
                <span className="shrink-0 px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                  {item.year}
                </span>
                <span className="text-foreground/80 leading-relaxed">{item.text}</span>
              </StaggerItem>
            ))}
          </div>
          <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
            <p className="text-accent-foreground font-semibold">
              {'→ Xuất hiện "khoảng trống quyền lực" → Cách mạng thành công vì đúng lúc "trời cho thời cơ".'}
            </p>
          </div>
        </Reveal>

        {/* Questions to analyze */}
        <Reveal className="bg-card border border-border rounded-lg p-6 md:p-8" delayMs={320}>
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <h3 className="text-lg font-bold text-foreground">Vấn đề cần phân tích</h3>
          </div>
          <div className="space-y-4">
            {[
              "Thắng lợi đó có thật sự là ngẫu nhiên?",
              "Hay là kết quả của một quá trình chuẩn bị lâu dài, có tổ chức, có chiến lược rõ ràng từ 1930–1945?",
              "Thời cơ có phải là yếu tố duy nhất quyết định thắng lợi không?",
            ].map((q, i) => (
              <StaggerItem key={i} index={i} baseDelayMs={120} stepMs={70} className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-foreground/80 leading-relaxed pt-1">{q}</p>
              </StaggerItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
