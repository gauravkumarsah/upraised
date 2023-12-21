// pages/api/submit-all-answers.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Replace this with your actual logic to process and save the submitted answers
const saveSubmittedAnswers = (submittedAnswers: any[]) => {
  // Logic to save submitted answers to your database or perform necessary operations
  console.log('Submitted answers:', submittedAnswers);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { submittedAnswers } = req.body;

      // Simulate processing or saving the submitted answers
      saveSubmittedAnswers(submittedAnswers);

      // Assuming successful submission, send a success response
      res.status(200).json({ message: 'All answers submitted successfully, you score is ' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit answers' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
