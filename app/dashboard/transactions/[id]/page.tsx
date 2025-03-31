'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Transaction } from '@/types/transaction';
import Table from '@/components/table';
import InfoSection from '@/components/infoSection';
import Loading from '@/components/loading';

export default function TransactionDetailsPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        const response = await fetch(`/api/transactions/${id}`);
        const data: Transaction = await response.json();
        setTransaction(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da transação:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className='flex justify-center'>
        <Loading />
      </div>
    );
  if (!transaction) return <p>Transação não encontrada.</p>;

  return (
    <div className='text-[0.9rem] text-gray-900'>
      <h1 className='text-2xl font-bold mb-4'>Detalhes da Transação</h1>

      <InfoSection
        title='Informações do Cliente'
        data={[
          {
            label: 'Nome',
            value: `${transaction.customer.firstName} ${transaction.customer.lastName}`,
          },
          {
            label: 'Documento',
            value: `${transaction.customer.document.type.toUpperCase()} - ${
              transaction.customer.document.number
            }`,
          },
          {
            label: 'Endereço',
            value: `${transaction.customer.address.street}, ${transaction.customer.address.number}, ${transaction.customer.address.neighborhood}, ${transaction.customer.address.city} - ${transaction.customer.address.state}, ${transaction.customer.address.country}`,
          },
        ]}
      />

      <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
        <h2 className='text-sm font-semibold mb-4 md:text-base'>
          Itens da Compra
        </h2>
        <Table
          headers={['Nome do Produto', 'Quantidade', 'Preço', 'Total']}
          data={transaction.items.map((item) => [
            item.name,
            item.quantity,
            (item.amount / item.quantity).toFixed(2),
            item.amount.toFixed(2),
          ])}
        />
      </div>

      <InfoSection
        title='Informações de Pagamento'
        data={[
          {
            label: 'Parcelas',
            value: transaction.paymentMethod.card.installments,
          },
          {
            label: 'Cartão',
            value: `${transaction.paymentMethod.card.firstDigits} **** **** ${transaction.paymentMethod.card.lastDigits}`,
          },
          {
            label: 'Titular',
            value: transaction.paymentMethod.card.holderName,
          },
          {
            label: 'Expiração',
            value: transaction.paymentMethod.card.expirationDate,
          },
        ]}
      />
    </div>
  );
}
