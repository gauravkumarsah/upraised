import { QuizQuestion } from '@/src/components/types';
import { NextApiRequest, NextApiResponse } from 'next';


const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    correctAnswers: ['Paris','London'],
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
    correctAnswers: ['Mars'],
  },
  {
    id: 3,
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswers: ['Blue Whale'],
  },
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: [
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Pablo Picasso',
      'Michelangelo',
    ],
    correctAnswers: ['Leonardo da Vinci'],
  },
  {
    id: 5,
    question: 'What is the tallest mountain in the world?',
    options: ['Mount Kilimanjaro', 'K2', 'Mount Everest', 'Denali'],
    correctAnswers: ['Mount Everest'],
  },
];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<QuizQuestion[] | { message: string }>
) {
  if (_req.method === 'GET') {
    // Fetch questions (here, all questions)
    res.status(200).json(questions);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
