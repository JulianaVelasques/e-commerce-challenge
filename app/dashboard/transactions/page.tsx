'use client';

import TransactionsTable, {
  TransactionTableRow,
} from '@/components/dashboard/transactionTable';
import Loading from '@/components/ui/loading';
import { Transaction } from '@/types/transaction';
import { useEffect, useState } from 'react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const tableTransactions: TransactionTableRow[] = transactions.map(
    (transaction) => ({
      id: transaction.id,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod.type,
    })
  );

  return (
    <div className='px-10 py-8 overflow-hidden shadow rounded-3xl bg-white'>
      <h1 className='text-2xl font-bold mb-1'>Lista de Transações</h1>
      <p className='text-sm text-gray-500'>
        Aqui você encontra todas as transações ocorridas.
      </p>
      {loading ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : (
        <TransactionsTable transactions={tableTransactions} />
      )}
    </div>
  );
}
