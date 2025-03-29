'use client';

import TransactionsTable, {
  TransactionTableRow,
} from '@/components/dashboard/transactionTable';
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
    <div className='p-1'>
      <h1 className='text-2xl font-bold mb-4'>Listagem de Transações</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <TransactionsTable transactions={tableTransactions} />
      )}
    </div>
  );
}
