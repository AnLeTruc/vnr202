import { Megaphone, Swords } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

export function ForceSection() {
  return (
    <section id="luc-luong" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Phần II-B</span>
          <div className="h-px flex-1 bg-primary/20" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4 text-balance"
        >
          Chuẩn bị lực lượng
        </Reveal>
        <Reveal delayMs={200} as="p" className="text-center text-muted-foreground mb-12 text-lg">
          Quá trình xây dựng lực lượng từ 1941 đến 1945
        </Reveal>

        {/* Historical image */}
        <Reveal delayMs={220} className="mb-10">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
            <div className="aspect-[16/9] md:aspect-[21/9] relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Vo_Nguyen_Giap%2C_Vietminh_forces%2C_1944.jpg/500px-Vo_Nguyen_Giap%2C_Vietminh_forces%2C_1944.jpg"
                alt="Đại tướng Võ Nguyên Giáp và lực lượng Việt Minh, 1944"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-lg">
                  Đại tướng Võ Nguyên Giáp cùng lực lượng Việt Minh (1944)
                </p>
                <p className="text-white/60 text-xs mt-1">Nguồn: Wikimedia Commons</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Political force */}
          <Reveal className="bg-card border border-border rounded-lg p-6 md:p-8" delayMs={260}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 text-[#d4a017] flex items-center justify-center">
                <Megaphone className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Lực lượng chính trị</h3>
            </div>
            <div className="space-y-4">
              {[
                "Việt Minh công bố Tuyên ngôn (25/10/1941).",
                "Xây dựng các đoàn thể cứu quốc.",
                "Mở rộng phong trào trong công — nông — trí thức — tiểu tư sản.",
                'Cao trào "phá kho thóc giải quyết nạn đói".',
              ].map((item, i) => (
                <StaggerItem key={i} index={i} baseDelayMs={120} stepMs={70} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-[#fbbf24]/10 text-[#d4a017] flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80 leading-relaxed text-sm">{item}</p>
                </StaggerItem>
              ))}
            </div>
            <div className="mt-6 p-3 bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-md">
              <p className="text-sm font-semibold text-[#92400e]">
                {"→ Quần chúng được tổ chức, giác ngộ, tập hợp. Không có sự chuẩn bị này thì dù có thời cơ cũng không thể tổng khởi nghĩa."}
              </p>
            </div>
          </Reveal>

          {/* Military force */}
          <Reveal className="bg-card border border-border rounded-lg p-6 md:p-8" delayMs={320}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Swords className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Lực lượng vũ trang</h3>
            </div>
            <div className="space-y-4">
              {[
                { year: "1940", text: "Khởi nghĩa Bắc Sơn." },
                { year: "1940", text: "Khởi nghĩa Nam Kỳ." },
                { year: "1940", text: "Binh biến Đô Lương." },
                { year: "22/12/1944", text: "Thành lập Việt Nam Tuyên truyền Giải phóng quân." },
                { year: "1941–45", text: "Thành lập các chiến khu (Việt Bắc)." },
              ].map((item, i) => (
                <StaggerItem key={i} index={i} baseDelayMs={120} stepMs={70} className="flex items-start gap-3">
                  <span className="shrink-0 px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                    {item.year}
                  </span>
                  <p className="text-foreground/80 leading-relaxed text-sm">{item.text}</p>
                </StaggerItem>
              ))}
            </div>
            <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-md">
              <p className="text-sm font-semibold text-primary">
                {'→ Nếu "ăn may", tại sao có hệ thống lực lượng vũ trang sẵn sàng như vậy?'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
