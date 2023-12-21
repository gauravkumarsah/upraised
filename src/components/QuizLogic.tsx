import { useState, useEffect } from 'react';
import { QuizQuestion, Score } from './types';
import { QUIZ_URLS } from './constants';

const initialQuestionIndex = 0;



function useQuizLogic() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(initialQuestionIndex);

  const [score, setScore] = useState<number | null>(null);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Map<number, string[]>>(
    new Map()
  );
  const [timer, setTimer] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const startTimer = () => {
    setTimer((prevTimer) => prevTimer + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(initialQuestionIndex);
    setUserAnswers(new Map());
    setScore(null);
    setStartQuiz(false);
  };

  const startQuizHandler = () => {
    setStartQuiz(true);
  };

  useEffect(() => {
    const interval = setInterval(startTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(QUIZ_URLS.GET_QUESTIONS);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data: QuizQuestion[] = await response.json();
        setQuestions(data);
      } catch (error: unknown) {
        console.error('Error fetching questions:', error);
      }
    }

    if (startQuiz) {
      fetchQuestions();
    }
  }, [startQuiz]);

  const handleAnswerSelection = (selectedOption: string) => {
    setUserAnswers((prevUserAnswers) => {
      const updatedUserAnswers = new Map(prevUserAnswers);
      const currentAnswers = updatedUserAnswers.get(currentQuestionIndex) || [];
      const answerIndex = currentAnswers.indexOf(selectedOption);

      if (answerIndex !== -1) {
        currentAnswers.splice(answerIndex, 1);
      } else {
        currentAnswers.push(selectedOption);
      }

      updatedUserAnswers.set(currentQuestionIndex, currentAnswers);
      return updatedUserAnswers;
    });
  };

  const handleNextQuestion = async () => {
    const selectedAnswer = userAnswers.get(currentQuestionIndex);

    if (selectedAnswer && selectedAnswer.length > 0) {
      setTimeTaken(timer);
      clearInterval(timer); // Stop the timer

      // Submit user's choices and time taken to the API
      try {
        const response = await fetch('/api/submit-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedAnswer,
            timeTaken,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit answer');
        }
      } catch (error) {
        console.error('Error submitting answer:', error);
        // Handle error (e.g., display an error message)
      }

      // Proceed to the next question
      if (currentQuestionIndex === questions.length - 1) {
        calculateScore();
      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(0); // Reset the timer for the next question
    }
  };

  const calculateScore = async () => {
    let totalScore = 0;
    try {
      const scoreResponse = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAnswers,
        }),
      });
      if (!scoreResponse.ok) {
        throw new Error('Failed to get scores');
      }

      const scores = await scoreResponse.json();

      questions.forEach((question, index) => {
        const userAnswer = userAnswers.get(index);
        const correctAnswers = question.correctAnswers;

        if (
          userAnswer &&
          correctAnswers.every((answer) => userAnswer.includes(answer))
        ) {
          totalScore++;
        }
      });

      // Update the score based on the fetched scores
      // Replace this logic with your actual scoring mechanism
      totalScore += scores.reduce(
        (acc: number, cur: Score) => acc + cur.score,
        0
      );
    } catch (error) {
      console.error('Error fetching or calculating score:', error);
      // Handle error (e.g., set score to a default value or show an error message)
    }

    setScore(totalScore);
  };

  const arraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

  if (startQuiz && questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userSelectedAnswer = userAnswers.get(currentQuestionIndex);
  const correctAnswers = currentQuestion?.correctAnswers;

  const isCorrect =
    userSelectedAnswer && correctAnswers
      ? arraysEqual(correctAnswers, userSelectedAnswer)
      : false;

  return {
    questions,
    currentQuestionIndex,
    startQuiz,
    score,
    userAnswers,
    handleAnswerSelection,
    handleNextQuestion,
    resetQuiz,
    startQuizHandler,
    currentQuestion,

  }
}

export default useQuizLogic;
