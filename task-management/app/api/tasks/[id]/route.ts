import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Update a task
    const { title, description, completed } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, description, completed },
      });
      return res.status(200).json(updatedTask);
    } catch  {
      return res.status(500).json({ error: 'Error updating task' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a task
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch  {
      return res.status(500).json({ error: 'Error deleting task' });
    }
  } else {
    return res.setHeader('Allow', ['PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
