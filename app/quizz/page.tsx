"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { jsPDF } from "jspdf"
import { CheckCircle2, Sparkles, XCircle } from "lucide-react"

type OptionKey = "A" | "B" | "C" | "D"

type QuizQuestion = {
  id: number
  text: string
  options: Record<OptionKey, string>
  correct: OptionKey
}

type AnswerFeedback = {
  selected: OptionKey
  isCorrect: boolean
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Sự kiện nào mở đầu cho giai đoạn "dàn hòa với Pháp" để đẩy nhanh quân Tưởng về nước thời kỳ 1945 - 1946?',
    options: {
      A: "Pháp nổ súng ở Nam Bộ (10/1945)",
      B: "Ký Hiệp định Sơ bộ Việt - Pháp (3/1946)",
      C: "Chủ tịch Hồ Chí Minh thăm Pháp (5/1946)",
      D: "Đàm phán chính thức Việt - Pháp ở Phôngtennơblô (7/1946)",
    },
    correct: "B",
  },
  {
    id: 2,
    text: "Đường lối toàn quốc kháng chiến của Đảng vạch ra mục tiêu của kháng chiến là:",
    options: {
      A: "Đánh phản động thực dân Pháp xâm lược, giành thống nhất và độc lập",
      B: "Đánh phản động phát xít Nhật xâm lược, giành thống nhất và độc lập",
      C: "Đánh phản động đế quốc Mỹ xâm lược, giành thống nhất và độc lập",
      D: "Đánh phản động Trung Hoa Dân Quốc xâm lược, giành thống nhất và độc lập",
    },
    correct: "A",
  },
  {
    id: 3,
    text: "Ai được bầu làm Tổng Bí thư của Đảng tại Đại hội đại biểu lần thứ II (1951)?",
    options: {
      A: "Trần Phú",
      B: "Hồ Chí Minh",
      C: "Trường Chinh",
      D: "Lê Hồng Phong",
    },
    correct: "C",
  },
  {
    id: 4,
    text: "Từ tháng 9-1945 đến trước tháng 3-1946 ta chủ trương:",
    options: {
      A: "Hòa với Tưởng",
      B: "Hòa với Pháp",
      C: "Đánh Tưởng",
      D: "Đánh Pháp",
    },
    correct: "A",
  },
  {
    id: 5,
    text: 'Bản chỉ thị "Kháng chiến kiến quốc" ngày 25/11/1945 của Trung ương Đảng xác định ai là kẻ thù chính của cách mạng Việt Nam lúc này?',
    options: {
      A: "Thực dân Pháp",
      B: "Đế quốc Anh",
      C: "Bọn quân phiệt Quốc dân đảng Trung Hoa",
      D: "Phát xít Nhật",
    },
    correct: "A",
  },
  {
    id: 6,
    text: "Ngày 23-9-1945 gắn với sự kiện lịch sử nào?",
    options: {
      A: "Pháp nổ súng xâm lược nước ta lần thứ 2",
      B: "Bác ra lời kêu gọi toàn quốc kháng chiến",
      C: "Nhật đảo chính Pháp độc chiếm Đông Dương",
      D: "Hội nghị quốc dân ở Tân Trào",
    },
    correct: "A",
  },
  {
    id: 7,
    text: "Kết quả lớn nhất mà quân và dân ta đạt được trong chiến dịch Việt Bắc - Thu Đông 1947 là:",
    options: {
      A: "Đánh bại âm mưu, kế hoạch đánh nhanh thắng nhanh của thực dân Pháp",
      B: "Tiêu diệt bộ phận lớn sinh lực địch",
      C: "Bộ đội chủ lực ta trưởng thành, lớn mạnh",
      D: "Đẩy quân Pháp vào thế bị động trên chiến trường",
    },
    correct: "A",
  },
  {
    id: 8,
    text: "Đầu năm 1953, nhằm cứu vãn tình thế ngày càng xa lầy và tìm kiếm giải pháp chính trị có danh dự, Pháp và Mỹ đã đưa một viên tướng Pháp sang làm tổng chỉ huy quân đội Pháp ở Đông Dương và lập kế hoạch quân sự nào?",
    options: {
      A: "Nava",
      B: "De Castries",
      C: "Salan",
      D: "Leclerc",
    },
    correct: "A",
  },
  {
    id: 9,
    text: '"Chúng ta thà hi sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ..." là đoạn trích trong văn kiện nào?',
    options: {
      A: "Chỉ thị Toàn dân kháng chiến của Ban Thường vụ Trung ương Đảng",
      B: "Lời kêu gọi toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh",
      C: "Tác phẩm Kháng chiến nhất định thắng lợi của Tổng Bí thư Trường Chinh",
      D: "Chỉ thị sửa soạn khởi nghĩa của Tổng bộ Việt Minh",
    },
    correct: "B",
  },
  {
    id: 10,
    text: 'Ai là tác giả của tác phẩm "Kháng chiến nhất định thắng lợi"?',
    options: {
      A: "Hồ Chí Minh",
      B: "Lê Duẩn",
      C: "Trường Chinh",
      D: "Võ Nguyên Giáp",
    },
    correct: "C",
  },
]

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"]
const CHALLENGE_SECONDS = 15
const QUESTION_LOAD_MS = 450

function countCorrectAnswers(
  questions: QuizQuestion[],
  answers: Record<number, OptionKey | undefined>,
) {
  return questions.reduce((total, question) => {
    return answers[question.id] === question.correct ? total + 1 : total
  }, 0)
}

function shuffleQuestions(list: QuizQuestion[]) {
  const cloned = [...list]
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[j]] = [cloned[j], cloned[i]]
  }
  return cloned
}

function buildAnswerChain(
  questions: QuizQuestion[],
  answers: Record<number, OptionKey | undefined>,
) {
  return questions
    .map((question, index) => {
      const picked = answers[question.id] ?? "-"
      return `C${index + 1}:${picked}`
    })
    .join(" | ")
}

function toSafeFileName(name: string) {
  const normalized = name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()

  return normalized || "nguoi-chien-thang"
}

export default function QuizzPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_SECONDS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false)
  const [answers, setAnswers] = useState<Record<number, OptionKey | undefined>>(
    {},
  )
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null)
  const [finalScore, setFinalScore] = useState(0)
  const [showWinModal, setShowWinModal] = useState(false)
  const [winnerName, setWinnerName] = useState("")

  const answersRef = useRef<Record<number, OptionKey | undefined>>({})
  const loadingTimeoutRef = useRef<number | null>(null)

  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex] ?? null

  const liveScore = useMemo(
    () => countCorrectAnswers(questions, answers),
    [answers, questions],
  )
  const answeredCount = useMemo(() => {
    return questions.reduce((total, question) => {
      return answers[question.id] ? total + 1 : total
    }, 0)
  }, [answers, questions])
  const answerChain = useMemo(
    () => buildAnswerChain(questions, answers),
    [answers, questions],
  )

  const clearLoadingTimeout = useCallback(() => {
    if (loadingTimeoutRef.current !== null) {
      window.clearTimeout(loadingTimeoutRef.current)
      loadingTimeoutRef.current = null
    }
  }, [])

  const finishChallenge = useCallback(() => {
    clearLoadingTimeout()
    const score = countCorrectAnswers(questions, answersRef.current)

    setFinalScore(score)
    setStarted(false)
    setFinished(true)
    setFeedback(null)
    setIsLoadingQuestion(false)

    if (questions.length > 0 && score === questions.length) {
      setShowWinModal(true)
    }
  }, [clearLoadingTimeout, questions])

  useEffect(() => {
    return () => clearLoadingTimeout()
  }, [clearLoadingTimeout])

  useEffect(() => {
    if (!started || finished || isLoadingQuestion || feedback) return

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          finishChallenge()
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [feedback, finishChallenge, finished, isLoadingQuestion, started])

  const startQuestionLoading = useCallback(
    (nextIndex: number) => {
      clearLoadingTimeout()
      setIsLoadingQuestion(true)
      setFeedback(null)

      loadingTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex(nextIndex)
        setIsLoadingQuestion(false)
      }, QUESTION_LOAD_MS)
    },
    [clearLoadingTimeout],
  )

  const handleStart = () => {
    const shuffledQuestions = shuffleQuestions(QUESTIONS)

    clearLoadingTimeout()
    setQuestions(shuffledQuestions)
    setStarted(true)
    setFinished(false)
    setTimeLeft(CHALLENGE_SECONDS)
    setCurrentIndex(0)
    setAnswers({})
    answersRef.current = {}
    setFeedback(null)
    setFinalScore(0)
    setShowWinModal(false)
    setWinnerName("")

    setIsLoadingQuestion(true)
    loadingTimeoutRef.current = window.setTimeout(() => {
      setIsLoadingQuestion(false)
    }, QUESTION_LOAD_MS)
  }

  const handleSelectAnswer = (option: OptionKey) => {
    if (!started || finished || !currentQuestion || feedback || isLoadingQuestion) {
      return
    }

    const isCorrect = option === currentQuestion.correct
    const nextAnswers = { ...answersRef.current, [currentQuestion.id]: option }
    answersRef.current = nextAnswers
    setAnswers(nextAnswers)
    setFeedback({
      selected: option,
      isCorrect,
    })
  }

  const handleNextQuestion = () => {
    if (!started || finished || !feedback) return

    const nextIndex = currentIndex + 1
    if (nextIndex >= totalQuestions) {
      finishChallenge()
      return
    }

    startQuestionLoading(nextIndex)
  }

  const exportCertificate = () => {
    const name = winnerName.trim()
    if (!name) return

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    const now = new Date()
    const dateLabel = now.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    doc.setFillColor(255, 249, 235)
    doc.rect(0, 0, 297, 210, "F")

    doc.setDrawColor(146, 64, 14)
    doc.setLineWidth(2)
    doc.rect(10, 10, 277, 190, "S")

    doc.setFont("times", "bold")
    doc.setFontSize(36)
    doc.setTextColor(127, 29, 29)
    doc.text("CHUNG NHAN CHIEN THANG", 148.5, 48, { align: "center" })

    doc.setFont("times", "normal")
    doc.setFontSize(19)
    doc.setTextColor(120, 53, 15)
    doc.text("Thach dau Quizz lich su Cach mang Viet Nam", 148.5, 68, {
      align: "center",
    })

    doc.setFont("times", "bold")
    doc.setFontSize(32)
    doc.setTextColor(22, 101, 52)
    doc.text(name, 148.5, 102, { align: "center" })

    doc.setFont("times", "normal")
    doc.setFontSize(17)
    doc.setTextColor(68, 64, 60)
    doc.text(
      `Da tra loi dung ${totalQuestions}/${totalQuestions} cau hoi trong ${CHALLENGE_SECONDS} giay.`,
      148.5,
      124,
      {
        align: "center",
      },
    )

    doc.setFontSize(14)
    doc.text(`Ngay cap: ${dateLabel}`, 148.5, 145, { align: "center" })
    doc.text("Don vi: Challenge Quizz CM Thang Tam 1945", 148.5, 157, {
      align: "center",
    })

    doc.save(`certificate-${toSafeFileName(name)}.pdf`)
  }

  const canAnswer = started && !finished && !isLoadingQuestion && !feedback
  const isLastQuestion = currentIndex === totalQuestions - 1
  const progressPercent = totalQuestions
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0
  const isUrgentTime = started && !finished && timeLeft <= 5

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#fef3c7] px-4 py-10">
      <div className="pointer-events-none absolute -top-16 -left-12 h-64 w-64 rounded-full bg-[#fbbf24]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-10 h-72 w-72 rounded-full bg-[#fb7185]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#fde68a]/25 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#fef3c7] drop-shadow md:text-3xl">
              Quizz Lịch Sử Cách mạng Tháng Tám 1945
            </h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-[#fde68a]">
              <Sparkles className="h-4 w-4" />
              Phiên bản thử thách tốc độ - từng câu một
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[#fbbf24] px-4 py-2 text-sm font-semibold text-[#7c2d12] transition-colors hover:bg-[#f59e0b]"
          >
            Về trang chủ
          </Link>
        </div>

        <section className="rounded-3xl border border-[#fbbf24]/50 bg-[#fff7ed]/95 p-6 shadow-[0_18px_60px_rgba(127,29,29,0.25)] backdrop-blur">
          <p className="font-medium text-[#7c2d12]">
            Luật chơi: bạn có tổng cộng <strong>15 giây</strong> để trả lời đúng
            nhiều câu nhất. Mỗi lần trả lời, hệ thống sẽ báo đúng/sai ngay lập tức
            và đồng hồ sẽ tạm dừng cho đến khi bạn bấm qua câu tiếp theo.
          </p>

          {!started && !finished && (
            <button
              type="button"
              onClick={handleStart}
              className="mt-5 rounded-full bg-[#991b1b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7f1d1d]"
            >
              Bắt đầu thử thách
            </button>
          )}

          {started && (
            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    isUrgentTime
                      ? "animate-pulse bg-[#dc2626] text-white"
                      : "bg-[#7f1d1d] text-[#fde68a]"
                  }`}
                >
                Còn lại: {timeLeft}s
                </span>
                <span className="rounded-full border border-[#f59e0b]/40 bg-[#fef3c7] px-4 py-2 text-sm font-semibold text-[#92400e]">
                  Câu: {Math.min(currentIndex + 1, totalQuestions)}/{totalQuestions}
                </span>
                <span className="rounded-full border border-[#f59e0b]/40 bg-[#fef3c7] px-4 py-2 text-sm font-semibold text-[#92400e]">
                  Đúng hiện tại: {liveScore}/{totalQuestions}
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f59e0b]/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#92400e]">
                Tiến độ trả lời: {progressPercent}%
              </p>
            </div>
          )}

          {finished && (
            <div className="mt-5 rounded-2xl border border-[#d97706]/35 bg-[#fffbeb] p-4 text-[#7c2d12]">
              <p className="font-semibold">
                {finalScore === totalQuestions
                  ? `Chúc mừng! Bạn đã trả lời đúng toàn bộ ${totalQuestions}/${totalQuestions}.`
                  : `Kết thúc! Bạn trả lời đúng ${finalScore}/${totalQuestions} câu.`}
              </p>
              <div className="mt-3 rounded-xl border border-[#7c2d12]/20 bg-white/80 p-3">
                <p className="text-sm font-semibold text-[#7c2d12]">
                  Chuỗi đáp án bạn đã tích:
                </p>
                <p className="mt-1 break-words font-mono text-xs text-[#7c2d12] md:text-sm">
                  {answerChain || "Chưa có lựa chọn nào."}
                </p>
              </div>
              {questions.length > 0 && (
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {questions.map((question, index) => {
                    const picked = answers[question.id]
                    const isCorrect = picked === question.correct
                    return (
                      <div
                        key={question.id}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          picked
                            ? isCorrect
                              ? "border-[#166534]/30 bg-[#dcfce7] text-[#166534]"
                              : "border-[#b91c1c]/30 bg-[#fee2e2] text-[#b91c1c]"
                            : "border-[#7c2d12]/20 bg-white text-[#7c2d12]"
                        }`}
                      >
                        Câu {index + 1}: {picked ?? "-"}
                      </div>
                    )
                  })}
                </div>
              )}
              {finalScore === totalQuestions && !showWinModal && (
                <button
                  type="button"
                  onClick={() => setShowWinModal(true)}
                  className="mt-3 rounded-lg bg-[#991b1b] px-4 py-2 text-sm font-semibold text-white"
                >
                  Nhập tên và xuất PDF
                </button>
              )}
              <button
                type="button"
                onClick={handleStart}
                className="mt-3 ml-2 rounded-lg border border-[#7c2d12]/30 bg-white px-4 py-2 text-sm font-semibold text-[#7c2d12]"
              >
                Chơi lại
              </button>
            </div>
          )}
        </section>

        {started && (
          <section className="mt-6 rounded-3xl border border-[#fbbf24]/40 bg-white/95 p-5 shadow-[0_18px_40px_rgba(124,45,18,0.22)] transition-all duration-300">
            {isLoadingQuestion ? (
              <div className="animate-pulse space-y-4">
                <div className="h-5 w-2/3 rounded bg-[#fbbf24]/35" />
                <div className="h-12 rounded-xl bg-[#fbbf24]/20" />
                <div className="h-12 rounded-xl bg-[#fbbf24]/20" />
                <div className="h-12 rounded-xl bg-[#fbbf24]/20" />
              </div>
            ) : (
              currentQuestion && (
                <div key={currentQuestion.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="font-bold text-[#7f1d1d]">
                    Câu {currentIndex + 1}: {currentQuestion.text}
                  </h2>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {OPTION_KEYS.map((optionKey) => {
                      const selected = feedback?.selected === optionKey
                      const isCorrectOption = optionKey === currentQuestion.correct

                      let buttonClass =
                        "border-[#7c2d12]/20 bg-white text-[#7c2d12] hover:border-[#7c2d12]/40"

                      if (feedback && isCorrectOption) {
                        buttonClass = "border-[#166534] bg-[#dcfce7] text-[#166534]"
                      } else if (feedback && selected && !feedback.isCorrect) {
                        buttonClass = "border-[#b91c1c] bg-[#fee2e2] text-[#b91c1c]"
                      } else if (selected) {
                        buttonClass = "border-[#b45309] bg-[#fef3c7] text-[#7c2d12]"
                      }

                      return (
                        <button
                          key={optionKey}
                          type="button"
                          onClick={() => handleSelectAnswer(optionKey)}
                          disabled={!canAnswer}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow disabled:cursor-not-allowed disabled:opacity-75 ${buttonClass}`}
                        >
                          {optionKey}. {currentQuestion.options[optionKey]}
                        </button>
                      )
                    })}
                  </div>

                  {feedback && (
                    <div className="mt-4 rounded-xl border border-[#f59e0b]/35 bg-[#fffbeb] p-4">
                      <p
                        className={`font-semibold ${
                          feedback.isCorrect ? "text-[#166534]" : "text-[#b91c1c]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {feedback.isCorrect ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                          {feedback.isCorrect
                            ? "Chính xác! Bạn trả lời đúng."
                            : "Chưa đúng. Hãy cố gắng ở câu tiếp theo."}
                        </span>
                      </p>
                      {!feedback.isCorrect && (
                        <p className="mt-1 text-sm text-[#7c2d12]">
                          Đáp án đúng: {currentQuestion.correct}.{" "}
                          {currentQuestion.options[currentQuestion.correct]}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="mt-3 rounded-lg bg-[#991b1b] px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#7f1d1d] hover:shadow-lg"
                      >
                        {isLastQuestion ? "Hoàn thành bài" : "Câu tiếp theo"}
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </section>
        )}
      </div>

      {showWinModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#f59e0b]/40 bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-[#7f1d1d]">
              Chúc mừng bạn đã chiến thắng!
            </h2>
            <p className="mt-2 text-sm text-[#7c2d12]">
              Nhập tên để xuất certificate PDF.
            </p>

            <input
              value={winnerName}
              onChange={(event) => setWinnerName(event.target.value)}
              placeholder="Nhập họ tên"
              className="mt-4 w-full rounded-lg border border-[#7c2d12]/25 px-3 py-2 text-[#7c2d12] outline-none focus:border-[#b45309]"
            />

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWinModal(false)}
                className="rounded-lg border border-[#7c2d12]/30 px-4 py-2 text-sm font-semibold text-[#7c2d12]"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={exportCertificate}
                disabled={!winnerName.trim()}
                className="rounded-lg bg-[#991b1b] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Xuất PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
