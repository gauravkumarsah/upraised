import React from 'react';
import styles from './quiz.module.css';
import QuizUI from './QuizUI';

const QuizComponent = () => {
  return (
    <div className={styles.container}>
      <QuizUI />
    </div>
  );
};

export default QuizComponent;
