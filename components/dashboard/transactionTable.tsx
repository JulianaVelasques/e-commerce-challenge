'use client';

import { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra as transações pelo termo de busca
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='overflow-x-auto rounded-lg text-sm'>
      {/* Barra de busca */}
      <div className='flex justify-end mb-4'>
        <input
          type='text'
          placeholder='Buscar ID...'
          className='p-2 border border-gray-300 rounded-lg shadow-sm'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <table className='min-w-full'>
        <thead className='bg-gray-50 font-semibold text-[0.7rem]'>
          <tr>
            <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase rounded-tl'>
              ID
            </th>
            <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
              Status
            </th>
            <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
              Método de Pagamento
            </th>
            <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase rounded-tr'></th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className='even:bg-gray-50 odd:bg-white even:border even:border-gray-100'
            >
              <td className='px-4 py-2 text-left font-semibold text-gray-700'>
                {transaction.id}
              </td>
              <td className='px-4 py-2 text-left'>
                <TransactionStatus status={transaction.status} />
              </td>
              <td className='px-4 py-2 text-left'>Cartão de crédito</td>
              <td className='px-4 py-2 text-left'>
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                  <button
                    aria-label='Visualizar detalhes da transação'
                    className='bg-white border text-gray-700 border-gray-300 rounded-full p-2 shadow-sm text-[10px] font-bold cursor-pointer hover:bg-gray-100'
                  >
                    Visualizar
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className='flex justify-center mt-4 space-x-2'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded-lg cursor-pointer ${
              currentPage === index + 1
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
