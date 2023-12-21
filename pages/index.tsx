
import QuizComponent from '@/src/components/QuizComponent';
import styles from '../src/components/quiz.module.css'


export default function Home() {
  return (
    <div className={styles.page}>
      <QuizComponent />
    </div>
  );
}
