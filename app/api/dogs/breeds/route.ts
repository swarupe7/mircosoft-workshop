// Update the import path below if your db module is located elsewhere
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
import { NextResponse } from 'next/server'

export async function GET() {
  const breeds = await db.dog.findMany({
    select: {
      breed: true
    },
    distinct: ['breed']
  })

  return NextResponse.json(breeds.map(dog => dog.breed))
}
