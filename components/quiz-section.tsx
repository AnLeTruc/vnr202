"use client"

import { useState, useCallback } from "react"
import { CheckCircle2, XCircle, RotateCcw, Trophy, Brain } from "lucide-react"
import { Reveal, StaggerItem } from "@/components/ui/reveal"

// ============================================================
// 10 CÂU HỎI TRẮC NGHIỆM – CÁCH MẠNG THÁNG TÁM 1945
// ============================================================

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "Hội nghị Trung ương VIII (5/1941) có quyết định quan trọng nào?",
    options: [
      "Thành lập Đảng Cộng sản Đông Dương",
      "Thành lập Mặt trận Việt Minh",
      "Phát động Tổng khởi nghĩa",
      "Tuyên bố Độc lập",
    ],
    correctIndex: 1,
    explanation:
      "Hội nghị TW VIII (5/1941) tại Pác Pó quyết định thành lập Mặt trận Việt Minh, xác định cách mạng giải phóng dân tộc là nhiệm vụ trước mắt.",
  },
  {
    id: 2,
    question: "Việt Nam Tuyên truyền Giải phóng quân được thành lập vào ngày nào?",
    options: [
      "19/5/1941",
      "9/3/1945",
      "22/12/1944",
      "2/9/1945",
    ],
    correctIndex: 2,
    explanation:
      "Việt Nam Tuyên truyền Giải phóng quân thành lập ngày 22/12/1944 tại Cao Bằng, do Võ Nguyên Giáp chỉ huy, ban đầu có 34 chiến sĩ.",
  },
  {
    id: 3,
    question: 'Chỉ thị "Nhật – Pháp bắn nhau và hành động của chúng ta" ra đời khi nào?',
    options: [
      "Tháng 8/1945",
      "Tháng 3/1945",
      "Tháng 11/1939",
      "Tháng 5/1941",
    ],
    correctIndex: 1,
    explanation:
      "Chỉ thị này ra đời ngày 12/3/1945, ngay sau khi Nhật đảo chính Pháp (9/3/1945), xác định kẻ thù chính là Nhật và chuẩn bị tổng khởi nghĩa.",
  },
  {
    id: 4,
    question: "Cách mạng giành chính quyền tại Hà Nội vào ngày nào?",
    options: [
      "13/8/1945",
      "19/8/1945",
      "23/8/1945",
      "2/9/1945",
    ],
    correctIndex: 1,
    explanation:
      "Ngày 19/8/1945, hàng vạn người dân Hà Nội đã biểu tình, giành chính quyền. Đây là mốc quan trọng nhất của Tổng khởi nghĩa.",
  },
  {
    id: 5,
    question: "Vua Bảo Đại thoái vị vào ngày nào?",
    options: [
      "19/8/1945",
      "25/8/1945",
      "30/8/1945",
      "2/9/1945",
    ],
    correctIndex: 2,
    explanation:
      'Vua Bảo Đại thoái vị ngày 30/8/1945 tại Huế, nói câu nổi tiếng: "Tôi muốn làm công dân của một nước tự do hơn làm vua một nước nô lệ."',
  },
  {
    id: 6,
    question: "Hội nghị Trung ương VI (11/1939) xác định nhiệm vụ trước mắt là gì?",
    options: [
      "Cách mạng ruộng đất",
      "Giải phóng dân tộc",
      "Xây dựng chủ nghĩa xã hội",
      "Đấu tranh nghị trường",
    ],
    correctIndex: 1,
    explanation:
      "Hội nghị TW VI đặt quyền lợi dân tộc lên hàng đầu, xác định giải phóng dân tộc là nhiệm vụ trước mắt – đây là bước chuyển hướng chiến lược quan trọng.",
  },
  {
    id: 7,
    question: "Khởi nghĩa Bắc Sơn nổ ra vào thời gian nào?",
    options: [
      "Tháng 9/1940",
      "Tháng 11/1940",
      "Tháng 1/1941",
      "Tháng 12/1944",
    ],
    correctIndex: 0,
    explanation:
      "Khởi nghĩa Bắc Sơn nổ ra ngày 27/9/1940 tại Lạng Sơn, là cuộc khởi nghĩa đầu tiên do Đảng lãnh đạo trong thời kỳ mới.",
  },
  {
    id: 8,
    question: "Yếu tố nào được xem là QUYẾT ĐỊNH thắng lợi của Cách mạng Tháng Tám?",
    options: [
      "Thời cơ khi Nhật đầu hàng",
      "Sự giúp đỡ của Đồng minh",
      "Sự chuẩn bị & lãnh đạo của Đảng",
      "Sự suy yếu của Pháp",
    ],
    correctIndex: 2,
    explanation:
      "Thời cơ chỉ là yếu tố khách quan (điều kiện). Sự chuẩn bị lâu dài 15 năm và lãnh đạo đúng đắn của Đảng mới là yếu tố quyết định thắng lợi.",
  },
  {
    id: 9,
    question: 'Tại sao nói thời cơ Tháng 8/1945 "rất ngắn"?',
    options: [
      "Vì Nhật có thể phản công lại",
      "Vì quân Tưởng, Anh sắp vào và Pháp sắp trở lại",
      "Vì nhân dân chưa sẵn sàng",
      "Vì Đảng chưa có kế hoạch",
    ],
    correctIndex: 1,
    explanation:
      "Nếu chậm vài tuần: quân Tưởng vào miền Bắc, quân Anh vào miền Nam, Pháp trở lại. Cách mạng có thể bị bóp nghẹt. Chỉ lực lượng chuẩn bị sẵn mới hành động kịp.",
  },
  {
    id: 10,
    question: "Ngày 2/9/1945 diễn ra sự kiện gì?",
    options: [
      "Thành lập Mặt trận Việt Minh",
      "Vua Bảo Đại thoái vị",
      "Hồ Chí Minh đọc Tuyên ngôn Độc lập",
      "Tổng khởi nghĩa giành chính quyền",
    ],
    correctIndex: 2,
    explanation:
      "Ngày 2/9/1945, tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
  },
]

function getScoreMessage(score: number, total: number) {
  const pct = score / total
  if (pct === 1) return { text: "Xuất sắc! Bạn nắm vững kiến thức!", icon: "🏆" }
  if (pct >= 0.8) return { text: "Rất tốt! Kiến thức vững vàng!", icon: "🌟" }
  if (pct >= 0.6) return { text: "Khá tốt! Cần ôn thêm vài phần.", icon: "👍" }
  if (pct >= 0.4) return { text: "Cần cố gắng thêm nhé!", icon: "📚" }
  return { text: "Hãy đọc lại bài viết và thử lại!", icon: "💪" }
}

export function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_DATA.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)

  const question = QUIZ_DATA[currentQ]
  const isAnswered = selected !== null
  const isCorrect = selected === question.correctIndex

  const handleSelect = useCallback(
    (idx: number) => {
      if (isAnswered) return
      setSelected(idx)
      const newAnswers = [...answers]
      newAnswers[currentQ] = idx
      setAnswers(newAnswers)
      if (idx === question.correctIndex) {
        setScore((s) => s + 1)
      }
    },
    [isAnswered, answers, currentQ, question.correctIndex]
  )

  const handleNext = () => {
    if (currentQ < QUIZ_DATA.length - 1) {
      setCurrentQ((q) => q + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setAnswers(Array(QUIZ_DATA.length).fill(null))
    setShowResult(false)
    setStarted(false)
  }

  const scoreMsg = getScoreMessage(score, QUIZ_DATA.length)

  return (
    <section id="quiz" className="py-20 md:py-28 bg-[#1a0a0a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #fbbf24 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, #fbbf24 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <Reveal delayMs={0} className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#fbbf24]/30" />
          <span className="text-[#fbbf24] font-bold text-sm tracking-widest uppercase">
            Kiểm tra kiến thức
          </span>
          <div className="h-px flex-1 bg-[#fbbf24]/30" />
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="text-3xl md:text-4xl font-extrabold text-[#fef3c7] text-center mb-4 text-balance"
        >
          <Brain className="inline-block w-8 h-8 mr-2 mb-1 text-[#fbbf24]" />
          Quiz – Bạn hiểu bao nhiêu?
        </Reveal>
        <Reveal delayMs={180} className="text-center mb-10">
          <p className="text-[#fde68a]/60 text-sm">
            10 câu hỏi trắc nghiệm về Cách mạng Tháng Tám 1945
          </p>
        </Reveal>

        {/* Start screen */}
        {!started && !showResult && (
          <Reveal delayMs={240}>
            <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full bg-[#fbbf24]/20 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-[#fbbf24]" />
              </div>
              <h3 className="text-[#fef3c7] text-xl font-bold mb-3">
                Sẵn sàng kiểm tra kiến thức?
              </h3>
              <p className="text-[#fde68a]/60 text-sm mb-6 max-w-md mx-auto">
                10 câu hỏi trắc nghiệm về Cách mạng Tháng Tám 1945. Hãy đọc kỹ bài viết phía trên trước khi bắt đầu!
              </p>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors text-lg"
              >
                Bắt đầu Quiz
              </button>
            </div>
          </Reveal>
        )}

        {/* Quiz questions */}
        {started && !showResult && (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#fde68a]/60 text-sm font-medium whitespace-nowrap">
                Câu {currentQ + 1}/{QUIZ_DATA.length}
              </span>
              <div className="flex-1 h-2 bg-[#fbbf24]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#fbbf24] rounded-full transition-all duration-500"
                  style={{ width: `${((currentQ + 1) / QUIZ_DATA.length) * 100}%` }}
                />
              </div>
              <span className="text-[#fbbf24] text-sm font-bold whitespace-nowrap">
                {score} điểm
              </span>
            </div>

            {/* Question card */}
            <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-[#fef3c7] text-lg md:text-xl font-bold mb-6 leading-relaxed">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const isThisCorrect = idx === question.correctIndex
                  const isThisSelected = idx === selected

                  let optClass =
                    "border border-[#fbbf24]/20 bg-[#fbbf24]/5 text-[#fef3c7] hover:bg-[#fbbf24]/15 hover:border-[#fbbf24]/40"

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optClass = "border-emerald-500 bg-emerald-500/15 text-emerald-200"
                    } else if (isThisSelected && !isThisCorrect) {
                      optClass = "border-red-500 bg-red-500/15 text-red-200"
                    } else {
                      optClass = "border-[#fbbf24]/10 bg-[#fbbf24]/5 text-[#fde68a]/40"
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left px-5 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-3 ${optClass} ${
                        isAnswered ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-sm font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium text-sm md:text-base">{opt}</span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div
                  className={`mt-5 p-4 rounded-xl text-sm leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-200"
                      : "bg-red-500/10 border border-red-500/20 text-red-200"
                  }`}
                >
                  <p className="font-bold mb-1">
                    {isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng!"}
                  </p>
                  <p className="text-[#fde68a]/80">{question.explanation}</p>
                </div>
              )}

              {/* Next button */}
              {isAnswered && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors"
                  >
                    {currentQ < QUIZ_DATA.length - 1 ? "Câu tiếp theo →" : "Xem kết quả"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Result screen */}
        {showResult && (
          <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">
            <div className="text-6xl mb-4">{scoreMsg.icon}</div>
            <h3 className="text-[#fef3c7] text-2xl font-bold mb-2">Kết quả</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-[#fbbf24]" />
              <span className="text-[#fbbf24] text-4xl font-extrabold">
                {score}/{QUIZ_DATA.length}
              </span>
            </div>
            <p className="text-[#fde68a]/80 text-lg mb-6">{scoreMsg.text}</p>

            {/* Answer summary */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8 max-w-md mx-auto">
              {answers.map((ans, i) => {
                const isRight = ans === QUIZ_DATA[i].correctIndex
                return (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isRight
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Làm lại
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
