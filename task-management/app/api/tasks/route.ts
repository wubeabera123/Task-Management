import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all tasks
    try {
      const tasks = await prisma.task.findMany();
      return res.status(200).json(tasks);
    } catch  {
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
  } else if (req.method === 'POST') {
    // Create a new task
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const newTask = await prisma.task.create({
        data: { title, description },
      });
      return res.status(201).json(newTask);
    } catch  {
      return res.status(500).json({ error: 'Error creating task' });
    }
  } else {
    return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
