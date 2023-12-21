import React from 'react';
import { QuizQuestion } from './types';
import styles from './quiz.module.css';
import Image from 'next/image';
import CircularScoreMeter from './CircularScoreMeter';
import useQuizLogic from './QuizLogic';


const QuizUI = () => {
  const {
    questions,
    currentQuestionIndex,
    startQuiz,
    score,
    handleAnswerSelection,
    handleNextQuestion,
    resetQuiz,
    isLoading,
    startQuizHandler,
    userAnswers,
    currentQuestion,
  } = useQuizLogic();

  return (
    <div className={styles.quizContainer}>
      {!startQuiz ? (
        <div className={styles.homeScreen}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/upraised.svg"
            alt="Upraised Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.quizTextContainer}>Quiz</div>
          <button className={styles.startButton} onClick={startQuizHandler}>
            start
          </button>
        </div>
      ) : score === null ? (
        <div className={styles.questionScreen}>
          <Image
            className={styles.questionScreenBG}
            src="/question-bg.svg"
            alt="Upraised Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.questionContainer}>
            <div className={styles.quizProgress}>
              <div className={styles.questionIndex}>
                {currentQuestionIndex + 1}
              </div>
              <div className={styles.questionLength}>
                {'/'}
                {questions.length}
              </div>
            </div>
            <div className={styles.questionText}>
              {currentQuestion?.question}
            </div>
            <div className={styles.options}>
              {questions[currentQuestionIndex]?.options.map((option) => {
                const isSelected =
                  userAnswers.get(currentQuestionIndex)?.includes(option) ||
                  false;
                const isCorrect =
                  questions[currentQuestionIndex]?.correctAnswers.includes(
                    option
                  );

                let backgroundColor = '#F3F4FA';
                if (isSelected && isCorrect) {
                  backgroundColor = 'green';
                } else if (isSelected && !isCorrect) {
                  backgroundColor = 'red';
                }

                return (
                  <div
                    className={styles.list}
                    key={option}
                    style={{
                      border: `3px solid ${backgroundColor}`,
                    }}
                    onClick={() => handleAnswerSelection(option)}
                  >
                    {backgroundColor === 'green' ? (
                      <span className={styles.greenDotFilled}></span>
                    ) : backgroundColor === 'red' ? (
                      <span className={styles.redDotFilled}></span>
                    ) : (
                      <span className={styles.greyCircle}> </span>
                    )}
                    <button className={styles.button}>{option}</button>
                  </div>
                );
              })}
            </div>
            <button
              className={`${styles.startButton} ${styles.nextButton}`}
              onClick={handleNextQuestion}
              disabled={!userAnswers.get(currentQuestionIndex)?.length}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.questionScreen}>
          <Image
            className={styles.questionScreenBG}
            src="/question-bg.svg"
            alt="Upraised Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.questionContainer}>
            <div className={styles.options}>
              <h2>Your result</h2>
              <CircularScoreMeter
                percentage={Math.ceil((score / questions.length) * 100)}
              />
              <p className={`${styles.list} ${styles.bgGreen}`}>
              <span className={styles.greenDotFilled}></span>
                {' '}
                {score} Correct
              </p>
              <p className={`${styles.list} ${styles.bgRed}`}>
              <span className={styles.redDotFilled}></span>
                {' '}
                {questions.length - score} Incorrect
              </p>
              <button className={styles.startButton} onClick={resetQuiz}>
                Start Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizUI;
