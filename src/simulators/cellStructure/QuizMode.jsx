import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { QUIZ_QUESTIONS } from "./data";

export default function QuizMode({ level }) {
  const questions = QUIZ_QUESTIONS[level] || QUIZ_QUESTIONS["o-level"];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }, [level]);

  const q = questions[index];

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="pointer-events-auto w-full rounded-2xl border border-slate-700 bg-slate-900/95 p-6 text-center shadow-2xl backdrop-blur-md sm:max-w-sm">
        <Trophy className="mx-auto mb-3 h-8 w-8 text-amber-400" />
        <h3 className="mb-1 text-lg font-bold text-white">
          {score} / {questions.length}
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          {score === questions.length
            ? "Perfect score!"
            : score >= questions.length * 0.6
            ? "Good work - review the ones you missed."
            : "Try Learn mode, then come back for another attempt."}
        </p>
        <button
          onClick={restart}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto w-full rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md sm:max-w-sm">
      <div className="mb-3 flex items-center justify-between font-mono text-[10.5px] tracking-wide text-teal-400">
        <span>
          QUESTION {index + 1} OF {questions.length}
        </span>
        <span>{level === "a-level" ? "A LEVEL" : "O LEVEL"}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
          <h3 className="mb-3 text-sm font-semibold leading-snug text-white">{q.question}</h3>

          <div className="mb-3 space-y-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isPicked = i === picked;
              let style = "border-slate-700 text-slate-300 hover:border-slate-500";
              if (picked !== null) {
                if (isCorrect) style = "border-teal-600 bg-teal-950/40 text-teal-200";
                else if (isPicked) style = "border-red-700 bg-red-950/30 text-red-300";
                else style = "border-slate-800 text-slate-500";
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={picked !== null}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition ${style}`}
                >
                  {opt}
                  {picked !== null && isCorrect && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-teal-400" />}
                  {picked !== null && isPicked && !isCorrect && <XCircle className="h-4 w-4 flex-shrink-0 text-red-400" />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3 text-xs leading-relaxed text-slate-400"
            >
              {q.explanation}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={next}
        disabled={picked === null}
        className="w-full rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {index < questions.length - 1 ? "Next Question" : "See Results"}
      </button>
    </div>
  );
}
