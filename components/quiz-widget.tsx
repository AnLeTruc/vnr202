"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { CheckCircle2, XCircle, RotateCcw, Trophy, Brain, X } from "lucide-react"

// ---- Sound effects via Web Audio API (no external files needed) ----
function playCorrectSound() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "sine"
    // Two rising tones
    osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12) // E5
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24) // G5
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.45)
  } catch {}
}

function playWrongSound() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "square"
    osc.frequency.setValueAtTime(311.13, ctx.currentTime) // Eb4
    osc.frequency.setValueAtTime(233.08, ctx.currentTime + 0.15) // Bb3
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.35)
  } catch {}
}

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
    options: ["19/5/1941", "9/3/1945", "22/12/1944", "2/9/1945"],
    correctIndex: 2,
    explanation:
      "Việt Nam Tuyên truyền Giải phóng quân thành lập ngày 22/12/1944 tại Cao Bằng, do Võ Nguyên Giáp chỉ huy, ban đầu có 34 chiến sĩ.",
  },
  {
    id: 3,
    question: 'Chỉ thị "Nhật – Pháp bắn nhau và hành động của chúng ta" ra đời khi nào?',
    options: ["Tháng 8/1945", "Tháng 3/1945", "Tháng 11/1939", "Tháng 5/1941"],
    correctIndex: 1,
    explanation:
      "Chỉ thị này ra đời ngày 12/3/1945, ngay sau khi Nhật đảo chính Pháp (9/3/1945), xác định kẻ thù chính là Nhật và chuẩn bị tổng khởi nghĩa.",
  },
  {
    id: 4,
    question: "Cách mạng giành chính quyền tại Hà Nội vào ngày nào?",
    options: ["13/8/1945", "19/8/1945", "23/8/1945", "2/9/1945"],
    correctIndex: 1,
    explanation:
      "Ngày 19/8/1945, hàng vạn người dân Hà Nội đã biểu tình, giành chính quyền. Đây là mốc quan trọng nhất của Tổng khởi nghĩa.",
  },
  {
    id: 5,
    question: "Vua Bảo Đại thoái vị vào ngày nào?",
    options: ["19/8/1945", "25/8/1945", "30/8/1945", "2/9/1945"],
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
    options: ["Tháng 9/1940", "Tháng 11/1940", "Tháng 1/1941", "Tháng 12/1944"],
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

export function QuizWidget() {
  const [isOpen, setIsOpen] = useState(false)
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
        playCorrectSound()
      } else {
        playWrongSound()
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

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const scoreMsg = getScoreMessage(score, QUIZ_DATA.length)

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleToggle}
      />

      {/* Quiz popup – centered */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="w-full max-w-2xl max-h-[calc(100vh-4rem)] bg-[#1a0a0a] rounded-2xl shadow-2xl border border-[#fbbf24]/30 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-amber-700 to-amber-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Quiz Lịch sử</p>
                <p className="text-xs text-white/80">10 câu hỏi – CM Tháng Tám 1945</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Đóng quiz"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {/* Start screen */}
            {!started && !showResult && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#fbbf24]/20 flex items-center justify-center mx-auto mb-5">
                  <Brain className="w-8 h-8 text-[#fbbf24]" />
                </div>
                <h3 className="text-[#fef3c7] text-lg font-bold mb-2">
                  Sẵn sàng kiểm tra kiến thức?
                </h3>
                <p className="text-[#fde68a]/60 text-sm mb-6 leading-relaxed">
                  10 câu hỏi trắc nghiệm về Cách mạng Tháng Tám 1945
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="px-6 py-2.5 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors"
                >
                  Bắt đầu Quiz
                </button>
              </div>
            )}

            {/* Quiz questions */}
            {started && !showResult && (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[#fde68a]/60 text-xs font-medium whitespace-nowrap">
                    {currentQ + 1}/{QUIZ_DATA.length}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#fbbf24]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#fbbf24] rounded-full transition-all duration-500"
                      style={{ width: `${((currentQ + 1) / QUIZ_DATA.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-[#fbbf24] text-xs font-bold whitespace-nowrap">
                    {score} điểm
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-[#fef3c7] text-sm md:text-base font-bold leading-relaxed">
                  {question.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
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
                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2.5 ${optClass} ${
                          isAnswered ? "cursor-default" : "cursor-pointer"
                        }`}
                      >
                        <span className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-medium text-sm leading-snug">{opt}</span>
                        {isAnswered && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />
                        )}
                        {isAnswered && isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
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
                  <div className="text-center pt-1">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors text-sm"
                    >
                      {currentQ < QUIZ_DATA.length - 1 ? "Câu tiếp theo →" : "Xem kết quả"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Result screen */}
            {showResult && (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">{scoreMsg.icon}</div>
                <h3 className="text-[#fef3c7] text-xl font-bold mb-1">Kết quả</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-[#fbbf24] text-3xl font-extrabold">
                    {score}/{QUIZ_DATA.length}
                  </span>
                </div>
                <p className="text-[#fde68a]/80 text-sm mb-5">{scoreMsg.text}</p>

                {/* Answer summary */}
                <div className="grid grid-cols-5 gap-2 mb-6 max-w-xs mx-auto">
                  {answers.map((ans, i) => {
                    const isRight = ans === QUIZ_DATA[i].correctIndex
                    return (
                      <div
                        key={i}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
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
                  className="px-6 py-2.5 bg-[#fbbf24] text-[#7c2d12] font-bold rounded-xl hover:bg-[#f59e0b] transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm lại
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating quiz button – above chatbot button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-22 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-linear-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
        }`}
        aria-label={isOpen ? "Đóng quiz" : "Mở quiz"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Brain className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  )
}
