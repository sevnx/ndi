'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { shuffle } from "shuffle-seed"

interface QuizContainerProps {
  questions: Question[]
}

interface Question {
  question: string
  options: string[]
  correctIndex: number
}

const QuizContainer = ({ questions: initialQuestions }: QuizContainerProps) => {
  const maxQuestions = initialQuestions.length;
  const [questions, setQuestions] = useState<Question[]>(() => {
    return shuffle([...initialQuestions], "ndi2024")
  })
  const [currentQuestionId, setCurrentQuestionId] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    questions[0] || null
  )

  const nextQuestion = () => {
    if (questions.length <= 1) {
      setCurrentQuestion(null)
      return
    }
    
    const remainingQuestions = [...questions]
    remainingQuestions.shift()
    setCurrentQuestionId(currentQuestionId + 1)
    setQuestions(remainingQuestions)
    setCurrentQuestion(remainingQuestions[0])
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setIsAnswered(true)
    
    if (currentQuestion && index === currentQuestion.correctIndex) {
      console.log("Correct!")
    } else {
      console.log("Incorrect!")
    }
  }

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <div className="text-center">Quiz Complete!</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Question - {currentQuestionId} of {maxQuestions}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg text-center">
          {currentQuestion.question}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`h-16 text-lg ${
                isAnswered && index === currentQuestion.correctIndex
                  ? "bg-green-500 hover:bg-green-600"
                  : isAnswered && index === selectedAnswer && index !== currentQuestion.correctIndex
                  ? "bg-red-500 hover:bg-red-600"
                  : ""
              }`}
              onClick={() => !isAnswered && handleAnswer(index)}
              disabled={isAnswered}
            >
              {option}
            </Button>
          ))}
        </div>

        <Button 
          className="w-full h-12"
          onClick={nextQuestion}
          disabled={!isAnswered}
        >
          Next
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuizContainer;
