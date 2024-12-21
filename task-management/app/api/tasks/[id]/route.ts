import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const { title, description, completed } = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}