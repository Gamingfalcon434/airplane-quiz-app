// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { ALL_QUESTIONS } from './questions'; 

// Expanded question set with new "insane" and "missiles" difficulties.
// We will randomize question order each time the user picks a difficulty.
// Each difficulty has 20 questions for easy, medium, and hard (16 old + 4 new), and 16 for insane/missiles.
// Only 5 will be used per session.

function getQuestionsForDifficulty(difficulty) {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty);
}

function USFighterJetQuiz() {
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizId, setQuizId] = useState(0); // helps re-randomize even on same difficulty

  // We'll track user attempts in localStorage, to compare current attempt with previous.
  // We'll store an array of objects: { date, difficulty, score, total }
  const [history, setHistory] = useState([]);

  // Load quiz history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Whenever difficulty OR quizId changes, get new questions, randomize order, and limit to 5
  useEffect(() => {
    const filteredQuestions = getQuestionsForDifficulty(difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, 5);
    setQuestions(limited);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setUserAnswers([]);
  }, [difficulty, quizId]);

  const saveHistory = (newRecord) => {
    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const restartQuiz = () => {
    // If we want to keep the same difficulty, just increment quizId
    setQuizId((prev) => prev + 1);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      // check if correct
      if (selectedOption === questions[currentQuestionIndex].correctIndex) {
        setScore((prev) => prev + 1);
      }
      // store user's answer
      setUserAnswers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = selectedOption;
        return updated;
      });
    }

    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // finish
      let finalScore = score;
      if (selectedOption !== null && selectedOption === questions[currentQuestionIndex].correctIndex) {
        finalScore++;
      }
      setScore(finalScore);
      setShowResults(true);
      // Save attempt to history
      saveHistory({
        date: new Date().toISOString(),
        difficulty,
        score: finalScore,
        total: questions.length,
      });
    }
  };

  // Compare with previous attempts
  // We will find the last attempt for the same difficulty (if any)
  let previousScore = null;
  let previousTotal = null;

  const sameDiffHistory = history.filter((item) => item.difficulty === difficulty);
  if (sameDiffHistory.length > 1) {
    // second to last is the one before the most recent
    const lastResult = sameDiffHistory[sameDiffHistory.length - 2];
    previousScore = lastResult.score;
    previousTotal = lastResult.total;
  } else if (sameDiffHistory.length === 1) {
    // There's a single attempt, no previous
    previousScore = null;
  }

  // If questions haven't loaded or are empty, handle gracefully
  if (!questions.length) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">US Fighter Jet Quiz</h1>
        <p>No questions available for this difficulty yet.</p>
      </div>
    );
  }

  // Prepare a list of missed questions if we are showing results
  let missedQuestions = [];
  if (showResults) {
    missedQuestions = questions
      .map((q, i) => {
        // if user didn't select the correct option
        if (userAnswers[i] !== q.correctIndex) {
          return {
            question: q.question,
            correctAnswer: q.options[q.correctIndex],
            userAnswer: userAnswers[i] !== undefined && userAnswers[i] !== null ? q.options[userAnswers[i]] : "No Answer",
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  const question = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">US Fighter Jet Quiz</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={difficulty === "easy" ? "default" : "outline"} onClick={() => handleDifficultyChange("easy")}>Easy</Button>
        <Button variant={difficulty === "medium" ? "default" : "outline"} onClick={() => handleDifficultyChange("medium")}>Medium</Button>
        <Button variant={difficulty === "hard" ? "default" : "outline"} onClick={() => handleDifficultyChange("hard")}>Hard</Button>
        <Button variant={difficulty === "insane" ? "default" : "outline"} onClick={() => handleDifficultyChange("insane")}>Insane</Button>
        <Button variant={difficulty === "missiles" ? "default" : "outline"} onClick={() => handleDifficultyChange("missiles")}>Missiles</Button>
      </div>

      {showResults ? (
        <Card className="p-4 mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="mb-2">You scored {score} out of {questions.length}.</p>
            {previousScore !== null ? (
              <p className="mb-2">
                Previous attempt: {previousScore}/{previousTotal}.<br/>
                Improvement (score difference): {(score - previousScore) >= 0 ? `+${score - previousScore}` : `${score - previousScore}` }.
              </p>
            ) : (
              <p className="mb-2">No previous attempt found to compare.</p>
            )}
            {missedQuestions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Questions You Missed</h3>
                <ul className="list-disc list-inside space-y-2">
                  {missedQuestions.map((mq, i) => (
                    <li key={i}>
                      <p><strong>Q:</strong> {mq.question}</p>
                      <p><strong>Your Answer:</strong> {mq.userAnswer}</p>
                      <p><strong>Correct Answer:</strong> {mq.correctAnswer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button onClick={restartQuiz}>Try Again</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="p-4 mb-4">
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1} of {questions.length}</h2>
              <p className="mb-4">{question.question}</p>
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index ? "default" : "outline"}
                  className="block w-full text-left mb-2"
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </Button>
              ))}
              <Button onClick={handleNext} className="mt-4">
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      {history.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-2xl shadow">
          <div className="flex items-center mb-4">
            <BarChart2 className="mr-2" />
            <h3 className="font-semibold">Your Quiz History</h3>
          </div>
          <ul className="text-sm space-y-2">
            {history.map((h, i) => (
              <li key={i}>
                <strong>{h.difficulty.toUpperCase()}</strong> | {new Date(h.date).toLocaleString()} | Score: {h.score}/{h.total}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default USFighterJetQuiz;
