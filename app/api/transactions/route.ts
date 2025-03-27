import { NextResponse } from 'next/server';

const transactions: any[] = [];

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newTransaction = {
    id: (transactions.length + 1).toString(),
    status: Math.random() > 0.2 ? 'authorized' : 'failed',
    ...body,
    paymentMethod: {
      type: 'card',
      card: {
        firstDigits: body.paymentMethod.card.number.slice(0, 4),
        lastDigits: body.paymentMethod.card.number.slice(-4),
        holderName: body.paymentMethod.card.holderName,
        expirationDate: body.paymentMethod.card.expirationDate,
        installments: body.paymentMethod.card.installments,
      },
    },
  };

  transactions.push(newTransaction);
  return NextResponse.json(newTransaction, { status: 201 });
}
