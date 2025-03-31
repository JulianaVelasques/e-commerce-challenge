import { transactions } from '@/mocks/transactions';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return NextResponse.json(
      { error: 'Transaction not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
