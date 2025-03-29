'use client';

import Link from 'next/link';
import TransactionStatus from '@/components/dashboard/status';

export interface TransactionTableRow {
  id: string;
  status: 'authorized' | 'failed';
  paymentMethod: string;
}

interface TransactionsTableProps {
  transactions: TransactionTableRow[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <div className='overflow-x-auto rounded-lg text-sm shadow'>
      <table className='min-w-full bg-white'>
        <thead>
          <tr className='bg-gray-100 text-gray-600 font-semibold'>
            <th className='px-4 py-2 text-center'>ID</th>
            <th className='px-4 py-2 text-center'>Status</th>
            <th className='px-4 py-2 text-center'>Método de Pagamento</th>
            <th className='px-4 py-2 text-center'></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className='border-b border-gray-200 hover:bg-gray-50'
            >
              <td className='px-4 py-2 text-center'>{transaction.id}</td>
              <td className='px-4 py-2 text-center'>
                <TransactionStatus status={transaction.status} />
              </td>
              <td className='px-4 py-2 text-center'>
                {transaction.paymentMethod}
              </td>
              <td className='px-4 py-2 text-center'>
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                  <button className='bg-white border border-gray-300 rounded-full p-2 shadow-sm text-[10px] font-bold cursor-pointer hover:bg-gray-100'>
                    Visualizar
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
