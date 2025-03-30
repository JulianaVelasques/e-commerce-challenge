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
    <div className='overflow-x-auto rounded-lg text-sm'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50 font-semibold text-[0.7rem]'>
          <tr>
            <th className='px-4 py-2 text-center tracking-wider text-gray-500 uppercase'>
              ID
            </th>
            <th className='px-4 py-2 text-center tracking-wider text-gray-500 uppercase'>
              Status
            </th>
            <th className='px-4 py-2 text-center tracking-wider text-gray-500 uppercase'>
              Método de Pagamento
            </th>
            <th className='px-4 py-2 text-center tracking-wider text-gray-500 uppercase'></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className='even:bg-gray-50 odd:bg-white even:border even:border-gray-100'
            >
              <td className='px-4 py-2 text-center font-semibold text-gray-700'>
                {transaction.id}
              </td>
              <td className='px-4 py-2 text-center'>
                <TransactionStatus status={transaction.status} />
              </td>
              <td className='px-4 py-2 text-center'>Cartão de crédito</td>
              <td className='px-4 py-2 text-center'>
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                  <button className='bg-white border text-gray-700 border-gray-300 rounded-full p-2 shadow-sm text-[10px] font-bold cursor-pointer hover:bg-gray-100'>
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
