'use client'

import { useState } from 'react'

interface QuizResult {
  tool: string
  reason: string
  link: string
}

export default function DecisionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  
  const questions = [
    {
      question: "What's your primary use case for AI?",
      options: [
        { value: 'writing', label: 'Content writing and editing' },
        { value: 'coding', label: 'Programming and debugging' },
        { value: 'research', label: 'Research and fact-checking' },
        { value: 'creative', label: 'Creative projects (images, stories)' }
      ]
    },
    {
      question: "What's your monthly budget for AI tools?",
      options: [
        { value: 'free', label: 'I need a free option' },
        { value: 'budget', label: 'Under $10/month' },
        { value: 'standard', label: '$10-20/month' },
        { value: 'premium', label: 'More than $20/month' }
      ]
    },
    {
      question: "Which feature is most important to you?",
      options: [
        { value: 'quality', label: 'Highest quality outputs' },
        { value: 'speed', label: 'Fast response times' },
        { value: 'features', label: 'Most features and capabilities' },
        { value: 'privacy', label: 'Privacy and data security' }
      ]
    }
  ]
  
  const getRecommendation = (): QuizResult => {
    const [useCase, budget, priority] = answers
    
    if (budget === 'free') {
      return {
        tool: 'Google Gemini',
        reason: 'It offers the most comprehensive free tier with excellent capabilities for ' + 
                (useCase === 'writing' ? 'content creation' : useCase === 'coding' ? 'programming tasks' : 'general use'),
        link: '#review-google-gemini'
      }
    }
    
    if (useCase === 'writing' && budget !== 'free') {
      return {
        tool: 'Claude',
        reason: 'It consistently produces the highest quality written content at a reasonable price point',
        link: '#review-claude'
      }
    }
    
    if (useCase === 'coding') {
      return {
        tool: 'GitHub Copilot',
        reason: 'It\'s specifically designed for coding with deep IDE integration and code understanding',
        link: '#review-github-copilot'
      }
    }
    
    if (useCase === 'research' && priority === 'quality') {
      return {
        tool: 'Perplexity AI',
        reason: 'It excels at research with real-time data access and source citations',
        link: '#review-perplexity'
      }
    }
    
    return {
      tool: 'Claude',
      reason: 'It offers the best balance of quality, features, and price for most users',
      link: '#review-claude'
    }
  }
  
  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }
  
  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }
  
  if (showResult) {
    const recommendation = getRecommendation()
    
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Your Perfect Match: {recommendation.tool}
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            {recommendation.reason}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={recommendation.link}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Read Full Review →
            </a>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Current question */}
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h3>
        
        {/* Answer options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="text-gray-900 font-medium">{option.label}</span>
            </button>
          ))}
        </div>
        
        {/* Navigation */}
        {currentQuestion > 0 && (
          <button
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1)
              setAnswers(answers.slice(0, -1))
            }}
            className="mt-6 text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to previous question
          </button>
        )}
      </div>
    </div>
  )
}