
// pages/api/submit-answer.ts

import { NextApiRequest, NextApiResponse } from 'next';


// Simulated database or storage for submitted answers
let submittedAnswers: { [key: string]: { selectedAnswer: string[], timeTaken: number } } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { selectedAnswer, timeTaken } = req.body;
      
      // Example: Get user ID or quiz question ID from the request
      const questionId = 'user123'; // Replace with actual user ID or identifier
      
      // Store the submitted answer and time taken in the simulated database
      submittedAnswers[questionId] = { selectedAnswer, timeTaken };

      // Assuming successful submission, send a success response
      res.status(200).json({ message: 'Answer submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
