import { NextResponse } from 'next/server';
import { programs } from '@/data/programs';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      source: 'embedded-pa-library',
      programs
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    }
  );
}
