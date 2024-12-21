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
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}