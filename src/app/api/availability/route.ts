import { NextRequest, NextResponse } from 'next/server';
import { getAvailability } from '@/lib/booking/availability';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Lipsește parametrul date.' }, { status: 400 });
  }

  try {
    const response = await getAvailability(date);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Nu am putut încărca disponibilitatea.' }, { status: 500 });
  }
}
