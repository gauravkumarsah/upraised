export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswers: string[];
  }
  
  export interface Score {
    user: string;
    score: number;
  }
  