"use client";

import { useState } from "react";
import { QuizItem } from "@/lib/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface QuizCardProps {
  item: QuizItem;
}

export function QuizCard({ item }: QuizCardProps) {
  const [selection, setSelection] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (choice: string) => {
    setSelection(choice);
    setIsCorrect(choice === item.answer);
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.prompt}</p>
          {item.hint ? (
            <p className="text-xs text-slate-500 mt-1">Hint: {item.hint}</p>
          ) : null}
        </div>
        <Badge tone="info">Quiz</Badge>
      </div>
      <div className="grid gap-2">
        {item.choices.map((choice) => {
          const isActive = selection === choice;
          const isAnswer = choice === item.answer;
          const tone =
            isCorrect === null
              ? "outline"
              : isActive && isCorrect
                ? "primary"
                : isActive && !isCorrect
                  ? "warning"
                  : "outline";

          return (
            <Button
              key={choice}
              variant={tone === "primary" ? "primary" : "outline"}
              className={`justify-start ${isActive ? "" : "border-slate-200"}`}
              onClick={() => handleSelect(choice)}
            >
              {choice}
              {isCorrect !== null && isAnswer ? " ✓" : ""}
            </Button>
          );
        })}
      </div>
      {isCorrect !== null ? (
        <p
          className={`text-sm font-semibold ${
            isCorrect ? "text-green-700" : "text-amber-700"
          }`}
        >
          {isCorrect ? "Benar!" : `Kurang tepat, jawabannya ${item.answer}`}
        </p>
      ) : null}
    </Card>
  );
}
