import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

export const db = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const breed = searchParams.get('breed')
  const available = searchParams.get('available')

  const where = {
    ...(breed && breed !== 'all' ? { breed } : {}),
    ...(available === 'true' ? { adopted: false } : {})
  }

  const dogs = await db.dog.findMany({ where })
  return NextResponse.json(dogs)
}
